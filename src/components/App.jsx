import { ContactForm } from './ContactForm/ContactForm';
import { Container, Title, TitleSeccond } from './App.styled';

import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList ';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm />
      <TitleSeccond>Contacts</TitleSeccond>
      <Filter />

      {<ContactList />}
      <ToastContainer autoClose={2000} />
    </Container>
  );
};
