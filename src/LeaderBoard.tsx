import { useEffect } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import { Skeleton, message, Popover } from 'antd';
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
                    <span>My Points</span>
                    <p>{formatNumber(userScores)}</p>
                </div>
                <div className={s.item}>
                    <div className={s.indexWrap}>
                        <span>My Referrals</span>
                        <Popover
                            title=''
                            arrow={false}
                            content={<div className='tipsModal'>Referrals are only counted after the referred user successfully opens a Trove.</div>}
                        >
                            <div><QuestionIcon /></div>
                        </Popover>
                    </div>
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
                    <div className={cx(s.rankIndexName, s.debtIndex)}>
                        Debt
                        <Popover
                            title=''
                            arrow={false}
                            content={<div className='tipsModal'>This total debt amount represents the total value of USDE minted by the user within a 24-hour period and is refreshed every 24 hours.</div>}
                        >
                            <div><QuestionIcon /></div>
                        </Popover>
                    </div>
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
