import Store from './store';
import { actionCallback, getDefaultStateCallback, Reducer } from './types/globals';

export default function createStore(reducers: Reducer[]): Store {
    return new Store(reducers);
}
