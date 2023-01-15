import React, { useContext, useState } from 'react';

import { useFormik } from "formik";
import * as Yup from 'yup';

import { AppContext } from '../../contexts/AppContext';
import * as api from "../../utils/Api";

import './Profile.css';

export default function Profile({ onLogout, onChange }) {
  const { currentUser } = useContext(AppContext);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // formik form validation logics
  const formik = useFormik({
    initialValues: {
      email: currentUser.email,
      name: currentUser.name,
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Должен быть правильный адрес почты')
        .required('Электропочта обязательна'),
      name: Yup
        .string()
        .min(2, 'Имя - минимум 2 символа')
        .max(30, 'Имя - максимум 30 символов')
        .required('Имя – обязательное поле'),
    }),
    onSubmit: (values) => {
      setIsSubmittingForm(true);
      api.patchUserMe(values.name, values.email)
        .then(data => {
          onChange(data, null);
        })
        .catch(errorMsg => {
          onChange(null, errorMsg);
          console.log(errorMsg);
        })
        .finally(() => {
          setIsSubmittingForm(false);
        });
    }
  });


  return (
    <main className='profile'>
      <h1 className='profile__name'>Привет, {formik.values.name}!</h1>
      <form
        className='profile__form'
        name='form'
        onSubmit={formik.handleSubmit}
      >
        <div className='profile__field-wrapper'>
          <label
            className={`profile__label ${formik.errors.name && 'profile__label_invalid'}`}
            htmlFor='name'>
            {formik.errors.name ? formik.errors.name : 'Имя'}
          </label>
          <input
            className={`profile__input ${formik.touched.name && formik.errors.name && 'profile__input_invalid'}`}
            name='name'
            id='name'
            type='text'
            required
            minLength='2'
            maxLength='30'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmittingForm}
          />
        </div>
        <div className='profile__field-wrapper profile__field-wrapper_last'>
          <label
            className={`profile__label ${formik.errors.email && 'profile__label_invalid'}`}
            htmlFor='email'>
            {formik.errors.email ? formik.errors.email : 'E-mail'}
          </label>
          <input
            className={`profile__input ${formik.touched.email && formik.errors.email && 'profile__input_invalid'}`}
            name='email'
            id='email'
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmittingForm}
            required />
        </div>

        <div className='profile__button-wrapper'>
          <button
            type='submit'
            disabled={!(formik.isValid && (formik.dirty && !isSubmittingForm))}
            className='profile__button profile__button_submit'>
            {isSubmittingForm ? 'Сохраняем...' : 'Редактировать'}
          </button>
          <button
            type='button'
            className='profile__button profile__button_accent'
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  )
}
