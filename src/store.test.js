'use strict';

const tape = require('tape');
const tapes = require('tapes');
const test = tapes(tape, {
	delimiter: '->'
});

/*
Setup.
*/

const Store = require('./store');
const TransactionStoreAction = require('./actions/transaction');

var store;

var initialState;

var reducer1 = {
	a: function (state, action) {
		state.a = action.payload.updated;
		return state;
	}
};

var reducer2 = {
	b: function (state, action) {
		state.b = action.payload.updated;
		return state;
	}
};

var subscriber = function (state) {
	state.d = true;
};

/*
Test
*/

test('Store', function (t) {

	/*
	beforeEach
	*/

	t.beforeEach(function (t) {
		initialState = {
			a: 1,
			b: 'b data',
			c: 'c',
			d: 'd'
		};

		store = new Store(reducer1, initialState);

		t.end();
	});

	/*
	afterEach
	*/

	t.afterEach(function (t) {
		t.end();
	});

	/*
	Tests
	*/

	t.test('.setState', function (t) {
		store.setState(null);
		t.equal(store.getState(), null, 'State object changed.');
		t.end();
	});

	t.test('.addStateListener', function (t) {
		store.addStateListener(subscriber);

		t.equal(store._stateListeners.length, 1, 'Subscriber added to subscribers list.');
		t.end();
	});

	t.test('.removeStateListener', function (t) {
		store.addStateListener(subscriber);
		store.addStateListener(subscriber);

		store.removeStateListener(subscriber);
		t.equal(store._stateListeners.length, 1, 'Listener removed from subscribers list.');
		store.removeStateListener(subscriber);
		t.equal(store._stateListeners, null, 'Last listener was removed.');
		t.end();
	});

	t.test('.addReducer', function (t) {
		store.addReducer(reducer1);
		t.equal(store._reducers.length, 1, 'Same reducer cannot be added more than once.');

		store.addReducer(reducer2);
		t.equal(store._reducers.length, 2, 'Reducer added to reducers list.');
		t.end();
	});

	t.test('.removeReducer', function (t) {
		store.removeReducer(reducer1);

		t.equal(store._reducers.length, 0, 'Reducer removed from reducers list.');
		t.end();
	});

	t.test('.dispatchAction', function (t) {
		store.addStateListener(subscriber);
		store.addReducer(reducer1);
		store.dispatchAction(new TransactionStoreAction('a', {
			updated: true
		}));

		t.equal(store.getState().a, true, 'State from reducer 1 updated.');
		t.equal(store.getState().d, true, 'Subscriber called.');

		store.addReducer(reducer2);
		store.dispatchAction(new TransactionStoreAction('b', {
			updated: true
		}));

		t.equal(store.getState().b, true, 'State from reducer 2 updated.');
		t.end();
	});

	t.end();
});
