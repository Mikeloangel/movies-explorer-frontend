import React, { useContext } from 'react';

import { useFormik } from "formik";
import * as Yup from 'yup';

import { AppContext } from '../../contexts/AppContext';

import './Profile.css';

export default function Profile() {
  const { currentUser } = useContext(AppContext);

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

    }
  });


  return (
    <main className='profile'>
      <h1 className='profile__name'>Привет, {formik.values.name}!</h1>
      <form
        className='profile__form'
        name='form'
        noValidate
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
            required />
        </div>

        <div className='profile__button-wrapper'>
          <button
            type='submit'
            disabled={!formik.isValid}
            className='profile__button profile__button_submit'>
            Редактировать
          </button>
          <button
            type='button'
            className='profile__button profile__button_accent'>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  )
}