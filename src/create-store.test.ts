import createStore from './create-store';
import Store from './store';

test('createStore()', () => {
    expect(createStore()).toBeInstanceOf(Store);
});
