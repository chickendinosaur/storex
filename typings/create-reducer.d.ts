import { ActionMap, getDefaultStateCallback, Reducer } from './globals';
export default function createReducer(id: string, getDefaultState: getDefaultStateCallback, actionMap: ActionMap): Reducer;
