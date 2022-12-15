import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'redux/operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const myContact = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [addContact.pending]: handlePending,
    [deleteContact.pending]: handlePending,

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

    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1);
    },

    [fetchContacts.rejected]: handleRejected,
    [addContact.rejected]: handleRejected,
    [deleteContact.rejected]: handleRejected,
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
