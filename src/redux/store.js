import { configureStore } from '@reduxjs/toolkit';

import { filterSlice } from './filterSlice';

import { contactsReducer } from './myContactSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterSlice.reducer,
  },

});


