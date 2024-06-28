import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegistrationPage.module.css'


const RegistrationPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
    resetForm();
  };

  return (
    <div className={css.container}>
   <Formik
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>Name: </label>
        <Field className={css.field} name="name" />
      
        <label className={css.label}>Email: </label>
        <Field  className={css.field} name="email" type="email" />
      
        <label className={css.label}>Password: </label>
        <Field  className={css.field} name="password" type="password" />
      
        <button type="submit">Register</button>
      </Form>
    </Formik>

    </div>
 
  );
};

export default RegistrationPage;
