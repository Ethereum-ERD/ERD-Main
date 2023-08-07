import { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import { Select, notification } from 'antd';
import cx from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

import { MOCK_ETH_ADDR } from "src/constants";
import MMIcon from 'src/asset/mm.png';
import { useStore } from "src/hooks";

import s from "./MintTestAsset.module.scss";

const { Option } = Select;

export default observer(function MintTestAsset() {
    const { store } = useStore();
    const [asset, setAsset] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const { supportAssets, mintTestAsset, addTokenToWallet } = store;

    useEffect(() => {
        if (supportAssets.length < 1) return;
        const defaultAsset = supportAssets.find(c => c.tokenAddr !== MOCK_ETH_ADDR);
        if (defaultAsset) {
            setAsset(defaultAsset.tokenAddr);
        }
    }, [supportAssets]);

    const handleConfirm = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        const result = await mintTestAsset(asset);
        if (result.status) {
            notification.success({
                message: 'Transaction complete'
            });
        } else {
            notification.error({
                message: result.msg || 'Transaction failed'
            });
        }
        setIsProcessing(false);
    };

    const addToken = async () => {
        await addTokenToWallet(asset);
    };

    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <p className={s.title}>Test</p>
                <p className={s.desc}>Mint test assets to join protocol.</p>
                <div className={s.list}>
                    <div className={s.optionList}>
                        <Select
                            value={asset}
                            onChange={setAsset}
                            popupClassName={s.options}
                        >
                            {supportAssets
                                .filter(c => {
                                    return c.tokenAddr !== MOCK_ETH_ADDR
                                })
                                .map((c) => {
                                    return <Option key={c.tokenAddr} value={c.tokenAddr}>
                                        <p>{c.tokenName}</p>
                                    </Option>
                                })
                            }
                        </Select>
                    </div>
                    <div
                        className={s.addTokenToWallet}
                        onClick={addToken}
                        title=' Add Token to MetaMask'
                    >
                        <img src={MMIcon} alt='metamask icon' />
                    </div>
                </div>
                <div className={cx(s.btn, {
                            [s.disable]: isProcessing,
                            [s.loading]: isProcessing
                        }
                    )}
                    onClick={handleConfirm}
                >
                    {isProcessing && <LoadingOutlined />}
                    Confirm
                </div>
            </div>
        </div>
    );
});
