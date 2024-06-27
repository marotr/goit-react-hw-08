
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, fetchContacts } from './redux/contacts/operations';
import { selectFilteredContacts } from './redux/contacts/slice';
import { changeFilter, selectNameFilter } from './redux/filters/slice';
import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-rx';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';

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
        <Route path = "/register" element = {<RestrictedRoute redirectTo = "/contacts" component={<RegistrationPage/>}></RestrictedRoute>}></Route>
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/tasks" component={<LoginPage />} />
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage 
            contacts ={contacts}
            onAddContact = {handleAddContact}
            onDeleteContact = {handleDeleteContact}
            filter = {filter}
            onFilterChange = {handleFilterChange}/>
          } />
          }
        />
         </Routes>

    </Layout>
  
  );
};

export default App;  
