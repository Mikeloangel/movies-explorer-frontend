import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';
import * as api from "../../utils/MainApi";

import { useFormik } from "formik";
import * as Yup from 'yup';

import './Login.css';
import Auth from '../Auth/Auth';

export default function Login({ onSuccess, onFail }) {
  const { isLogged } = useContext(AppContext);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // formik form validation logics
  const formik = useFormik({
    initialValues: {
      email: 'mail1@ya.ru',
      password: '123'
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
      setIsSubmittingForm(true);

      api.authorization(values.email, values.password)
        .then(msg => {
          onSuccess(msg);
        })
        .catch(errorMsg => {
          onFail(errorMsg);
          setIsSubmittingForm(false);
        })
    }
  });

  return isLogged ?
    (<Redirect to='/' />) :
    (
      <Auth
        title='Рады видеть!'>

        <form
          className='auth__form'
          name='form'
          onSubmit={formik.handleSubmit}>

          <label
            className='auth__label'
            htmlFor='email'>
            E-mail
          </label>
          <input
            className={`auth__input ${formik.touched.email && formik.errors.email && 'auth__input_invalid'}`}
            name='email'
            id='email'
            type='email'
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className='auth__error-message'>
            {formik.touched.email && formik.errors.email}
          </p>

          <label
            className='auth__label'
            htmlFor='password'>
            Пароль
          </label>
          <input
            className={`auth__input ${formik.touched.password && formik.errors.password && 'auth__input_invalid'}`}
            name='password'
            id='password'
            type='password'
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className='auth__error-message'>
            {formik.touched.password && formik.errors.password}
          </p>

          <div className='auth__button-wrapper'>
            <button
              type='submit'
              className='auth__button'
              // disabled={!(formik.isValid && (formik.dirty && !isSubmittingForm))}
              disabled={!(formik.isValid && (!isSubmittingForm))}
            >
              {isSubmittingForm ? 'В процессе...' : 'Войти'}
            </button>
            <p className='auth__enter'>
              Ещё не зарегистрированы? <Link to='/signup' className='auth__link'>Регистрация</Link>
            </p>
          </div>
        </form>
      </Auth>

    )
}
