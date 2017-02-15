# Description  

Simple and fast application state management system.

## Goal

- Keep it simple.
- Similar api/functionality to Redux.
- Performance.
- Do no force creating a state copy to update state.
- Allow middleware.

## Thoughts

Why the name Storex? Because it's a store where 'x' can be anything and had to have an 'x' in the name to be as cool as the other guys.

---  

# Specs  

## Performance  

### Storex

npm run benchmark  

new Store(reducer, initialState) x 57,347,274 ops/sec  
.dispatchAction(action1) x 19,310,330 ops/sec  

### Redux

node benchmarks/redux.js  

.createStore(reducer, initialState) x 741,343 ops/sec  
.dispatch(action) x 872,241 ops/sec  
.dispatch(action) /w Object.assign x 590,541 ops/sec  

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

If you have the need to recreate a new instance of state there's .setState().

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

#### Middleware:

Storex provides the ability to inject middleware between state dispatches.
This can allow for state tracking debug functionality etc.

```javascript
store.use(function (state) {
	console.log(state);
	console.log(this.getState());
});
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

