
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import { addContact, deleteContact, fetchContacts } from './redux/contacts/operations';
import { selectFilteredContacts } from './redux/contacts/slice';
import { changeFilter, selectNameFilter } from './redux/filters/slice';
import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-rx';
import { RestrictedRoute } from './components/RestrictedRoute';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage'));

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

    <Layout>
      <Routes>
        <Route path = "/" element = {HomePage}></Route>
        <Route path = "/register" element = {RestrictedRoute}></Route>
      </Routes>

    </Layout>
    // <div>
    //   <h1>Phonebook</h1>
    //   <ContactForm onAddContact={handleAddContact} />
    //   <SearchBox value={filter} onFilter={handleFilterChange} />
    //   <ContactList contacts={contacts} onDelete={handleDeleteContact} />
    // </div>
  );
};

export default App;  
