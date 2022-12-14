import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { getContacts, getStatusFilter } from 'redux/selectors';

import { ButtonDelete, List, ListItem } from './ContactList.styled';

export const ContactList = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(getContacts);

  const filter = useSelector(getStatusFilter);

  const findContact = () => {
    const toLowerFilter = filter.toLowerCase().trim();
    if (!toLowerFilter) {
      return items;
    }

    return items.filter(item =>
      item.name.toLowerCase().includes(toLowerFilter)
    );
  };

  return (
    <List>
      {findContact().length === 0 ? (
        <p>You don't have any contact</p>
      ) : (
        findContact().map(({ id, name, phone }) => (
          <ListItem key={id}>
            <span>
              {name}: {phone}
            </span>
            <ButtonDelete onClick={() => dispatch(deleteContact(id))}>
              ❌
            </ButtonDelete>
          </ListItem>
        ))
      )}
    </List>
  );
};
