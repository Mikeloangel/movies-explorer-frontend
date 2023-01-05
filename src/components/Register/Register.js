import React from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from "formik";
import * as Yup from 'yup';

import './Register.css';
import imgLogo from '../../images/logo.png';

export default function Register() {
  // formik form validation logics
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: ''
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
      password: Yup
        .string()
        .required('Пароль – оязательное поле'),
    }),
    onSubmit: (values) => {

    }
  });

  return (
    <main className='register'>
      <Link to='/'>
        <img
          src={imgLogo}
          alt='Logo: Movies Explorer'
          lang='en'
          width='38'
          height='38'
          className='register__logo' />
      </Link>

      <h1 className='register__title'>Добро пожаловать!</h1>

      <form
        className='register__form'
        name='form'
        noValidate
        onSubmit={formik.handleSubmit}>

        <label
          className='register__label'
          htmlFor='name'>
          Имя
        </label>
        <input
          className={`register__input ${formik.touched.name && formik.errors.name && 'register__input_invalid'}`}
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
        <p className='register__error-message'>
          {formik.touched.name && formik.errors.name}
        </p>

        <label
          className='register__label'
          htmlFor='email'>
          E-mail
        </label>
        <input
          className={`register__input ${formik.touched.email && formik.errors.email && 'register__input_invalid'}`}
          name='email'
          id='email'
          type='email'
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className='register__error-message'>
          {formik.touched.email && formik.errors.email}
        </p>

        <label
          className='register__label'
          htmlFor='password'>
          Пароль
        </label>
        <input
          className={`register__input ${formik.touched.password && formik.errors.password && 'register__input_invalid'}`}
          name='password'
          id='password'
          type='password'
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className='register__error-message'>
          {formik.touched.password && formik.errors.password}
        </p>

        <div className='register__button-wrapper'>
          <button
            type='submit'
            className='register__button'
            disabled={!formik.isValid || !formik.dirty}
          >
            Зарегистрироваться
          </button>
          <p className='register__enter'>
            Уже зарегистрированы? <Link to='/signin' className='register__link'>Войти</Link>
          </p>
        </div>
      </form>
    </main>
  )
}
