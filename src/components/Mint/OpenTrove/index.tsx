import { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { InputNumber, notification, Input } from 'antd';
import cx from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

import { addCommas, formatUnits, truncateNumber, OpenEtherScan, checkSumAddr } from 'src/util';
import { EMPTY_ADDRESS, MAX_MINTING_FEE } from 'src/constants';
import { BorrowItem, CollateralStatus } from 'src/types';
import MintTitle from 'src/components/common/MintTitle';
import { useStore } from 'src/hooks';

import FeeInfo from '../FeeInfo';

import s from './index.module.scss';

const Steps = [25, 50, 75, 100];

export default observer(function OpenTrove() {
    const { store } = useStore();
    const [fastStep, setFastStep] = useState(0);
    const [referAddr, setRefAddr] = useState('');
    const [borrowNum, setBorrowNum] = useState(0);
    const [assetValue, setAssetValue] = useState(0);
    const [maxBorrowNum, setMaxBorrowNum] = useState(0);
    const [isValidRefer, setIsValidRefer] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [collateralRatio, setCollateralRatio] = useState(0);
    const [isAlreadyTips, setIsAlreadyTips] = useState(false);
    const [borrowInfo, setBorrowInfo] = useState<Array<BorrowItem>>([]);
    const { web3Provider, systemCCR, systemTCR, userCollateralInfo, stableCoinName, stableCoinDecimals, fetchWrappedETH2USD, minBorrowAmount, createdTrove, systemMCR, gasCompensation, mintingFeeRatio, isNormalMode, toggleStartBorrow, systemTotalDebtInUSD, systemTotalValueInUSD, collateralValueInfo } = store;

    const validColls = useMemo(() => {
        return userCollateralInfo.filter(coll => +coll.balance > 0);
    }, [userCollateralInfo]);

    const onChange = (key: string, v: any) => {
        setFastStep(0);
        const item = borrowInfo.find(i => i.token === key);

        let val: number;
        if (v == null) {
            val = 0;
        } else {
            const [int, float] = v.split('.');
            val = +int;
            if (float) {
                val = +[int, '.', `${float.slice(0)}`].join('');
            }
            if (Number(val) < 0) {
                val = 0;
            }
        }

        if (!item) {
            setBorrowInfo([...borrowInfo, { token: key, amount: val }])
        } else {
            setBorrowInfo(borrowInfo.map(info => {
                if (info.token !== key) {
                    return info;
                }
                return { ...info, amount: val };
            }));
        }
    };

    const onBorrowNumChange = (v: any) => {
        setFastStep(0);
        if (v == null) {
            return setBorrowNum(0);
        }
        const [int, float] = v.split('.');

        let val: number;
        if (!float) {
            val = +int;
        } else {
            val = +[int, '.', float.slice(0, stableCoinDecimals)].join('');
        }

        if (Number(val) < 0) {
            val = 0;
        }

        setBorrowNum(+val);
    };

    const onReferAddrChange = async (v: any) => {
        const addr = v.target.value;
        setRefAddr(addr);
        if (`${addr}`.length !== 42) {
            setIsValidRefer(false);
        } else {
            const isValidAddr = checkSumAddr(addr);
            let isEOAAddr = false;
            try {
                const code = await web3Provider.getCode(addr);
                isEOAAddr = code === '0x';
            } catch {}
            setIsValidRefer(isEOAAddr && isValidAddr);
        }
    };

    const setMax = (key: string, v: number) => {
        setFastStep(0);
        const item = userCollateralInfo.find(i => i.tokenAddr === key);

        onChange(key, formatUnits(v, item!.tokenDecimals));
    };

    const onFastChoose = (v: number) => {
        setFastStep(v);
        setBorrowNum(truncateNumber(v / 100 * maxBorrowNum));
    };

    useEffect(() => {
        if (borrowInfo.every(i => +i.amount === 0)) {
            setAssetValue(0);
        };
        const value = fetchWrappedETH2USD(borrowInfo);
        setAssetValue(value);
    }, [fetchWrappedETH2USD, borrowInfo]);

    useEffect(() => {
        if (borrowNum === 0) {
            setCollateralRatio(0);
            return;
        }
        const realDebt = borrowNum * (1 + MAX_MINTING_FEE) + gasCompensation / Math.pow(10, stableCoinDecimals);
        setCollateralRatio(assetValue / realDebt);
    }, [borrowNum, assetValue, gasCompensation, stableCoinDecimals]);

    useEffect(() => {
        if (assetValue < gasCompensation / Math.pow(10, stableCoinDecimals)) return;

        let maxDebt = 0;
        if (isNormalMode) {
            // in normal mode, ICR should be great than MCR and newTCR must be great than CCR;
            // v1 is ICR > MCR
            const v1 = assetValue / systemMCR;
            // v2 is newTCR > CCR;
            const v2 = (systemTotalValueInUSD + assetValue - systemCCR * systemTotalDebtInUSD) / systemCCR;
            maxDebt = truncateNumber(Math.min(v1, v2));
        } else {
            // in recovery mode, ICR should be great than CCR;
            maxDebt = truncateNumber(assetValue / systemCCR);
        }

        // maxDebt = maxBorrowAble + gasCompensation + mintingFee
        // and mintingFee is [x] percent of maxBorrowAble
        // so maxBorrowAble = (maxDebt - gasCompensation) / (1 + x)
        const maxBorrowAble = (maxDebt - gasCompensation / Math.pow(10, stableCoinDecimals)) / (1 + MAX_MINTING_FEE);
        if (maxBorrowAble < 0) return;
        setMaxBorrowNum(truncateNumber(maxBorrowAble));
    }, [assetValue, gasCompensation, stableCoinDecimals, systemMCR, systemCCR, isNormalMode, systemTotalDebtInUSD, systemTotalValueInUSD]);

    const realDebt = useMemo(() => {
        if (borrowNum === 0) {
            return 0;
        }
        const debt = borrowNum * (1 + mintingFeeRatio) + gasCompensation / Math.pow(10, stableCoinDecimals);
        return truncateNumber(debt);
    }, [borrowNum, gasCompensation, stableCoinDecimals, mintingFeeRatio]);

    const crClasses = useMemo(() => {
        if (Number.isNaN(collateralRatio) || collateralRatio === 0) return [];
        const classes = [];

        if (collateralRatio >= systemTCR) {
            classes.push(s.health);
            return classes;
        }

        if (collateralRatio >= systemCCR) {
            classes.push(s.warning);

            return classes;
        }

        return [s.emergency];
    }, [collateralRatio, systemTCR, systemCCR]);

    const handleConfirm = async () => {
        if (isProcessing) return;
        if (borrowNum * Math.pow(10, stableCoinDecimals) < minBorrowAmount) {
            return;
        }
        if (referAddr && !isValidRefer && !isAlreadyTips) {
            setIsAlreadyTips(true);
            return notification.error({
                message: 'Referral does not look like a correct EOA address'
            });
        }
        if (collateralRatio < systemMCR) {
            return notification.error({
                message: 'ICR less than MCR is not permitted'
            });
        }
        setIsProcessing(true);
        const result = await createdTrove(
            borrowInfo,
            borrowNum * Math.pow(10, stableCoinDecimals),
            isValidRefer ? referAddr : EMPTY_ADDRESS
        );

        if (result.status) {
            notification.success({
                message: 'Transaction complete',
                onClick: () => OpenEtherScan(`/tx/${result.hash}`)
            });
            toggleStartBorrow();
        } else {
            notification.error({
                message: result.msg || 'Transaction failed'
            });
        }
        setIsProcessing(false);
    };

    return (
        <div className={s.wrap}>
            <MintTitle />
            {validColls.length === 0 && (
                <div className={s.collateralWarning}>
                    Your collateral is insufficient. 😅 
                </div>
            )}
            {validColls.length > 0 &&
                (<div>
                    {validColls
                        .map(coll => {
                            const v = borrowInfo.find(t => t.token === coll.tokenAddr);
                            const isDisable = coll.status !== CollateralStatus.Active;

                            return (
                                <div key={coll.tokenAddr}>
                                    <div className={s.inputWrap}>
                                        <InputNumber
                                            stringMode
                                            controls={false}
                                            className={s.input}
                                            disabled={isDisable}
                                            onChange={(v) => onChange(coll.tokenAddr, v)}
                                            addonBefore={
                                                <p className={s.inputBefore}>
                                                    <img src={coll.icon} alt='' />
                                                    <span>{coll.tokenName}</span>
                                                </p>
                                            }
                                            value={v?.amount || '0'}
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            // @ts-ignore
                                            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </div>
                                    <div className={s.help}>
                                        <div className={s.helpContainer}>
                                            <p className={s.balance}>
                                                Balance{"\u00A0"}
                                                <span>
                                                    {addCommas(formatUnits(coll.balance, coll.tokenDecimals))}
                                                </span>
                                            </p>
                                            <p className={s.price}>
                                                {coll.tokenName}/USD:{"\u00A0"}
                                                <span>{(collateralValueInfo[coll.tokenAddr] || 0).toFixed(2)}</span>
                                            </p>
                                        </div>
                                        <p className={cx(s.max, { [s.disableMax]: isDisable })}
                                            onClick={() => isDisable ? void 0 : setMax(coll.tokenAddr, coll.balance)}
                                        >
                                            Max
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>)
            }
            <div className={s.inputWrap}>
                <InputNumber
                    controls={false}
                    stringMode
                    onChange={onBorrowNumChange}
                    value={borrowNum}
                    className={s.input}
                    addonAfter={<span className={s.inputAfter}>{stableCoinName}</span>}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    // @ts-ignore
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                />
            </div>
            {(borrowNum > 0 && borrowNum * Math.pow(10, stableCoinDecimals) < minBorrowAmount) &&(
                <div className={s.mintTips}>
                    You must mint at least{"\u00A0"}
                    <span>
                        {minBorrowAmount / Math.pow(10, stableCoinDecimals)}{"\u00A0"}{stableCoinName}.
                    </span>
                </div>
            )}
            <div className={s.referInputWrap}>
                <Input
                    onChange={onReferAddrChange}
                    className={s.referInput}
                    placeholder='0x...'
                    addonBefore={'Referral (Optional)'}
                    defaultValue={referAddr}
                    value={referAddr}
                    maxLength={42}
                    minLength={42}
                />
            </div>
            <div className={s.collRatioInfo}>
                <div className={s.collRatioInfoTop}>
                    <div>
                        Collateral Ratio{"\u00A0"}({(systemMCR * 100).toFixed(0)}% Min)
                    </div>
                    {validColls.length === 0 && <p>N/A</p>}
                    {validColls.length > 0 && (
                        <p className={cx(crClasses)}>
                            {Number.isFinite(collateralRatio) ? (collateralRatio * 100).toFixed(2) + '%' : 'N/A'}
                        </p>
                    )}
                </div>
                <div className={s.fastChooseWrap}>
                    {Steps.map(step => {
                        return <div key={step} className={cx(s.step, { [s.active]: step <= fastStep })} onClick={() => onFastChoose(step)} />
                    })}
                </div>
                <div className={s.tips}>
                    <p>{addCommas(formatUnits(minBorrowAmount, stableCoinDecimals))} {stableCoinName} Min</p>
                    {!!assetValue && (
                        <p>{addCommas(maxBorrowNum)} {stableCoinName} Max</p>
                    )}
                </div>
            </div>
            <FeeInfo
                totalDebt={realDebt * Math.pow(10, stableCoinDecimals)}
                fee={(borrowNum * mintingFeeRatio)}
            />
            <div className={s.btnArea}>
                {validColls.length === 0 && (
                    <div className={cx(s.btn, s.disable, s.fullDisable)}>Confirm</div>
                )}
                {validColls.length > 0 && (
                    <>
                        <div className={cx(s.btn, s.cancel)} onClick={toggleStartBorrow}>Cancel</div>
                        <div
                            className={cx(s.btn, {
                                [s.disable]: borrowNum * Math.pow(10, stableCoinDecimals) < minBorrowAmount || collateralRatio < systemMCR,
                                [s.loading]: isProcessing
                            })}
                            onClick={handleConfirm}
                        >
                            {isProcessing && <LoadingOutlined />}
                            Confirm
                        </div>
                    </>
                )}
            </div>
        </div>
    );
})
