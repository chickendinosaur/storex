import { Reducer } from './create-reducer';
export interface Action {
    type: string;
    payload?: any;
    [key: string]: any;
}
export declare type subscriberCallback = (state: RootState) => void;
export interface RootState {
    [key: string]: any;
}
export default class Store {
    state: RootState;
    reducers: null | Reducer[];
    subscribers: null | subscriberCallback[];
    constructor(reducers?: Reducer[], initialState?: RootState);
    dispatchAction(action: Action): Action;
    update(): void;
    getState(): RootState;
    setState(value: RootState): void;
    addSubscriber(subscriber: subscriberCallback): void;
    removeSubscriber(subscriber: subscriberCallback): void;
    addReducers(reducers: Reducer[]): void;
    removeReducers(reducers: Reducer[]): void;
}
