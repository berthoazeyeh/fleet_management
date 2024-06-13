import { createAction } from '@reduxjs/toolkit';

export const SelectedRouteScreenActionType = {
    CHANGE_SELECTED_ROUTE_SCREEN: 'CHANGE_SELECTED_ROUTE_SCREEN',
  }
    
export const selectedRouteScreenAction = createAction<string>(SelectedRouteScreenActionType.CHANGE_SELECTED_ROUTE_SCREEN);
  