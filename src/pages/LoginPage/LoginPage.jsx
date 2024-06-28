import { Field, Form, Formik } from 'formik'

import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import css from '../RegistrationPage/RegistrationAndLogin.module.css'

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      login({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    )
      .unwrap()
      .then(() => {
        console.log('login success');
      })
      .catch(() => {
        console.log('login error');
      });

    form.reset();
  };
  
	
	return (
		<Formik className={css.container} initialValues={{ password: '', email: '' }} onSubmit={handleSubmit}>
			<Form>
				<label >Email: </label>
				<Field  type = "email" name='email'  />
			
				<label >Password: </label>
				<Field name='password'  type='password' />
				
				<button type='submit'>Login</button>
			</Form>
		</Formik>
	)
}

export default LoginPage