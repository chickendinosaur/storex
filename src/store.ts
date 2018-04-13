'use strict';

import { ActionCallback, IAction, IReducer, StoreSubscriber } from '../types';

export default class Store {
    state: { [key: string]: any; [key: number]: any };
    reducers: null | IReducer[];
    subscribers: null | StoreSubscriber[];

    constructor(reducers?: IReducer[], initialState?: {}) {
        this.state = initialState || {};
        this.reducers = null;
        this.subscribers = null;

        // Apply reducers.
        if (reducers !== undefined) {
            this.addReducers(reducers);
        }
    }

    dispatchAction(action: IAction): IAction {
        if (this.reducers !== null) {
            let i = this.reducers.length;

            while (--i >= 0) {
                const reducer = this.reducers[i];
                const actionCallback = reducer.actionMap[action.type];

                if (actionCallback !== undefined) {
                    this.state[reducer.id] = actionCallback(this.state[reducer.id], action);
                }
            }

            this.update();
        }

        return action;
    }

    update(): void {
        if (this.subscribers !== null) {
            let i = this.subscribers.length;

            while (--i >= 0) {
                this.subscribers[i](this.state);
            }
        }
    }

    getState(): any {
        return this.state;
    }

    setState(value: {}): void {
        this.state = value;
        this.update();
    }

    addSubscriber(subscriber: StoreSubscriber): void {
        if (this.subscribers === null) {
            this.subscribers = [];
        }

        this.subscribers[this.subscribers.length] = subscriber;
    }

    removeSubscriber(subscriber: StoreSubscriber): void {
        if (this.subscribers !== null) {
            if (this.subscribers.length === 1) {
                this.subscribers = null;
            } else {
                this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
            }
        }
    }

    addReducers(reducers: IReducer[]): void {
        let i = reducers.length;
        let reducer;

        while (--i >= 0) {
            reducer = reducers[i];

            if (this.state[reducer.id] === undefined) {
                // Generate initial state for the given state key only if it has not been set.
                this.state[reducer.id] = reducer.getInitialState();
            }

            if (this.reducers === null) {
                this.reducers = reducers;
            } else if (this.reducers.indexOf(reducer) === -1) {
                // Prevent duplicate reducers.
                this.reducers.push(reducer);
            }
        }
    }

    removeReducers(reducers: IReducer[]): void {
        if (this.reducers !== null) {
            let i = reducers.length;

            while (--i >= 0) {
                this.reducers.splice(this.reducers.indexOf(reducers[i]), 1);
            }
        }
    }
}
