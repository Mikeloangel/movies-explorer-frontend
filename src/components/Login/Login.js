import React from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from "formik";
import * as Yup from 'yup';

import './Login.css';
import imgLogo from '../../images/logo.png';

export default function Login() {
  // formik form validation logics
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Должен быть правильный адрес почты')
        .required('Электропочта обязательна'),
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

      <h1 className='register__title'>Рады видеть!!</h1>

      <form
        className='register__form'
        name='form'
        noValidate
        onSubmit={formik.handleSubmit}>

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
            Войти
          </button>
          <p className='register__enter'>
            Ещё не зарегистрированы? <Link to='/signup' className='register__link'>Регистрация</Link>
          </p>
        </div>
      </form>
    </main>
  )
}
