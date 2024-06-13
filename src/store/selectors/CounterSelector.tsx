import { createSelector } from 'reselect';

export const selectCounterValue = createSelector(
  (state) => state.counter,
  (counter) => counter.value,
);