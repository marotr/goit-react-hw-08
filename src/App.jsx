
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import { changeFilter, selectNameFilter } from './redux/filtersSlice';
import { selectFilteredContacts } from './redux/contactsSlice';
import { addContact, deleteContact, fetchContacts } from './redux/contactsOps';

const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  const contacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

 

  const handleAddContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = (filter) => {
    dispatch(changeFilter(filter));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox value={filter} onFilter={handleFilterChange} />
      <ContactList contacts={contacts} onDelete={handleDeleteContact} />
    </div>
  );
};

export default App;  
