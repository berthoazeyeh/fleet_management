import { combineReducers } from 'redux';
import { CounterReducer } from '@store/reducers/CounterReducer';
import { TranslationReducer } from '@store/reducers/TranslationReducer';
import { SelectedRouteScreenReducer } from '@store/reducers/SelectedRouteScreenReducer';
import { ThemeReducer } from './ThemeReducer';
import { MapTypeReducer } from './MapTypeReducer';

const RootReducer = combineReducers({
    counter: CounterReducer,
    translation: TranslationReducer, // Ajoutez le reducer de traduction ici
    current_screen: SelectedRouteScreenReducer,
    theme: ThemeReducer,
    mapType: MapTypeReducer,
});

export default RootReducer
