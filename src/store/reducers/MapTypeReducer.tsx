import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

interface MapTypeState {
    mapType: string;
}

const initialMapTypeState: MapTypeState = {
    mapType: 'standard', // Type de carte par défaut
};
// "satellite"
enum MapTypeActionTypes {
    CHANGE_MAP_TYPE = 'CHANGE_MAP_TYPE',
}

const changeMapType = createAction<string>(MapTypeActionTypes.CHANGE_MAP_TYPE);


const MapTypeReducer = createReducer(initialMapTypeState, builder => {
    builder
        .addCase(changeMapType, (state, action: PayloadAction<string>) => {
            state.mapType = action.payload;
        })
        .addCase(PURGE, () => {
            return {
                ...initialMapTypeState,
            };
        });
});

export {
    MapTypeReducer,
    changeMapType,
}
