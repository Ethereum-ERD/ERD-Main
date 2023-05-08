import { Popover } from 'antd';

import SupportAssetPopup from 'src/components/common/SupportAssetPopup';

import s from './index.module.scss';

export default function MintTitle() {
    return (
        <div className={s.top}>
            <p className={s.title}>Mint</p>
            <Popover title='' trigger="click" content={<SupportAssetPopup />} overlayClassName={s.popupWrap}>
                <div className={s.supportIcon}>
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="42" height="42" rx="21" fill="#F4F8FF"/>
                        <path d="M15 20.25L25.5 20.25V21.75L15 21.75V20.25Z" fill="#666666"/>
                        <path d="M24 24L15 24V25.5H24V24Z" fill="#666666"/>
                        <path d="M12 13.5C12 12.6716 12.6716 12 13.5 12H28.5C29.3284 12 30 12.6716 30 13.5V28.5C30 29.3284 29.3284 30 28.5 30H13.5C12.6716 30 12 29.3284 12 28.5V13.5ZM13.5 13.5L13.5 16.5H28.5V13.5H13.5ZM13.5 18L13.5 28.5H28.5V18H13.5Z" fill="#666666"/>
                    </svg>
                </div>
            </Popover>
        </div>
    );
}
