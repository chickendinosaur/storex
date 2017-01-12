# Description  

Storex is a simple application state management system for the front-end.

## Problem

Just like Flux and Redux the problem to solve is state management and distribution for the front-end. The problem that I am addressing is cutting the fat that makes things more complicated and bogs down performance when the state being managed gets out of hand. Having to regenerate an entire app state each time is not cool.

## Goal

- Keep it simple.
- Similar api/functionality to Redux.
- Outperform

## Thoughts

Why the name Storex? Because it's a store where 'x' can be anything and had to have an 'x' in the name to be as cool as the other guys.

---  

# Specs  

## Performance  

### Storex

new Store(initialState) x 85,245,164 ops/sec  
.dispatchAction(action) x 35,164,983 ops/sec  

---  

# Getting Started  

## Installation

#### npm  

npm install @chickendinosaur/storex

## Usage

```javascript
const createStore = require('@chickendinosaur/storex/createStore');
// Base action.
const StoreAction = require('@chickendinosaur/storex/action');
// Pre-made actions can be found at '@chickendinosaur/storex/actions'
const TransactionAction = require('@chickendinosaur/storex/actions/transaction-action');

var initialState = {
	a: 1,
	b: 'b',
	c: 'c'
};

var reducer = {
	a: function (state, action) {
		state.a = action.payload.updated;
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

