import { useState, useMemo, useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import cx from "classnames";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Popover, notification, InputNumber, Pagination, Spin } from "antd";

import { formatUnits, addCommas, OpenEtherScan } from "src/util";
import { ROW_PER_PAGE } from "src/constants";
import { useStore } from "src/hooks";

import s from "./Liquidate.module.scss";

function CopyIcon() {
    return (
        <svg
            width="13"
            height="15"
            viewBox="0 0 13 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.99995 0.921911C1.99995 0.337268 2.52001 0 2.9953 0H7.36584C7.63437 0 7.89162 0.108 8.07968 0.299689L11.7139 4.00415C11.8972 4.19093 11.9999 4.44209 12.0001 4.70375L12.0046 11.0777C12.0046 11.6624 11.4846 12 11.0093 12H2.99995C2.52472 12 2.00474 11.6628 2.00461 11.0783L1.99995 0.921911ZM2.99999 1L3.00457 11H11.0046L11.0003 5.01275H7.00004V1H2.99999ZM8.00004 1.64645V4.01275H10.3215L8.00004 1.64645Z"
                fill="#3083FF"
            />
            <path
                d="M0 4.00001V13.0128C0 13.565 0.447716 14.0128 1 14.0128H9V13.0128L1 13.0128V4.00001H0Z"
                fill="#3083FF"
            />
        </svg>
    );
}

function DeleteIcon() {
    return (
        <svg
            width="18"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M6 17V8H7.5V17H6Z" fill="#3083FF" />
            <path d="M10.5 8V17H12V8H10.5Z" fill="#3083FF" />
            <path
                d="M12.75 3.5H18V5H16.5V20C16.5 20.8284 15.8284 21.5 15 21.5H3C2.17157 21.5 1.5 20.8284 1.5 20V5H0V3.5H5.25L5.25 1.7C5.25 1.03726 5.78726 0.5 6.45 0.5H11.55C12.2127 0.5 12.75 1.03726 12.75 1.7V3.5ZM6.75 3.5H11.25L11.25 2L6.75 2V3.5ZM3 5V20H15V5H3Z"
                fill="#3083FF"
            />
        </svg>
    );
}

function QuestionIcon() {
    return (
        <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.89404 10.6C6.89404 10.2686 7.16267 10 7.49404 10C7.82541 10 8.09404 10.2686 8.09404 10.6C8.09404 10.9314 7.82541 11.2 7.49404 11.2C7.16267 11.2 6.89404 10.9314 6.89404 10.6Z"
                fill="#888888"
            />
            <path
                d="M7.49409 3.0061C6.15645 3.0061 5.06909 4.09346 5.06909 5.4311H6.06909C6.06909 4.64574 6.70873 4.0061 7.49409 4.0061C8.27945 4.0061 8.91909 4.64574 8.91909 5.4311C8.91909 5.96885 8.4746 6.50808 7.89445 6.74376L7.8919 6.74481C7.36235 6.96335 6.99414 7.48413 6.99414 8.0925V9H7.99414V8.0925C7.99414 7.89828 8.10945 7.73731 8.27236 7.66961C9.09969 7.33289 9.91909 6.49869 9.91909 5.4311C9.91909 4.09346 8.83173 3.0061 7.49409 3.0061Z"
                fill="#888888"
            />
            <path
                d="M14.4941 7C14.4941 3.13401 11.3601 1.18292e-06 7.49414 0C3.62815 -2.14186e-06 0.494142 3.134 0.494141 7C0.494138 10.866 3.62815 14 7.49414 14C11.3601 14 14.4941 10.866 14.4941 7ZM13.4941 7C13.4941 10.3137 10.8078 13 7.49414 13C4.18043 13 1.49414 10.3137 1.49414 7C1.49414 3.68629 4.18043 0.999999 7.49414 1C10.8079 1 13.4941 3.68629 13.4941 7Z"
                fill="#888888"
            />
        </svg>
    );
}

function Liquidate() {
    const [page, setPage] = useState(1);
    const [selectTrove, setSelectTrove] = useState<string>("");
    const [liquidateTroveAmount, setLiquidateTroveAmount] = useState(0);

    const { store } = useStore();
    const {
        getTroves,
        troveAmount,
        isNormalMode,
        troveList,
        systemTCR,
        systemMCR,
        systemCCR,
        liquidate,
        isLoadingTroves,
        isLiquidateIng,
        supportAssets,
        stableCoinName,
        stableCoinDecimals,
        collateralValueInfo,
        isLoadingTroveAmount,
        isLoadingSupportAsset,
    } = store;

    const ShowAlert = () => {
        notification.success({
            message: "ERD",
            description: "Copied.",
        });
    };

    const handleLiquidateN = async () => {
        if (isLiquidateIng) {
            return;
        }
        if (liquidateTroveAmount < 1) {
            return notification.error({
                message: "bad parameters.",
            });
        }
        const result = await liquidate(liquidateTroveAmount);
        if (result.status) {
            notification.success({
                message: "Transaction complete",
                onClick: () =>
                    OpenEtherScan(
                        `https://goerli.etherscan.io/tx/${result.hash}`
                    ),
            });
        } else {
            notification.error({
                message: result.msg || "Transaction failed",
            });
        }
    };

    const handleLiquidateOne = async (addr: string) => {
        if (isLiquidateIng) {
            return;
        }
        const trove = troveList.find((t) => t.owner === addr);
        if (!trove) {
            return notification.error({
                message: "bad operation.",
            });
        }

        const ICR = trove.ICR;
        let canBeLiquidated = false;

        if (isNormalMode) {
            canBeLiquidated = ICR < systemMCR;
        } else {
            canBeLiquidated = ICR < systemMCR || ICR < systemTCR;
        }

        if (!canBeLiquidated) {
            return notification.warning({
                message: `This Trove has a CR greater than 110% and is currently ineligible for liquidation.`,
            });
        }

        setSelectTrove(addr);
        const result = await liquidate([addr]);
        if (result.status) {
            notification.success({
                message: "Transaction complete",
                onClick: () =>
                    OpenEtherScan(
                        `https://goerli.etherscan.io/tx/${result.hash}`
                    ),
            });
        } else {
            notification.error({
                message: "Transaction failed",
            });
        }
        setSelectTrove("");
    };

    const isReady = useMemo(() => {
        return Object.keys(collateralValueInfo).length > 0 && troveAmount > -1;
    }, [collateralValueInfo, troveAmount]);

    useEffect(() => {
        isReady && getTroves();
    }, [isReady, getTroves]);

    const NoTroves = troveAmount === 0;
    const showTroveList = troveList.length > 0 && isReady;
    const isInitTroveList =
        troveAmount > 0 && isLoadingTroves && troveList.length === 0;
    const isLoadingSystemInfo = isLoadingTroveAmount || isLoadingSupportAsset;

    const handleLoadMore = useCallback((page: number) => {
        setPage(page);
    }, []);

    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <div className={s.top}>
                    <div className={s.topLeft}>
                        <p className={s.title}>Liquidate Troves</p>
                        <div
                            className={cx(s.systemMode, {
                                [s.recoveryMode]: !isNormalMode,
                            })}
                        >
                            <p>
                                {isNormalMode ? "Normal Mode" : "Recovery Mode"}
                            </p>
                            <Popover
                                title=""
                                arrow={false}
                                content={
                                    <>
                                        {isNormalMode && (
                                            <div
                                                className={cx(
                                                    "tipsModal",
                                                    s.tipsModal
                                                )}
                                            >
                                                Recovery Mode will be activated
                                                when the Total Collateralization
                                                Ratio (TCR) falls below{" "}
                                                {(systemCCR * 100).toFixed(0)}%.
                                                When activated, your Trove can
                                                be liquidated if the
                                                collateralization ratio of your
                                                Trove is lower than TCR. The
                                                maximum collateral you can lose
                                                in liquidation is capped at{" "}
                                                {(systemMCR * 100).toFixed(0)}%
                                                of your Trove debt.
                                                Manipulations that negatively
                                                affect TCR are also restricted.
                                            </div>
                                        )}
                                        {!isNormalMode && (
                                            <div
                                                className={cx(
                                                    "tipsModal",
                                                    s.tipsModal
                                                )}
                                            >
                                                Recovery Mode will be activated
                                                when the Total Collateralization
                                                Ratio (TCR) falls below{" "}
                                                {(systemCCR * 100).toFixed(0)}%.
                                                When activated, your Trove can
                                                be liquidated if the
                                                collateralization ratio of your
                                                Trove is lower than TCR. The
                                                maximum collateral you can lose
                                                in liquidation is capped at{" "}
                                                {(systemMCR * 100).toFixed(0)}%
                                                of your Trove debt.
                                                Manipulations that negatively
                                                affect TCR are also restricted.
                                            </div>
                                        )}
                                    </>
                                }
                            >
                                <div className={s.modelTips}>
                                    <QuestionIcon />
                                </div>
                            </Popover>
                        </div>
                    </div>
                    <div className={s.topRight}>
                        <p className={s.riskTrovesTitle}>Risk Troves</p>
                        <div className={s.inputContainer}>
                            <div className={s.helpText}>
                                <Popover
                                    arrow={false}
                                    title=""
                                    content={
                                        <div
                                            className={cx(
                                                "tipsModal",
                                                s.tipsModal
                                            )}
                                        >
                                            When performing batch liquidations, enter the number of Troves you intend to liquidate. Liquidations will be prioritized according to Trove collateral ratios, from lowest to highest.
                                        </div>
                                    }
                                >
                                    <div>
                                        <svg
                                            width="15"
                                            height="14"
                                            viewBox="0 0 15 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.89404 10.6C6.89404 10.2686 7.16267 10 7.49404 10C7.82541 10 8.09404 10.2686 8.09404 10.6C8.09404 10.9314 7.82541 11.2 7.49404 11.2C7.16267 11.2 6.89404 10.9314 6.89404 10.6Z"
                                                fill="#888888"
                                            />
                                            <path
                                                d="M7.49409 3.0061C6.15645 3.0061 5.06909 4.09346 5.06909 5.4311H6.06909C6.06909 4.64574 6.70873 4.0061 7.49409 4.0061C8.27945 4.0061 8.91909 4.64574 8.91909 5.4311C8.91909 5.96885 8.4746 6.50808 7.89445 6.74376L7.8919 6.74481C7.36235 6.96335 6.99414 7.48413 6.99414 8.0925V9H7.99414V8.0925C7.99414 7.89828 8.10945 7.73731 8.27236 7.66961C9.09969 7.33289 9.91909 6.49869 9.91909 5.4311C9.91909 4.09346 8.83173 3.0061 7.49409 3.0061Z"
                                                fill="#888888"
                                            />
                                            <path
                                                d="M14.4941 7C14.4941 3.13401 11.3601 1.18292e-06 7.49414 0C3.62815 -2.14186e-06 0.494142 3.134 0.494141 7C0.494138 10.866 3.62815 14 7.49414 14C11.3601 14 14.4941 10.866 14.4941 7ZM13.4941 7C13.4941 10.3137 10.8078 13 7.49414 13C4.18043 13 1.49414 10.3137 1.49414 7C1.49414 3.68629 4.18043 0.999999 7.49414 1C10.8079 1 13.4941 3.68629 13.4941 7Z"
                                                fill="#888888"
                                            />
                                        </svg>
                                    </div>
                                </Popover>
                                <p>Up to</p>
                            </div>
                            <div className={s.selectTroves}>
                                <div>
                                    <InputNumber
                                        className={s.liquidateNumInput}
                                        value={liquidateTroveAmount}
                                        min={0}
                                        step={1}
                                        max={10}
                                        onChange={(v) =>
                                            setLiquidateTroveAmount(v || 0)
                                        }
                                        controls={false}
                                        precision={0}
                                    />
                                </div>
                                <div
                                    onClick={handleLiquidateN}
                                    className={cx(s.confirmBtn, {
                                        [s.disableBtn]: isLiquidateIng,
                                    })}
                                >
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            width="32"
                                            height="32"
                                            rx="16"
                                            fill="#3083FF"
                                            fillOpacity="0.1"
                                        />
                                        <path
                                            d="M13.6667 20.5714V13.7143H14.8333V20.5714H13.6667Z"
                                            fill="#3083FF"
                                        />
                                        <path
                                            d="M17.1667 13.7143V20.5714H18.3333V13.7143H17.1667Z"
                                            fill="#3083FF"
                                        />
                                        <path
                                            d="M18.9167 10.2857H23V11.4286H21.8333V22.8571C21.8333 23.4883 21.311 24 20.6667 24H11.3333C10.689 24 10.1667 23.4883 10.1667 22.8571V11.4286H9V10.2857H13.0833L13.0833 8.91429C13.0833 8.40934 13.5012 8 14.0167 8H17.9833C18.4988 8 18.9167 8.40934 18.9167 8.91429V10.2857ZM14.25 10.2857H17.75L17.75 9.14286L14.25 9.14286V10.2857ZM11.3333 11.4286V22.8571H20.6667V11.4286H11.3333Z"
                                            fill="#3083FF"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.troveList}>
                    <div className={s.tableHead}>
                        <div className={s.tableHeadOfOwner}>Owner</div>
                        <div className={s.tableHeadCollateral}>
                            <p>Collateral</p>
                            <div className={s.collateralIcons}>
                                {supportAssets.map((asset) => {
                                    return (
                                        <img
                                            key={asset.assetName}
                                            src={asset.icon}
                                            alt=""
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className={s.tableHeadDebt}>
                            Debt{"\u00A0"}
                            <span>({stableCoinName})</span>
                        </div>
                        <div className={s.tableHeadCollRatio}>
                            Coll.{'\u00A0'}Ratio
                            <Popover
                                title=""
                                arrow={false}
                                content={<div className={cx('tipsModal')}>Troves become eligible for liquidation should their Collateral Ratio drop below 110%.</div>}
                            >
                                <div className={s.collRatioTips}><QuestionIcon /></div>
                            </Popover>
                        </div>
                    </div>
                    <div className={s.tableBody}>
                        {isLoadingSystemInfo && (
                            <div className={s.emptyWrap}>
                                <Spin
                                    tip={
                                        <span>
                                            Loading system information...
                                        </span>
                                    }
                                />
                            </div>
                        )}
                        {NoTroves && !isLoadingSystemInfo && (
                            <div className={s.emptyWrap}>
                                <p className={s.noDataTips}>No Data</p>
                            </div>
                        )}
                        {isInitTroveList && (
                            <div className={s.emptyWrap}>
                                <Spin tip={<span>Loading...</span>} />
                            </div>
                        )}
                        {!NoTroves && !isInitTroveList && !showTroveList && !isLoadingSystemInfo && (
                            <div className={s.emptyWrap}>
                                <Spin tip={<span>Loading...</span>} />
                            </div>
                        )}
                        {showTroveList &&
                            troveList
                                .slice((page - 1) * ROW_PER_PAGE, page * ROW_PER_PAGE)
                                .map((row) => {
                                    const { owner, collateral, debt, ICR } =
                                        row;
                                    const len = owner.length;
                                    const tokens = collateral.map((t: any) => {
                                        const token = supportAssets.find(
                                            (asset) => {
                                                return (
                                                    asset.tokenAddr ===
                                                    t.tokenAddr
                                                );
                                            }
                                        );
                                        return token;
                                    });

                                    const troveCollRatioClass = [
                                        s.tableItemCollRatioText,
                                    ];
                                    if (ICR >= systemCCR) {
                                        troveCollRatioClass.push(s.health);
                                    } else if (ICR >= systemMCR) {
                                        troveCollRatioClass.push(s.waring);
                                    } else {
                                        troveCollRatioClass.push(s.emergency);
                                    }
                                    return (
                                        <div
                                            key={owner}
                                            className={s.tableItem}
                                            onClick={() =>
                                                handleLiquidateOne(row.owner)
                                            }
                                        >
                                            <div
                                                className={cx(
                                                    s.mobileDeleteIcon,
                                                    {
                                                        [s.showMobileDeleteIcon]:
                                                            selectTrove ===
                                                            owner,
                                                    }
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        s.deleteIconWrap,
                                                        {
                                                            [s.showDeleteIcon]:
                                                                selectTrove ===
                                                                owner,
                                                        }
                                                    )}
                                                >
                                                    <DeleteIcon />
                                                </div>
                                            </div>
                                            <div className={s.tableItemOuter}>
                                                <div
                                                    className={
                                                        s.tableItemContainer
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            s.tableItemOwner
                                                        }
                                                    >
                                                        <p className={s.owner}>
                                                            {owner.slice(0, 4) +
                                                                "..." +
                                                                owner.slice(
                                                                    len - 4
                                                                )}
                                                        </p>
                                                        <p
                                                            className={cx(
                                                                s.owner,
                                                                s.ownerOnMobile
                                                            )}
                                                        >
                                                            {owner.slice(0, 4) +
                                                                "..."}
                                                        </p>
                                                        <CopyToClipboard
                                                            text={owner}
                                                            onCopy={ShowAlert}
                                                        >
                                                            <div
                                                                className={
                                                                    s.copyIcon
                                                                }
                                                                onClick={(
                                                                    e: any
                                                                ) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    e.nativeEvent.stopImmediatePropagation();
                                                                }}
                                                            >
                                                                <CopyIcon />
                                                            </div>
                                                        </CopyToClipboard>
                                                    </div>
                                                    <div
                                                        className={
                                                            s.tableItemCollateralAmountList
                                                        }
                                                    >
                                                        {tokens.map(
                                                            (
                                                                token: any,
                                                                index: number
                                                            ) => {
                                                                const amount =
                                                                    collateral[
                                                                        index
                                                                    ].amount;
                                                                return (
                                                                    <div
                                                                        key={
                                                                            token?.tokenAddr ||
                                                                            index
                                                                        }
                                                                        className={
                                                                            s.collateralCell
                                                                        }
                                                                    >
                                                                        <p
                                                                            className={
                                                                                s.collateralAmount
                                                                            }
                                                                        >
                                                                            {formatUnits(
                                                                                +amount,
                                                                                token?.tokenDecimals
                                                                            )}
                                                                        </p>
                                                                        <p
                                                                            className={
                                                                                s.collateralName
                                                                            }
                                                                        >
                                                                            {
                                                                                token?.tokenName
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                    <p
                                                        className={
                                                            s.tableItemDebt
                                                        }
                                                    >
                                                        {addCommas(
                                                            formatUnits(
                                                                debt,
                                                                stableCoinDecimals
                                                            )
                                                        )}
                                                    </p>
                                                    <div
                                                        className={
                                                            s.tableItemRatio
                                                        }
                                                    >
                                                        <p
                                                            className={cx(
                                                                troveCollRatioClass
                                                            )}
                                                        >
                                                            {(
                                                                ICR * 100
                                                            ).toFixed(2)}
                                                            %
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={s.addonAfter}>
                                                <div
                                                    className={cx(
                                                        s.deleteIconWrap,
                                                        {
                                                            [s.showDeleteIcon]:
                                                                selectTrove ===
                                                                owner,
                                                        }
                                                    )}
                                                >
                                                    <DeleteIcon />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                        }
                    </div>
                </div>
                <Pagination
                    current={page}
                    total={troveAmount}
                    pageSize={ROW_PER_PAGE}
                    className={s.pagination}
                    onChange={handleLoadMore}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}

export default observer(Liquidate);
