import { createSelector } from 'reselect';

// Sélecteur pour obtenir la langue de la traduction
export const selectCurrentScreenValue = createSelector(
  (state) => state.current_screen,
  (current_screen) => current_screen.route_name,
);