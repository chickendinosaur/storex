import Store from './store';
import { Reducer } from './types/globals';
export default function createStore(reducers: Reducer[]): Store;
