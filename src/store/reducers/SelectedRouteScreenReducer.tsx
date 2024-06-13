import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { SelectedRouteScreenActionType } from '@store/actions';

interface SelectedScreenRouteState {
  route_name: string;
}

const initialState: SelectedScreenRouteState = {
  route_name: 'home_screen',
};

const SelectedRouteScreenReducer = createReducer(initialState, builder => {
  builder
    .addCase(SelectedRouteScreenActionType.CHANGE_SELECTED_ROUTE_SCREEN, (state, action: PayloadAction<string>) => {
      state.route_name = action.payload;
    })
    .addCase(PURGE, () => {
      return {
        ...initialState,
      };
    });
});

export {
  SelectedRouteScreenReducer
}