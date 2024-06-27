import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom'; 
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';
import { fetchContacts, deleteContact, addContact } from './redux/contacts/operations';
import { selectFilteredContacts } from './redux/contacts/slice';
import { changeFilter, selectNameFilter } from './redux/filters/slice';
import { Layout } from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));

const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  const contacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    console.log('Fetching contacts...');
    dispatch(fetchContacts());
  }, [dispatch]);
  
  console.log('Contacts:', contacts);
  console.log('Filter:', filter);
  

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = (filter) => {
    dispatch(changeFilter(filter));
  };

  const handleAddContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={<RestrictedRoute redirectTo="/contacts" component={<RegistrationPage />} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute redirectTo="/login" component={
              <ContactsPage
                contacts={contacts}
                onAddContact={handleAddContact}
                onDeleteContact={handleDeleteContact}
                filter={filter}
                onFilterChange={handleFilterChange}
              />
            } />}
          />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
