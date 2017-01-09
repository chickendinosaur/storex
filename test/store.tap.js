'use strict';

const tap = require('tap');
const test = tap.test;
const beforeEach = tap.beforeEach;
const afterEach = tap.afterEach;
const teardown = tap.teardown;

const Store = require('../src/store');
const TransactionStoreAction = require('../src/actions/transaction-action');

/*
Setup.
*/

var store;

var initialState = {
	a: 1,
	b: 'b data',
	c: 'c'
};

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
	state.c = true;
};

// Call the supplied function before every subsequent descendent test.
beforeEach(function (done) {
	store = new Store(initialState);

	done();
});

// Call the supplied function after every subsequent descendent test.
afterEach(function (done) {
	done();
});

// Run the supplied function when t.end() is called, or when the plan is met.
teardown(function () {});

test('.addSubscriber', function (t) {
	store.addSubscriber(subscriber);

	t.equal(store._subscribers.length, 1, 'Subscriber added to subscribers list.');
	t.end();
});

test('.removeSubscriber', function (t) {
	store.addSubscriber(subscriber);
	store.removeSubscriber(subscriber);

	t.equal(store._subscribers.length, 0, 'Subscriber removed from subscribers list.');
	t.end();
});

test('.addReducer', function (t) {
	store.addReducer(reducer1);

	t.equal(store._reducers.length, 1, 'Reducer added to reducers list.');
	t.end();
});

test('.removeReducer', function (t) {
	store.removeReducer(reducer1);

	t.equal(store._reducers.length, 0, 'Reducer removed to reducers list.');
	t.end();
});

test('.dispatchAction', function (t) {
	store.addSubscriber(subscriber);
	store.addReducer(reducer1);
	store.dispatchAction(new TransactionStoreAction('a', {
		updated: true
	}));

	t.equal(store.getState().a, true, 'State from reducer 1 updated.');

	store.addReducer(reducer2);
	store.dispatchAction(new TransactionStoreAction('b', {
		updated: true
	}));

	t.equal(store.getState().b, true, 'State from reducer 2 updated.');
	t.equal(store.getState().c, true, 'Subscriber called.');
	t.end();
});
