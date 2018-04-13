# Description

Simple and fast application state management system. Built using flow-type to alleviate concerns when implementing.

## Goal

- No dependencies.
- Do not force creating a state copy to update state.
- OOD design for extensibility.
- Easier management of state reducers.

---

# Specs

## Performance

### @chickendinosaur/storex

npm run benchmark

new Store(reducer, initialState) x 19,719,847 ops/sec
.dispatchAction(action) x 19,714,141 ops/sec

### redux

node benchmarks/redux.js

.createStore(reducer, initialState) x 815,745 ops/sec
.dispatch(action) x 1,021,774 ops/sec
.dispatch(action) /w Object.assign x 671,355 ops/sec

## Overhead

### @chickendinosaur/storex

Browserify (minified): 2103 bytes

### redux

Browserify (minified): 12318 bytes

---

# Getting Started

## Installation

#### npm

npm install --save @chickendinosaur/storex

#### flow

To remove flow syntax to run in project install the flow-type preset:

npm install --save babel-preset-flow

Add the preset to the project's .babelrc:

```javascript
{
	"presets": [
    "flow"
  ]
}
```

## Usage

#### Basic:

The store will only run state subscribers/listeners if state is return from a
reducer callback.

```javascript
import Store { Reducer } from '@chickendinosaur/storex';

var initialState = {
	a: 1,
	b: 'b',
	c: 'c'
};

var reducer = new Reducer({
	a: function (state, action) {
		if (action.status === 'success') {
			state.a = action.payload.updated;
			return state;
		}
	}
});

var listener = function (state) {
	console.log('State listener called.');
};

var store = new Store(reducer, initialState);

store.addReducer(reducer);
store.addSubscriber(listener);
store.dispatchAction(new TransactionAction('a', {
		updated: true
	}),
	'success');
store.removeReducer(reducer);
store.removeSubscriber(listener);
```

#### Creating a fresh state:

Returning a new object from a reducer callback set's the store state.

```javascript
// From a reducer.
var reducer = new Reducer({
	a: function (state, action) {
		return {
			a: 'newA'
		}
	}
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

## Deploy

* npm run deploy

---

# License

The MIT License (MIT)

Copyright (c) 2016 John Pittman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
