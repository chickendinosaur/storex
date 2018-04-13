export declare class IStore {
    state: {};
    reducers: null | IReducer[];
    subscribers: null | StoreSubscriber[];
    constructor(reducers?: IReducer[], initialState?: {});
    addSubscriber(subscriber: StoreSubscriber): void;
    removeSubscriber(subscriber: StoreSubscriber): void;
    dispatchAction(action: IAction): void;
    update(): void;
    addReducers(reducers: IReducer[]): void;
    getState(): any;
    setState(value: {}): void;
}

export interface IAction {
    type: string | number;
    payload?: any;
}

export interface IReducer {
    id: string | number;
    getInitialState: () => any;
    actionMap: {
        [key: string]: ActionCallback;
        [key: number]: ActionCallback;
    };
}

export declare type StoreSubscriber = (state: any) => void;

export declare type ActionCallback = (state: any, action: IAction) => any;
