import { Action } from './store';
export interface ActionMap {
    [key: string]: actionCallback;
}
export interface Reducer {
    id: string;
    getDefaultState: getDefaultStateCallback;
    actionMap: ActionMap;
}
export declare type actionCallback = (state: any, action: Action) => any;
export declare type getDefaultStateCallback = () => any;
export default function createReducer(id: string, getDefaultState: getDefaultStateCallback, actionMap: ActionMap): Reducer;
