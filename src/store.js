'use strict';

module.exports = Store;

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
	this._listeners = null;

	/**
	@property _middleware
	@type {Array}
	*/
	this._middleware = null;
}

Store.prototype.constructor = Store;

/**
@method dispatchAction
@param {Action} action
*/
Store.prototype.dispatchAction = function (action) {
	var reduceCallback = null;
	var i = this._reducers.length - 1;

	while (i >= 0) {
		reduceCallback = this._reducers[i][action.type];

		// If a reduce callback is found, execute it with the state.
		if (reduceCallback !== undefined) {
			reduceCallback.call(this, this._state, action);
			break;
		}
		--i;
	}

	// Run middleware.
	if (this._middleware !== null) {
		i = this._middleware.length - 1;

		while (i >= 0) {
			this._middleware[i].call(this, this._state, action);
			--i;
		}
	}

	// Dispatch the updated state to all listeners.
	if (this._listeners !== null) {
		i = this._listeners.length - 1;

		while (i >= 0) {
			this._listeners[i].call(this, this._state);
			--i;
		}
	}
};

/**
@method getState
@return {*}
*/
Store.prototype.getState = function () {
	return this._state;
};

/**
@method setState
@return {*}
*/
Store.prototype.setState = function (value) {
	this._state = value;
};

/**
@method addStateListener
@param {Function} listener
*/
Store.prototype.addStateListener = function (listener) {
	if (this._listeners === null) {
		this._listeners = [];
	}

	this._listeners[this._listeners.length] = listener;
};

/**
@method removeStateListener
@param {Function} listener
*/
Store.prototype.removeStateListener = function (listener) {
	if (this._listeners.length === 1) {
		this._listeners = null;
	} else {
		this._listeners.splice(this._listeners.indexOf(listener), 1);
	}
};

/**
@method addReducer
@param {Object} reducer
*/
Store.prototype.addReducer = function (reducer) {
	if (this._reducers.indexOf(reducer) === -1) {
		this._reducers[this._reducers.length] = reducer;
	}
};

/**
@method removeReducer
@param {Object} reducer
*/
Store.prototype.removeReducer = function (reducer) {
	this._reducers.splice(this._reducers.indexOf(reducer), 1);
};

/**
@method use
@param {Function} middleware
*/
Store.prototype.use = function (middleware) {
	if (this._middleware === null) {
		this._middleware = [];
	}

	this._middleware[this._middleware.length] = middleware;
};
