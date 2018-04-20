import { Action, Reducer, RootState, subscriberCallback } from './types/globals';

export default class Store {
    state: RootState;
    reducers: null | Reducer[];
    subscribers: null | subscriberCallback[];

    constructor(reducers?: Reducer[], initialState?: RootState) {
        this.state = initialState || {};
        this.reducers = null;
        this.subscribers = null;

        // Apply reducers.
        if (reducers !== undefined) {
            this.addReducers(reducers);
        }
    }

    dispatchAction(action: Action): Action {
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

    getState(): RootState {
        return this.state;
    }

    setState(value: RootState): void {
        this.state = value;
        this.update();
    }

    addSubscriber(subscriber: subscriberCallback): void {
        if (this.subscribers === null) {
            this.subscribers = [];
        }

        this.subscribers[this.subscribers.length] = subscriber;
    }

    removeSubscriber(subscriber: subscriberCallback): void {
        if (this.subscribers !== null) {
            if (this.subscribers.length === 1) {
                this.subscribers = null;
            } else {
                this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
            }
        }
    }

    addReducers(reducers: Reducer[]): void {
        let i = reducers.length;
        let reducer;

        while (--i >= 0) {
            reducer = reducers[i];

            if (this.state[reducer.id] === undefined) {
                // Generate initial state for the given state key only if it has not been set.
                this.state[reducer.id] = reducer.getDefaultState();
            }

            if (this.reducers === null) {
                this.reducers = reducers;
            } else if (this.reducers.indexOf(reducer) === -1) {
                // Prevent duplicate reducers.
                this.reducers.push(reducer);
            }
        }
    }

    removeReducers(reducers: Reducer[]): void {
        if (this.reducers !== null) {
            let i = reducers.length;

            while (--i >= 0) {
                this.reducers.splice(this.reducers.indexOf(reducers[i]), 1);
            }
        }
    }
}
