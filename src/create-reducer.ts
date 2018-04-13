'use strict';

import { ActionCallback, Reducer } from '../typings';

export default function createReducer(
    id: string | number,
    getInitialState: () => any,
    actionMap: {
        [key: string]: ActionCallback;
        [key: number]: ActionCallback;
    }
): Reducer {
    return {
        id,
        getInitialState,
        actionMap
    };
}
