
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './ContactForm.module.css';
import { useId } from 'react';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('required'),
  phone: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('required').matches(/^\d+$/, 'Phone number must be numeric')
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const phoneFieldId = useId();

  return (
    <Formik
      initialValues={{
        name: '',
        phone: ''
      }}
      onSubmit={(values, actions) => {
        const newContact = {
          id: nanoid(),
          name: values.name,
          number: values.phone,
        };
        dispatch(addContact(newContact)); 
        actions.resetForm();
      }}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor={nameFieldId}>Name</label>
        <Field className={css.input} type="text" name="name" id={nameFieldId} />
        <ErrorMessage className={css.ErrorMessage} name='name' component='span' />
        <label className={css.label} htmlFor={phoneFieldId}>Number</label>
        <Field className={css.input} type="tel" name="phone" id={phoneFieldId} />
        <ErrorMessage className={css.ErrorMessage} name='phone' component='span' />
        <button className={css.submitBtn} type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};


export default ContactForm
