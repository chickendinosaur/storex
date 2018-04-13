'use strict';

import Store from './store';

import { Reducer } from '../typings';

export default function createStore(reducers: Reducer[]): {} {
    return new Store(reducers);
}
