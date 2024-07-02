import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations'; // Assuming login operation exists in auth/operations
import css from './LoginForm.module.css';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      login({
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
          <label className={css.label}>Email:</label>
          <Field className={css.field} name="email" type="email" />
          <ErrorMessage className={css.errorMessage} name="email" component="span" />
          
          <label className={css.label}>Password:</label>
          <Field className={css.field} name="password" type="password" />
          <ErrorMessage className={css.errorMessage} name="password" component="span" />
          
          <button type="submit">Log in</button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
