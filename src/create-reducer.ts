'use strict';

import { ActionCallback, IReducer } from '../types';

export default function createReducer(
    id: string | number,
    getInitialState: () => any,
    actionMap: {
        [key: string]: ActionCallback;
        [key: number]: ActionCallback;
    }
): IReducer {
    return {
        id,
        getInitialState,
        actionMap
    };
}
