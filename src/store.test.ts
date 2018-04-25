import Store from './store';

import { action1, action2 } from '../mocks/actions';
import { reducer1, reducer2 } from '../mocks/reducers';

const reducers = [reducer1, reducer2];

test('new Store()', () => {
    const store = new Store();

    expect(store.reducers).toBe(null);
});

test('new Store(reducers)', () => {
    const store = new Store(reducers);

    expect(store.reducers[0]).toBe(reducer1);
    expect(store.reducers[1]).toBe(reducer2);

    const storeStateKeys = Object.keys(store.state);

    expect(storeStateKeys[0]).toBe('reducer1');
    expect(storeStateKeys[1]).toBe('reducer2');
});

test('store.dispatch', () => {
    const store = new Store(reducers);

    store.dispatchAction(action1);
    expect(store.state.reducer1).toBe(1);
    expect(store.state.reducer2).toBe(1);

    store.dispatchAction(action2);
    expect(store.state.reducer1).toBe(0);
    expect(store.state.reducer2).toBe(0);
});

test('store.addSubscriber', () => {
    const store = new Store(reducers);

    let val = 0;

    const subscriber1 = () => {
        ++val;
    };

    const subscriber2 = () => {
        --val;
    };

    store.addSubscriber(subscriber1);
    expect(store.subscribers.length).toBe(1);

    store.dispatchAction(action1);
    expect(val).toBe(1);
    val = 0;

    store.addSubscriber(subscriber2);
    expect(store.subscribers.length).toBe(2);

    store.dispatchAction(action1);
    expect(val).toBe(0);
});

test('store.removeReducers', () => {
    const store = new Store(reducers);

    store.removeReducers(reducers);
    expect(store.reducers.length).toBe(0);
});
