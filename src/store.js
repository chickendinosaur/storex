'use strict';

const Reducer = require('./reducer');

module.exports = Store;

/**
@class Store
@constructor
@param {Array|Reducer} reducers
@param {*} initialState
*/
function Store(reducers, initialState) {
	/**
	@property _state
	@type {*}
	*/
	this._state = initialState || {};

	/**
	@property _reducers
	@type {Array}
	*/
	this._reducers = [];

	/**
	@property _stateListeners
	@type {Array}
	*/
	this._stateListeners = null;

	// Add reducers.
	if (reducers !== undefined &&
		reducers.constructor === Array) {
		this.addReducers(reducers);
	} else {
		this.addReducer(reducers);
	}
}

/**
@method dispatchAction
@param {Action} action
*/
Store.prototype.dispatchAction = function (action) {
	var actionListener = null;
	var i = this._reducers.length - 1;
	var stateDidUpdate = false;

	while (i >= 0) {
		actionListener = this._reducers[i]._actionListeners[action.type];

		// If a reduce callback is found, execute it with the state.
		if (actionListener !== undefined) {
			var updatedState = actionListener.call(this, this._state, action);

			if (updatedState !== undefined) {
				this._state = updatedState;
				stateDidUpdate = true;
			}
		}

		--i;
	}

	if (stateDidUpdate == true) {
		this.dispatchState(this._state);
	}
};

/**
Dispatch the current state to all state listeners.
@method dispatchState
@param {State} state
*/
Store.prototype.dispatchState = function (state) {
	if (this._stateListeners !== null) {
		var i = this._stateListeners.length - 1;

		while (i >= 0) {
			this._stateListeners[i].call(this, state);
			--i;
		}
	}
}

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
	this.dispatchState(value);
};

/**
@method addStateListener
@param {Function} listener
*/
Store.prototype.addStateListener = function (listener) {
	if (this._stateListeners === null) {
		this._stateListeners = [];
	}

	this._stateListeners[this._stateListeners.length] = listener;
};

/**
@method removeStateListener
@param {Function} listener
*/
Store.prototype.removeStateListener = function (listener) {
	if (this._stateListeners.length === 1) {
		this._stateListeners = null;
	} else {
		this._stateListeners.splice(this._stateListeners.indexOf(listener), 1);
	}
};

/**
@method addReducer
@param {Object} reducer
*/
Store.prototype.addReducer = function (reducer) {
	if (reducer.constructor === Reducer &&
		this._reducers.indexOf(reducer) === -1) {
		this._reducers[this._reducers.length] = reducer;
	}
};

/**
@method addReducers
@param {Array} reducers
*/
Store.prototype.addReducers = function (reducers) {
	var i = reducers.length;
	while (--i >= 0) {
		this.addReducer(reducers[i]);
	}
};

/**
@method removeReducer
@param {Object} reducer
*/
Store.prototype.removeReducer = function (reducer) {
	this._reducers.splice(this._reducers.indexOf(reducer), 1);
};
