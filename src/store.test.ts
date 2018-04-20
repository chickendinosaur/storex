import Store from './store';

test('new Store()', () => {
    expect(new Store()).toBeInstanceOf(Store);
});
