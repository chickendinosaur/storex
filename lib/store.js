'use strict';

/**
@class Store
@constructor
@param {*} initialState
*/
function Store(initialState) {
	if (initialState === undefined) {
		initialState = {};
	}

	/**
	@property _state
	@type {*}
	*/
	this._state = initialState;

	/**
	@property _reducers
	@type {Array}
	*/
	this._reducers = [];

	/**
	@property _subscribers
	@type {Array}
	*/
	this._subscribers = [];
}

Store.prototype.constructor = Store;

/**
@method getState
@return {*}
*/
Store.prototype.getState = function () {
	return this._state;
};

/**
@method dispatchAction
@param {Action} action
*/
Store.prototype.dispatchAction = function (action) {
	var i = 0;
	var n = this._reducers.length;
	var reduceCallback;

	while (i < n) {
		reduceCallback = this._reducers[i][action.type];

		// If a reduce callback is found, execute it with the state,
		if (reduceCallback !== undefined) {
			reduceCallback(this._state, action);

			// Dispatch the updated state to all subscribers.
			i = 0;
			n = this._subscribers.length;

			while (i < n) {
				this._subscribers[i](this._state);
				++i;
			}

			// Finish.
			break;
		}

		++i;
	}
};

/**
@method addSubscriber
@param {Function} subscriber
*/
Store.prototype.addSubscriber = function (subscriber) {
	this._subscribers[this._subscribers.length] = subscriber;
};

/**
@method removeSubscriber
@param {Function} subscriber
*/
Store.prototype.removeSubscriber = function (subscriber) {
	var index = this._subscribers.indexOf(subscriber);

	if (index >= 0) {
		this._subscribers.splice(index, 1);
	}
};

/**
@method addSubscriber
@param {Object} reducer
*/
Store.prototype.addReducer = function (reducer) {
	this._reducers[this._reducers.length] = reducer;
};

/**
@method removeReducer
@param {Object} reducer
*/
Store.prototype.removeReducer = function (reducer) {
	var index = this._reducers.indexOf(reducer);

	if (index >= 0) {
		this._reducers.splice(index, 1);
	}
};

module.exports = Store;
