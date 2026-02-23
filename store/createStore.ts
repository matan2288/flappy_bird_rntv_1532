import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

const connectDevtools = <T>(store: UseBoundStore<StoreApi<T>>, name: string) => {
    if (typeof window === 'undefined' || !(window as any).__REDUX_DEVTOOLS_EXTENSION__) return;

    const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect({ name });
    extension.init(store.getState());
    store.subscribe((state) => extension.send('setState', state));
};

export const createStore = <T>(
    name: string,
    stateCreator: StateCreator<T>
) => {
    const store = create<T>()(stateCreator);
    connectDevtools(store, name);
    return store;
};
