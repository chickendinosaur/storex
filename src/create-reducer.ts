import { actionCallback, getDefaultStateCallback, Reducer } from './types/globals';

export default function createReducer(
    id: string,
    getDefaultState: getDefaultStateCallback,
    actionMap: {
        [key: string]: actionCallback;
        [key: number]: actionCallback;
    }
): Reducer {
    return {
        id,
        getDefaultState,
        actionMap
    };
}
