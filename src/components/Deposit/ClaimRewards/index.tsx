import { observer } from 'mobx-react';
import { Modal, Popover } from 'antd';
import cx from 'classnames';

import CircleHelp from 'src/components/common/CircleHelp';
import { formatUnits, truncateDecimal } from 'src/util';
import { useStore } from 'src/hooks';

import s from './index.module.scss';

function ClaimRewards({
    open,
    onClose,
    onLeftBtnClick,
    onRightBtnClick
}: {
    open: boolean
    onClose: () => void
    onLeftBtnClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    onRightBtnClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) {

    const { store } = useStore();
    const { userDepositRewardsInfo } = store;

    return (
        <Modal
            centered
            open={open}
            closable={false}
            onCancel={onClose}
            className={s.modal}
            footer={null}
        >
            <div className={s.content}>
                <div className={s.modalHead}>
                    <p className={s.modalHeadTitle}>Claim</p>
                    <div className={s.closeIcon} onClick={() => onClose()}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="24" height="24" rx="12" fill="black" fillOpacity="0.2"/>
                            <path d="M12 13.8805L16.6195 18.5L18 17.1194L13.3806 12.5L18 7.88057L16.6195 6.50004L12 11.1195L7.38053 6.5L6 7.88053L10.6195 12.5L6 17.1195L7.38053 18.5L12 13.8805Z" fill="white"/>
                        </svg>
                    </div>
                </div>
                <div className={s.modalBody}>
                    <p className={s.modalBodyTitle}>Total Rewards</p>
                    <div className={s.rewardList}>
                        {userDepositRewardsInfo.map(token => (
                            <div key={token.tokenAddr} className={s.rewardItem}>
                                    <div className={s.rewardItemHead}>
                                        <img src={token.icon} alt='' />
                                        <p>{token.assetName}</p>
                                    </div>
                                    <div className={s.rewardItemBody}>
                                        <p>{truncateDecimal(+formatUnits(token.rewards, token.tokenDecimals))}</p>
                                        <p>{token.tokenName}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className={s.modalFoot}>
                    <div
                        className={cx(s.btn, s.leftBtn)}
                        onClick={(e) => onLeftBtnClick(e)}
                    >
                        Move to trove
                        <Popover
                            title=''
                            overlayClassName='test'
                            content={<div className={s.tipsModal}>Re-stake all your rewards, which will increase your collateral amount, increase your mortgage rate and borrow amount.</div>}
                        >
                            <div className={s.tips}>
                                <CircleHelp />
                            </div>
                        </Popover>
                    </div>
                    <div
                        className={s.btn}
                        onClick={(e) => onRightBtnClick(e)}
                    >
                        Claim
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default observer(ClaimRewards);
