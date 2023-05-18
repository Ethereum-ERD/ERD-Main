import { memo, useEffect, useRef } from 'react';

const SentinelStyle = {
    width: '100%',
    height: 1
};

function Sentinel({
    onLoad,
    rootMargin
}: {
    onLoad: () => any;
    rootMargin?: string;
}) {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const io = new IntersectionObserver((entries) => {
            if (entries?.[0].intersectionRatio > 0) {
                onLoad();
                io.disconnect();
            }
        }, {
            rootMargin: rootMargin || '100px'
        });
        io.observe(elRef.current!);

        return () => io.disconnect();
    }, [onLoad, rootMargin]);

    return <div ref={elRef} style={SentinelStyle} />;
}

export default memo(Sentinel);
