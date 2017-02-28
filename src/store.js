'use strict';

module.exports = Store;

/**
@class Store
@constructor
@param {*} initialState
*/
function Store(reducers, initialState) {
	// Allow a single reducer to be passed.
	if (reducers) {
		if (reducers.constructor === Array) {
			reducers[reducers.length] = reducers;
		} else {
			reducers = [reducers];
		}
	} else {
		reducers = [];
	}

	/**
	@property _state
	@type {*}
	*/
	this._state = initialState || {};

	/**
	@property _reducers
	@type {Array}
	*/
	this._reducers = reducers;

	/**
	@property _stateListeners
	@type {Array}
	*/
	this._stateListeners = null;
}

/**
@method dispatchAction
@param {Action} action
*/
Store.prototype.dispatchAction = function (action) {
	var reduceCallback = null;
	var i = this._reducers.length - 1;
	var stateDidUpdate = false;

	while (i >= 0) {
		reduceCallback = this._reducers[i][action.type];

		// If a reduce callback is found, execute it with the state.
		if (reduceCallback !== undefined) {
			var updatedState = reduceCallback.call(this, this._state, action);

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
