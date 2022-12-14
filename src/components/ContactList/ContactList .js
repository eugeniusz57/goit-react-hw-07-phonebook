import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { selectContacts, selectStatusFilter } from 'redux/selectors';
import { toast } from 'react-toastify';
import { ButtonDelete, List, ListItem } from './ContactList.styled';
import { Loader } from 'components/Loader/Loader';

export const ContactList = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(selectContacts);

  const filter = useSelector(selectStatusFilter);

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
    <>
      {error && <p>Sorry try again later</p>}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <List>
          {findContact().length === 0 ? (
            <p>You don't have any contact</p>
          ) : (
            findContact().map(({ id, name, phone }) => (
              <ListItem key={id}>
                <span>
                  {name}: {phone}
                </span>
                <ButtonDelete
                  onClick={() => {
                    dispatch(deleteContact(id));
                    toast.success(`Contact deleted!`);
                  }}
                >
                  ❌
                </ButtonDelete>
              </ListItem>
            ))
          )}
        </List>
      )}
    </>
  );
};
