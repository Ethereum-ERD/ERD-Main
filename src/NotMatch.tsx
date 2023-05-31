import { observer } from "mobx-react";

import s from './NotMatch.module.scss';

export default observer(function NotMatch() {
    return (
        <div className={s.wrap}>
            <p className={s.title}>404</p>
            <p className={s.tips}>Page not found</p>
        </div>
    );
});
