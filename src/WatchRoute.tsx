import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';

import { useStore } from 'src/hooks';

export default observer(function WatchRoute() {
    const location = useLocation();
    const { store: { onRouteChange } } = useStore();

    useEffect(() => {
        onRouteChange(location.pathname);
    }, [location, onRouteChange]);

    return null;
});
