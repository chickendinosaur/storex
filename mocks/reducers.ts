import createReducer from '../src/create-reducer';
import { actionMap1, actionMap2 } from './action-maps';
import { defaultStateCallback } from './default-state-callbacks';

export const reducer1 = createReducer('reducer1', defaultStateCallback, actionMap1);
export const reducer2 = createReducer('reducer2', defaultStateCallback, actionMap2);
