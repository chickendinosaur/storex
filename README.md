# Description  

Storex is a simple application state management system for the front-end.

## Problem

Having to regenerate an entire app state each time is not cool.

## Goal

- Keep it simple.
- Similar api/functionality to Redux.
- Outperform.
- Leave it to the user to say when the state has been updated.

## Thoughts

Why the name Storex? Because it's a store where 'x' can be anything and had to have an 'x' in the name to be as cool as the other guys.

---  

# Specs  

## Performance  

### Storex

new Store(reducer, initialState) x 45,061,306 ops/sec  
.dispatchAction(action1) w/ .setState(state) x 20,164,919 ops/sec  

---  

# Getting Started  

## Installation

#### npm  

npm install @chickendinosaur/storex

## Usage

#### Basic:

```javascript
const storex = require('@chickendinosaur/storex');
// Base action.
const StoreAction = storex.Action;
// Pre-made actions can be found at '@chickendinosaur/storex/actions'
const TransactionAction = storex.TransactionAction

var initialState = {
	a: 1,
	b: 'b',
	c: 'c'
};

var reducer = {
	a: function (state, action) {
		state.a = action.payload.updated;
		// Re-use the same top level state to avoid having to create a full state copy.
		this.setState(state);
	}
};

var subscriber = function (state) {
	state.c = true;
};

var store = new Store(reducer, initialState);

store.addReducer(reducer);
store.addSubscriber(subscriber);
store.dispatchAction(new TransactionAction('a', {
		updated: true
	}),
	'pending');
store.removeReducer(reducer);
store.removeSubscriber(subscriber);
```

#### Creating a fresh state:

```javascript
// Store level.
store.setState({});

// From a reducer.
var reducer = {
	a: function (state, action) {
		this.setState({});
	}
};
```
---  

# Development  

## Installation  

~/project/:

* npm install

## Build  

* npm run build

## Benchmarking  

* npm run benchmark

## Test  

* npm run test

---  

# License  

test

