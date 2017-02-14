'use strict';

/**
@class Store
@constructor
@param {*} initialState
*/
function Store(reducers, initialState) {
	// Allow a single reducer to be passed.
	if (reducers !== undefined &&
		reducers.constructor === Object) {
		reducers = [reducers];
	} else {
		reducers = [];
	}

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
	this._reducers = reducers;

	/**
	@property _listeners
	@type {Array}
	*/
	this._listeners = [];
}

Store.prototype.constructor = Store;

/**
@method setState
@return {*}
*/
Store.prototype.setState = function (value) {
	this._state = value;
};

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
	var reduceCallback = null;

	while (i < n) {
		reduceCallback = this._reducers[i][action.type];

		// If a reduce callback is found, execute it with the state.
		if (reduceCallback !== undefined) {
			reduceCallback.call(this, this._state, action);
			break;
		}

		++i;
	}

	// Dispatch the updated state to all subscribers.
	i = 0;
	n = this._listeners.length;

	while (i < n) {
		this._listeners[i](this._state);
		++i;
	}
};

/**
@method addStateListener
@param {Function} subscriber
*/
Store.prototype.addStateListener = function (subscriber) {
	this._listeners[this._listeners.length] = subscriber;
};

/**
@method removeStateListener
@param {Function} subscriber
*/
Store.prototype.removeStateListener = function (subscriber) {
	var index = this._listeners.indexOf(subscriber);

	if (index >= 0) {
		this._listeners.splice(index, 1);
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
