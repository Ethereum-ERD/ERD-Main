import { useState } from 'react';
import { Popover } from 'antd';

import SupportAssetPopup from 'src/components/common/SupportAssetPopup';

import SupportAssetCloseIcon from 'src/asset/support-asset-icon-close.svg';
import SupportAssetOpenIcon from 'src/asset/support-asset-icon-open.svg';

import s from './index.module.scss';

export default function MintTitle({ title }: { title?: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={s.top}>
            <p className={s.title}>{title || 'Mint'}</p>
            <Popover
                title=''
                trigger="click"
                onOpenChange={setIsOpen}
                arrow={false}
                overlayClassName={s.popupWrap}
                content={<SupportAssetPopup />}
            >
                <div className={s.supportIcon}>
                    <img src={isOpen ? SupportAssetOpenIcon : SupportAssetCloseIcon} alt='' />
                </div>
            </Popover>
        </div>
    );
}
