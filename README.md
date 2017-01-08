# Description  

Storex is a simple, small, state distribution.

## Problem

Just like Flux and Redux the problem to solve is state management and distributed for the front-end. The problem that I am addressing is the features that make things a rather complicated and bog down performance when the state being managed grows to a larger size.

## Goal

- Keep it simple.
- Similar functionality to the larger guys.
- Outperform when state complexity grows.

## Conclusion

As of now the first implement is the bare minimum that gives the same base abilities of Redux at a smaller size and in my opinion cleaner implementation without having to added extra libraries. I will be using this in my project over the competition and will be looking into some ideas on being able to subscribe to updates to specific parts of the state without giving into a pattern like observing with tons of hooks. For now this gets the job done and makes life easy.

Why the name Storex? Because it's a store where 'x' can be anything and had to have an 'x' in the name to be as cool as the other guys.

---  

# Specs  

## Performance  

### Storex

new Store(initialState) x 85,245,164 ops/sec  
.dispatchAction(action1) x 35,164,983 ops/sec  

---  

## Overhead  

Bundler used: browserify (action.js is not bundled)

### Storex

1272 bytes 	minified
549 bytes 	gzipped

---  

# Getting Started  

## Installation

#### npm  

npm install @chickendinosaur/storex

## Usage

```javascript
const Store = require('@chickendinosaur/storex');
const StoreAction = require('@chickendinosaur/storex/action');

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

var store = new Store(initialState);

store.addReducer(reducer);
store.addSubscriber(subscriber);
store.dispatchAction(new StoreAction('a', {
		updated: true
	}));
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

