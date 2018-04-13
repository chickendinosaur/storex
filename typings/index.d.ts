declare class Store {
    state: {};
    reducers: Reducer[];
    subscribers: null | StoreSubscriber[];
    constructor(reducers?: Reducer[], initialState?: {});
    addSubscriber(subscriber: StoreSubscriber): void;
    removeSubscriber(subscriber: StoreSubscriber): void;
    dispatchAction(action: Action): void;
    dispatchState(state: any): void;
    addReducers(reducers: Reducer[]): void;
    getState(): any;
    setState(value: {}): void;
}

export interface Action {
    type: string | number;
    payload?: any;
}

export interface Reducer {
    id: string | number;
    getInitialState: () => any;
    actionMap: {
        [key: string]: ActionCallback;
        [key: number]: ActionCallback;
    };
}

declare type StoreSubscriber = (state: any) => void;

declare type ActionCallback = (state: any, action: Action, store: Store) => any;
