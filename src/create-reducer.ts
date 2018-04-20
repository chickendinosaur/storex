import { actionCallback, ActionMap, getDefaultStateCallback, Reducer } from './types/globals';

export default function createReducer(
    id: string,
    getDefaultState: getDefaultStateCallback,
    actionMap: ActionMap
): Reducer {
    return {
        id,
        getDefaultState,
        actionMap
    };
}
