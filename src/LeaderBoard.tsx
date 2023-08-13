import { useEffect } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { Skeleton } from 'antd';

import { addCommas, formatUnits } from "src/util";
import { useStore } from "src/hooks";

import s from './LeaderBoard.module.scss';


export default observer(function LeaderBoard() {
    const { store: { userInvite, userRank, userScores, userTrove, stableCoinDecimals, stableCoinName, rankList, queryRankList, isNoRankData, isLoadingRankList } } = useStore();

    useEffect(() => {
        rankList.length < 1 && queryRankList();
    }, [rankList, queryRankList]);

    return (
        <div className={s.wrap}>
            <p className={s.title}>LeaderBoard</p>
            <div className={s.selfRank}>
                <div className={s.item}>
                    <span>My Ranking</span>
                    <p>{userRank === -1 ? 'UNRANKED' : userRank}</p>
                </div>
                <div className={s.item}>
                    <span>My Scores</span>
                    <p>{userScores}</p>
                </div>
                <div className={s.item}>
                    <span>My Invite</span>
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
                    <p className={cx(s.rankIndexName, s.rankIndex)}>Ranking</p>
                    <p className={cx(s.rankIndexName, s.addrIndex)}>Address</p>
                    <p className={cx(s.rankIndexName, s.scoreIndex)}>Scores</p>
                    <p className={cx(s.rankIndexName, s.invitedIndex)}>Invited</p>
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
                                    <p className={cx(s.rankIndexValue, s.addrValue)}>{item.user}</p>
                                    <p className={cx(s.rankIndexValue, s.scoreValue)}>{addCommas(item.score)}</p>
                                    <p className={cx(s.rankIndexValue, s.invitedValue)}>{item.invite}</p>
                                    <p className={cx(s.rankIndexValue, s.debtValue)}>{addCommas(item.amount)}{"\u00A0"}{stableCoinName}</p>
                                </div>
                            );
                        })}
                    </div>
                </Skeleton>
            </div>
        </div>
    );
});
