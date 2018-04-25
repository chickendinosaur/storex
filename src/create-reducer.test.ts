import createReducer from './create-reducer';

import { actionMap1 } from '../mocks/action-maps';
import { defaultStateCallback } from '../mocks/default-state-callbacks';

test('createReducer(id, defaultStateCallback, actionMap)', () => {
    const reducer = createReducer('foo', defaultStateCallback, actionMap1);

    expect(reducer).toBeDefined();
});
