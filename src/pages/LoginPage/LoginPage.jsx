import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './LoginPage.module.css'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  
  email: Yup.string()
    .email('Invalid email')
    .required('required'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .max(20, 'Maximum 20 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('required')
});


const RegistrationPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      register({
       
        email: values.email,
        password: values.password,
      })
    );
    resetForm();
  };

  return (
    <div className={css.container}>
   <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>Email: </label>
        <Field  className={css.field} name="email" type="email" />
        <ErrorMessage className={css.ErrorMessage} email='name' component='span' />

        <label className={css.label}>Password: </label>
        <Field  className={css.field} name="password" type="password" />
        <ErrorMessage className={css.ErrorMessage} name="password" component="span" />
        <button type="submit">Register</button>
      </Form>
    </Formik>

    </div>
 
  );
};

export default RegistrationPage;
