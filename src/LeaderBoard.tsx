import { useEffect } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { Skeleton, message } from 'antd';
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";

import { addCommas, formatUnits, formatNumber } from "src/util";
import { useStore } from "src/hooks";

import s from './LeaderBoard.module.scss';

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

export default observer(function LeaderBoard() {
    const { store: { userInvite, userRank, userScores, userTrove, stableCoinDecimals, stableCoinName, rankList, queryRankList, isNoRankData, isLoadingRankList } } = useStore();

    useEffect(() => {
        rankList.length < 1 && queryRankList();
    }, [rankList, queryRankList]);

    return (
        <div className={s.wrap}>
            <p className={s.title}>Leaderboard</p>
            <div className={s.selfRank}>
                <div className={s.item}>
                    <span>My Rank</span>
                    <p>{userRank === -1 ? 'UNRANKED' : userRank}</p>
                </div>
                <div className={s.item}>
                    <span>Points</span>
                    <p>{formatNumber(userScores)}</p>
                </div>
                <div className={s.item}>
                    <span>My Invitation</span>
                    <p>{userInvite}</p>
                </div>
                <div className={s.item}>
                    <span>My Debt</span>
                    <p>{addCommas(
                        formatUnits(
                            userTrove?.debt || 0,
                            stableCoinDecimals || 18
                        )
                    )}{"\u00A0"}{stableCoinName}</p>
                </div>
            </div>
            <div className={s.rankList}>
                <div className={s.tableHead}>
                    <p className={cx(s.rankIndexName, s.rankIndex)}>Rank</p>
                    <p className={cx(s.rankIndexName, s.addrIndex)}>Address</p>
                    <p className={cx(s.rankIndexName, s.scoreIndex)}>Score</p>
                    <p className={cx(s.rankIndexName, s.invitedIndex)}>Referrals</p>
                    <p className={cx(s.rankIndexName, s.debtIndex)}>Debt</p>
                </div>
                <div className={s.split} />
                <Skeleton active loading={isLoadingRankList}>
                    <div className={s.listWrap}>
                        {isNoRankData && (
                            <div className={s.emptyWrap}>
                                <p className={s.noDataTips}>No Data</p>
                            </div>
                        )}
                        {rankList.length > 0 && rankList.map((item) => {
                            return (
                                <div key={item.user} className={s.rankItem}>
                                    <p className={cx(s.rankIndexValue, s.rankValue)}
                                        data-rank={item.rank}
                                    >
                                        {item.rank}
                                    </p>
                                    <CopyToClipboard
                                        text={item.userFullStr}
                                        onCopy={() => message.success("Copied")}
                                    >
                                        <div className={s.addrValueWrap}>
                                            <p className={cx(s.rankIndexValue, s.addrValue)} title={item.userFullStr}>{item.user}</p>
                                            <CopyIcon />
                                        </div>
                                    </CopyToClipboard>
                                    <p className={cx(s.rankIndexValue, s.scoreValue)}>{formatNumber(item.score)}</p>
                                    <p className={cx(s.rankIndexValue, s.invitedValue)}>{item.invite}</p>
                                    <p className={cx(s.rankIndexValue, s.debtValue)}>{formatNumber(item.amount)}{"\u00A0"}{stableCoinName}</p>
                                </div>
                            );
                        })}
                    </div>
                </Skeleton>
            </div>
        </div>
    );
});
