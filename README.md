# Description  

Storex is a simple application state management system for the front-end.

## Problem

Having to regenerate an entire app state each time is not cool.

## Goal

- Keep it simple.
- Similar api/functionality to Redux.
- Performance.
- Allow the ability to create a fresh state each time like Redux.

## Thoughts

Why the name Storex? Because it's a store where 'x' can be anything and had to have an 'x' in the name to be as cool as the other guys.

---  

# Specs  

## Performance  

### Storex

npm run benchmark  

#### new Store(reducer, initialState) x 54,644,160 ops/sec  
#### .dispatchAction(action1) x 21,935,044 ops/sec  

### Redux

node benchmark/redux.js

#### Redux.createStore(reducer, initialState) x 762,368 ops/sec  
#### .dispatch(action1) x 1,003,689 ops/sec  

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
const Action = require('@chickendinosaur/storex/action');
// Pre-made actions can be found at '@chickendinosaur/storex/actions'
const TransactionAction = require('@chickendinosaur/storex/actions/transaction');

var initialState = {
	a: 1,
	b: 'b',
	c: 'c'
};

var reducer = {
	a: function (state, action) {
		if (action.status === 'success') {
			state.a = action.payload.updated;
		}
	}
};

var listener = function (state) {
	console.log('State listener called.');
};

var store = new Store(reducer, initialState);

store.addReducer(reducer);
store.addStateListener(listener);
store.dispatchAction(new TransactionAction('a', {
		updated: true
	}),
	'success');
store.removeReducer(reducer);
store.removeSubscriber(listener);
```

#### Creating a fresh state:

```javascript
// Store level.
store.setState({});

// From a reducer.
var reducer = {
	a: function (state, action) {
		this.setState({
			a: 'hello'
		});
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

