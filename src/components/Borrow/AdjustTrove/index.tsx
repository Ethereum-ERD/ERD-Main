import { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { InputNumber, notification } from 'antd';
import cx from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

import StableCoinIcon from 'src/components/common/StableCoinIcon';
import { addCommas, formatUnits, throwFloat } from 'src/util';
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
    const [isProcessing, setIsProcessing] = useState(false);
    const [collateralRatio, setCollateralRatio] = useState(0);
    const [borrowInfo, setBorrowInfo] = useState<Array<BorrowItem>>([]);
    const { systemCCR, userTrove, userCollateralInfo, stableCoinName, stableCoinDecimals, fetchWrappedETH2USD, minBorrowAmount, toggleStartAdjustTrove, adjustTrove, systemMCR } = store;

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
        const item = userCollateralInfo.find(i => i.tokenAddr === key);

        onChange(key, formatUnits(v, item!.tokenDecimals));
    };

    const onFastChoose = (v: number) => {
        setFastStep(v);
        setBorrowNum(throwFloat(v / 100 * assetValue / systemMCR));
    };

    useEffect(() => {
        if (!userTrove) return;
        setBorrowNum(+formatUnits(userTrove.debt, stableCoinDecimals));

        const borrowInfo = userTrove.collateral.map((coll) => {
            return {
                token: coll.tokenAddr,
                amount: +formatUnits(coll.amount, coll.tokenDecimals)
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

        if (result) {
            notification.success({
                message: 'transaction done.'
            });
            toggleStartAdjustTrove();
        } else {
            notification.error({
                message: 'transaction failed.'
            });
        }
        setIsProcessing(false);
    };

    const crClasses = useMemo(() => {
        if (Number.isNaN(collateralRatio) || collateralRatio === 0) return [];
        const classes = [];

        if (collateralRatio >= systemCCR) {
            classes.push(s.healthCR);
        } else if (collateralRatio >= systemMCR) {
            classes.push(s.warningCR);
        } else {
            classes.push(s.emergencyCR);
        }
        return classes;
    }, [collateralRatio, systemMCR, systemCCR]);

    if (!userTrove) return null;

    return (
        <div className={s.wrap}>
            <p className={s.title}>Adjust</p>
            {validColls.length === 0 && (
                <div className={s.warning}>
                    You have no  support Collateral 😅 
                </div>
            )}
            {validColls.length > 0 &&
                (<div>
                    {validColls
                        .map(coll => {
                            const v = borrowInfo.find(t => t.token === coll.tokenAddr);

                            return (
                                <div key={coll.tokenAddr}>
                                    <div className={s.inputWrap}>
                                        <InputNumber
                                            stringMode
                                            controls={false}
                                            className={s.input}
                                            onChange={(v) => onChange(coll.tokenAddr, v)}
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
                                        <p className={s.balance}>
                                            Your Balance{"\u00A0"}
                                            {formatUnits(coll.balance, coll.tokenDecimals)}
                                        </p>
                                        <p className={s.max} onClick={() => setMax(coll.tokenAddr, coll.balance)}>Max</p>
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
                    addonBefore={
                        <p className={s.inputBefore}>
                            <StableCoinIcon />
                            <span>{stableCoinName}</span>
                        </p>
                    }
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    // @ts-ignore
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                />
            </div>
            <div className={s.collRatioInfo}>
                <div className={s.collRatioInfoTop}>
                    <div>
                        Collateral Ratio({(systemMCR * 100).toFixed(0)}% Min)
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
                    <p>{addCommas(throwFloat(assetValue / systemMCR))} {stableCoinName} Max</p>
                </div>
            </div>
            <FeeInfo liquidationReserve={assetValue} totalDebt={userTrove.debt} />
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
