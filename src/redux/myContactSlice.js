import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'redux/operations';

export const myContact = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [addContact.pending](state) {
      state.isLoading = true;
    },

    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },

    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },

    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
// reducers: {
//   addContact: {
//     reducer(state, action) {
//       state.contacts.push(action.payload);
//     },
//     prepare(date) {
//       return {
//         payload: {
//           id: nanoid(),
//           ...date,
//         },
//       };
//     },
//   },

//     deleteContact(state, action) {
//       state.contacts = [
//         ...state.contacts.filter(({ id }) => id !== action.payload),
//       ];
//     },
//   },
// });

export const contactsReducer = myContact.reducer;
// export const { deleteContact, addContact } = myContact.actions;
