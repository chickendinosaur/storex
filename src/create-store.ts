import { actionCallback, getDefaultStateCallback, Reducer } from './globals';
import Store from './store';

export default function createStore(reducers?: Reducer[]): Store {
    return new Store(reducers);
}
