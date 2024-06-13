// actions/TranslationActionTypes.ts
import { createAction } from '@reduxjs/toolkit';

export const ThemeActionTypes = {
  CHANGE_THEME: 'CHANGE_THEME',
  SET_SYSTEM_THEME: 'SET_SYSTEM_THEME',
}

export const changeLanguage = createAction<string>(ThemeActionTypes.CHANGE_THEME);
