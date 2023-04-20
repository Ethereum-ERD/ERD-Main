import { useContext } from 'react';

import { MobXProviderContext } from 'mobx-react';

import Store from 'src/store';

export function useStore() {
    return useContext(MobXProviderContext) as { store: Store };
}
