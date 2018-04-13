'use strict';

import Store from './store';

import { IReducer, IStore } from '../types';

export default function createStore(reducers: IReducer[]): IStore {
    return new Store(reducers);
}
