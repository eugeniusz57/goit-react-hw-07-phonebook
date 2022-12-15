import { useState } from 'react';
import {
  FormAddContact,
  Label,
  Input,
  ButtonSubmit,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';
import { toast } from 'react-toastify';

export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { items } = useSelector(selectContacts);
  const dispatch = useDispatch();
  console.log('contactItems', items);

  const hendleNameChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
      return;
    }
    if (name === 'phone') {
      setPhone(value);
    }
  };

  const clear = () => {
    setName('');
    setPhone('');
  };

  const hendlOnSubmit = e => {
    e.preventDefault();
    if (
      items.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.phone === phone
      )
    ) {
      return toast.info(`${name} or phone:${phone} is alredy in contact`, {
        autoClose: 3000,
      });
    }
    dispatch(addContact({ name, phone }));
    toast.success(`Contact ${name} created!`);
    clear();
  };

  return (
    <FormAddContact onSubmit={hendlOnSubmit}>
      <Label htmlFor="idLabelName">Name</Label>
      <Input
        id="idLabelName"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={hendleNameChange}
      />
      <Label htmlFor="idLabelNumber">Phone</Label>
      <Input
        id="idLabelNumber"
        type="tel"
        name="phone"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={phone}
        onChange={hendleNameChange}
      />

      <ButtonSubmit type="submit"> Add contact </ButtonSubmit>
    </FormAddContact>
  );
}
