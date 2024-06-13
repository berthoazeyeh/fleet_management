import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Sélecteur pour obtenir la langue de la traduction
export const selectLanguageValue = createSelector(
  (state) => state.translation,
  (translation) => translation.language,
);
export const selectMapType = createSelector(
  (state) => state.mapType,
  (mapType) => mapType.mapType,
);

const selectThemeValue = createSelector(
  (state) => state.theme,
  (theme) => theme.theme,
);

export const useTheme = () => useSelector(selectThemeValue);
