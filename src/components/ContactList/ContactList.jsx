
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import { deleteContact } from '../../redux/contactsOps';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);

  const handleDelete = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul className={css.contactContainer}>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          name={contact.name}
          number={contact.number}
          id={contact.id}
          onDelete={() => handleDelete(contact.id)}
        />
      ))}
    </ul>
  );
};

export default ContactList