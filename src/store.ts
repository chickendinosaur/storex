import { Reducer } from './create-reducer';

export interface Action {
    type: string;
    payload?: any;
    [key: string]: any;
}

export declare type subscriberCallback = (state: RootState) => void;

export interface RootState {
    [key: string]: any;
}

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

        this.subscribers.push(subscriber);
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
        const reducersLen = reducers.length;
        let i = 0;
        let reducer;

        for (; i < reducersLen; ++i) {
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
