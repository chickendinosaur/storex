# Description

Simple and fast application state management system.

[View](https://chickendinosaur.github.io/storex/) documentation.

# Goal

*   No dependencies.
*   Functional design for extensibility.
*   Easier management of state reducers.
*   Ability to hot swap reducers.
*   Middleware similar to Redux.

# Specs

## Performance

### @chickendinosaur/storex

```
┌──────────────────────────────┬───────────┬──────────────────────────┬─────────────┐
│ NAME                         │ OPS/SEC   │ RELATIVE MARGIN OF ERROR │ SAMPLE SIZE │
├──────────────────────────────┼───────────┼──────────────────────────┼─────────────┤
│ createStore(reducers)        │ 7,473,957 │ ± 0.46%                  │ 91          │
├──────────────────────────────┼───────────┼──────────────────────────┼─────────────┤
│ store.dispatchAction(action) │ 2,032,960 │ ± 0.50%                  │ 93          │
└──────────────────────────────┴───────────┴──────────────────────────┴─────────────┘
```

### redux

```
┌────────────────────────────────────────┬─────────┬──────────────────────────┬─────────────┐
│ NAME                                   │ OPS/SEC │ RELATIVE MARGIN OF ERROR │ SAMPLE SIZE │
├────────────────────────────────────────┼─────────┼──────────────────────────┼─────────────┤
│ createStore(combineReducers(reducers)) │ 24,500  │ ± 0.44%                  │ 94          │
├────────────────────────────────────────┼─────────┼──────────────────────────┼─────────────┤
│ store.dispatch(action)                 │ 83,416  │ ± 0.52%                  │ 91          │
└────────────────────────────────────────┴─────────┴──────────────────────────┴─────────────┘
```

## Overhead

### @chickendinosaur/storex

```
Browserify (minified): 2122 bytes
```

### redux

```
Browserify (minified): 12191 bytes
```

# Getting Started

## Installation

#### npm

```
$ npm i @chickendinosaur/storex
```

## Usage

# Development

## Installation

```
$ git clone https://github.com/chickendinosaur/storex.git
$ cd storex
$ npm i
```

## Build

```
$ npm run build
```

## Benchmarking

```
$ npm run benchmark
```

## Test

```
$ npm run test
```

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
