import { createReducer, createStore } from './index';

test('createReducer', () => {
    expect(createReducer).toBeInstanceOf(Function);
});

test('createStore', () => {
    expect(createStore).toBeInstanceOf(Function);
});
