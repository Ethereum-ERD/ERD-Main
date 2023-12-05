import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { timeToLaunch } from 'src/util';
import { useStore } from "src/hooks";

import s from "./CountDown.module.scss";

const uints = ['hours', 'minutes', 'seconds'];

export default observer(function CountDown() {
    const { store } = useStore();
    const [timeRemain, setTimeRemain] = useState([0, 0, 0]);

    const { isLaunch, setIsLaunch } = store;

    useEffect(() => {
        let timer: any;
        if (isLaunch) return () => {
            clearInterval(timer);
        };

        timer = setInterval(() => {
            const [hours, minutes, seconds] = timeToLaunch();

            if (hours + minutes + seconds === 0) {
                clearInterval(timer);
                setIsLaunch();
            }
            setTimeRemain([hours, minutes, seconds]);
        }, 1000);

        return () => clearInterval(timer);

    }, [isLaunch, setIsLaunch]);

    if (isLaunch) return null;

    return (
        <div className={s.wrap}>
            <p className={s.title}>CountDown</p>
            <div className={s.countdown}>
                <div className={s.valueList}>
                    {timeRemain.map((n, idx) => {
                        return (
                            <>
                                <div key={idx}>
                                    <p className={s.value}>{`${n}`.padStart(2, '0')}</p>
                                </div>
                                {idx < 2 && <div className={s.colon}>:</div>}
                            </>
                        );
                    })}
                </div>
                <div className={s.unitList}>
                    {timeRemain.map((_, idx) => {
                        return (
                            <>
                                <div className={s.uint}>{uints[idx]}</div>
                                {idx < 2 && <div className={s.colon} />}
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});
