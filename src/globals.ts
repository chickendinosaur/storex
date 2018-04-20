export interface Action {
    type: string;
    payload?: any;
    [key: string]: any;
}

export interface RootState {
    [key: string]: any;
}

export declare type actionCallback = (state: any, action: Action) => any;
export declare type getDefaultStateCallback = () => any;
export declare type subscriberCallback = (state: RootState) => void;

export interface ActionMap {
    [key: string]: actionCallback;
}

export interface Reducer {
    id: string;
    getDefaultState: getDefaultStateCallback;
    actionMap: ActionMap;
}
