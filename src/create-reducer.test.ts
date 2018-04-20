import createReducer from './create-reducer';

test('createStore()', () => {
    expect(
        createReducer(
            'foo',
            () => {
                return null;
            },
            {}
        )
    ).toBeDefined();
});
