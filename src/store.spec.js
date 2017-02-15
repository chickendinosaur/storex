'use strict';

const tap = require('tap');
const test = tap.test;
const beforeEach = tap.beforeEach;

const Store = require('./store');
const TransactionStoreAction = require('./actions/transaction');

/*
Setup.
*/

var store;

var initialState;

var reducer1 = {
	a: function (state, action) {
		state.a = action.payload.updated;
	}
};

var reducer2 = {
	b: function (state, action) {
		state.b = action.payload.updated;
	}
};

var subscriber = function (state) {
	state.d = true;
};

// Call the supplied function before every subsequent descendent test.
beforeEach(function (done) {
	store = new Store(reducer1, initialState);
	initialState = {
		a: 1,
		b: 'b data',
		c: 'c',
		d: 'd'
	};

	done();
});

test('.setState', function (t) {
	store.setState(null);
	t.equal(store.getState(), null, 'State object changed.');
	t.end();
});

test('.addStateListener', function (t) {
	store.addStateListener(subscriber);

	t.equal(store._listeners.length, 1, 'Subscriber added to subscribers list.');
	t.end();
});

test('.removeStateListener', function (t) {
	store.addStateListener(subscriber);
	store.removeStateListener(subscriber);

	t.equal(store._listeners.length, 0, 'Subscriber removed from subscribers list.');
	t.end();
});

test('.addReducer', function (t) {
	store.addReducer(reducer1);

	t.equal(store._reducers.length, 2, 'Reducer added to reducers list.');
	t.end();
});

test('.removeReducer', function (t) {
	store.removeReducer(reducer1);

	t.equal(store._reducers.length, 0, 'Reducer removed from reducers list.');
	t.end();
});

test('.dispatchAction', function (t) {
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
