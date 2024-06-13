import { createAction } from '@reduxjs/toolkit';

export const CounterActionTypes = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
};

export const incrementCount = createAction(CounterActionTypes.INCREMENT);
export const decrementCount = createAction(CounterActionTypes.DECREMENT);