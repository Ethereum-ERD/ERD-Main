import { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { InputNumber, notification } from 'antd';
import cx from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

import { addCommas, formatUnits, truncateNumber, OpenEtherScan } from 'src/util';
import MintTitle from 'src/components/common/MintTitle';
import { MAX_MINTING_FEE } from 'src/constants';
import { CollateralStatus } from 'src/types';
import { useStore } from 'src/hooks';

import FeeInfo from '../FeeInfo';

import s from './index.module.scss';

type BorrowItem = {
    token: string
    amount: number
}

const Steps = [25, 50, 75, 100];

export default observer(function AdjustTrove() {
    const { store } = useStore();
    const [fastStep, setFastStep] = useState(0);
    const [borrowNum, setBorrowNum] = useState(0);
    const [assetValue, setAssetValue] = useState(0);
    const [maxBorrowNum, setMaxBorrowNum] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [collateralRatio, setCollateralRatio] = useState(0);
    const [borrowInfo, setBorrowInfo] = useState<Array<BorrowItem>>([]);
    const { systemCCR, systemTCR, userTrove, userCollateralInfo, stableCoinName, stableCoinDecimals, fetchWrappedETH2USD, minBorrowAmount, toggleStartAdjustTrove, adjustTrove, systemMCR, mintingFeeRatio, gasCompensation, isNormalMode, systemTotalValueInUSD, systemTotalDebtInUSD, collateralValueInfo } = store;

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

    const setMax = (key: string, v: number) => {
        setFastStep(0);
        const alreadyUsed = userTrove.collateral.find(i => i.tokenAddr === key);
        const item = userCollateralInfo.find(i => i.tokenAddr === key);

        onChange(key, formatUnits(v + (+(alreadyUsed?.amount || 0)), item!.tokenDecimals));
    };

    const onFastChoose = (v: number) => {
        setFastStep(v);
        setBorrowNum(truncateNumber(v / 100 * maxBorrowNum));
    };

    useEffect(() => {
        if (!userTrove) return;
        setBorrowNum(+formatUnits(userTrove.debt, stableCoinDecimals));

        const borrowInfo = userTrove.collateral.map((coll) => {
            return {
                token: coll.tokenAddr,
                amount: +formatUnits(+coll.amount, coll.tokenDecimals)
            };
        });

        setBorrowInfo(borrowInfo);
    }, [userTrove, stableCoinDecimals]);

    useEffect(() => {
        if (borrowInfo.every(i => +i.amount === 0)) {
            setAssetValue(0);
        };
        const value = fetchWrappedETH2USD(borrowInfo);
        setAssetValue(value);
    }, [fetchWrappedETH2USD, borrowInfo]);

    useEffect(() => {
        setCollateralRatio(assetValue / borrowNum);
    }, [borrowNum, assetValue]);

    useEffect(() => {
        let maxDebt = 0;
        if (isNormalMode) {
            // in normal mode, ICR should be great than MCR and newTCR must be great than CCR;
            // MAX_DEBT_A is ICR > MCR
            // systemMCR >= assetValue / MAX_DEBT_A;
            const MAX_DEBT_A = assetValue / systemMCR;
            // MAX_DEBT_B is newTCR > CCR;
            // CCR >= (systemTotalValueInUSD + assetValue) / (systemTotalDebtInUSD + MAX_DEBT_B)
            const MAX_DEBT_B = (systemTotalValueInUSD + assetValue - systemCCR * systemTotalDebtInUSD) / systemCCR;
            maxDebt = truncateNumber(Math.min(MAX_DEBT_A, MAX_DEBT_B));
        } else {
            // in recovery mode, ICR should be great than CCR;
            maxDebt = truncateNumber(assetValue / systemCCR);
        }

        // maxDebt = maxBorrowAble + mintingFee
        // and mintingFee is [x] percent of maxBorrowAble
        // so maxBorrowAble = maxDebt / (1 + x)
        const maxBorrowAble = maxDebt / (1 + mintingFeeRatio);
        if (maxBorrowAble < 0) return;
        setMaxBorrowNum(truncateNumber(maxBorrowAble));
    }, [assetValue, systemMCR, systemCCR, mintingFeeRatio, isNormalMode, systemTotalValueInUSD, systemTotalDebtInUSD]);

    const handleConfirm = async () => {
        if (isProcessing) return;
        if (borrowNum * Math.pow(10, stableCoinDecimals) < minBorrowAmount) return;
        if (collateralRatio < systemMCR) {
            return notification.error({
                message: 'ICR less than MCR is not permitted.'
            });
        }
        setIsProcessing(true);
        const result = await adjustTrove(
            borrowInfo,
            borrowNum * Math.pow(10, stableCoinDecimals)
        );

        if (result.status) {
            notification.success({
                message: 'Transaction complete',
                onClick: () => OpenEtherScan(`https://goerli.etherscan.io/tx/${result.hash}`)
            });
            toggleStartAdjustTrove();
        } else {
            notification.error({
                message: result.msg || 'Transaction failed'
            });
        }
        setIsProcessing(false);
    };

    const borrowNumChange = useMemo(() => {
        if (!userTrove) return 0;
        const troveDebt = userTrove.debt / Math.pow(10, stableCoinDecimals);
        if (borrowNum  <= troveDebt) return 0;
        return borrowNum - troveDebt;
    }, [userTrove, borrowNum, stableCoinDecimals]);

    const mintingFee = useMemo(() => {
        return borrowNumChange * mintingFeeRatio;
    }, [borrowNumChange, mintingFeeRatio]);

    const realDebt = useMemo(() => {
        if (!userTrove) return 0;
        const oldTroveDebt = userTrove.debt / Math.pow(10, stableCoinDecimals);

        if (borrowNum === 0) {
            return 0;
        }
        // means user decrease mint number
        // Because adjusting the position will pay the interest that has already been incurred
        // so new debt is borrow number 
        if (oldTroveDebt >= borrowNum) {
            return oldTroveDebt - (oldTroveDebt - borrowNum);
        }

        return borrowNum + mintingFee;
    }, [userTrove, borrowNum, stableCoinDecimals, mintingFee]);

    const crClasses = useMemo(() => {
        if (Number.isNaN(collateralRatio) || collateralRatio === 0) return [];

        const classes = [];

        if (collateralRatio >= systemTCR) {
            classes.push(s.healthCR);
            return classes;
        }

        if (collateralRatio >= systemCCR) {
            classes.push(s.warningCR);

            return classes;
        }

        return [s.emergencyCR];

    }, [collateralRatio, systemTCR, systemCCR]);

    if (!userTrove) return null;

    return (
        <div className={s.wrap}>
            <MintTitle title='Adjust Trove' />
            <p className={s.titleDesc}>Deposit collateral to mint the {stableCoinName} stablecoin.</p>
            {validColls.length === 0 && (
                <div className={s.warning}>
                    You have no  supported Collateral. 😅
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
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            // @ts-ignore
                                            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                            addonBefore={
                                                <p className={s.inputBefore}>
                                                    <img src={coll.icon} alt='' />
                                                    <span>{coll.tokenName}</span>
                                                </p>
                                            }
                                            value={v?.amount || '0'}
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
                                                <span>
                                                    {(collateralValueInfo[coll.tokenAddr] || 0).toFixed(2)}
                                                </span>
                                            </p>
                                        </div>
                                        <p className={cx(s.max, { [s.disableMax] : isDisable })}
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
                    <p>{addCommas(maxBorrowNum)} {stableCoinName} Max</p>
                </div>
            </div>
            <FeeInfo
                totalDebt={realDebt * Math.pow(10, stableCoinDecimals)}
                fee={mintingFee}
            />
            <div className={s.btnArea}>
                {validColls.length === 0 && (
                    <div className={cx(s.btn, s.disable, s.notReady)}>Get Start</div>
                )}
                {validColls.length > 0 && (
                    <>
                        <div className={cx(s.btn, s.cancel)} onClick={toggleStartAdjustTrove}>Cancel</div>
                        <div className={cx(s.btn, {
                            [s.disable]: collateralRatio < systemMCR || borrowNum * Math.pow(10, stableCoinDecimals) < minBorrowAmount,
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
