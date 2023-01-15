import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext';
import * as api from "../../utils/Api";

import { useFormik } from "formik";
import * as Yup from 'yup';

import './Register.css';
import Auth from '../Auth/Auth';

export default function Register({ onFail, onSuccess }) {
  const { isLogged } = useContext(AppContext);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)

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
      setIsSubmittingForm(true);
      api.register(values.name, values.email, values.password)
        .then(msg => {
          console.log(msg);
          onSuccess(msg);
        })
        .catch(errorMsg => {
          onFail(errorMsg);
          setIsSubmittingForm(false);
          console.log(errorMsg);
        })
    }
  });

  return isLogged ?
    (<Redirect to='/' />) :
    (
      <Auth title='Добро пожаловать!'>
        <form
          className='auth__form'
          name='form'
          onSubmit={formik.handleSubmit}>

          <label
            className='auth__label'
            htmlFor='name'>
            Имя
          </label>
          <input
            className={`auth__input ${formik.touched.name && formik.errors.name && 'auth__input_invalid'}`}
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
          <p className='auth__error-message'>
            {formik.touched.name && formik.errors.name}
          </p>

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
              disabled={!(formik.isValid && (formik.dirty && !isSubmittingForm))}
            >
              {isSubmittingForm ? 'В процессе...' : 'Зарегистрироваться'}
            </button>
            <p className='auth__enter'>
              Уже зарегистрированы? <Link to='/signin' className='auth__link'>Войти</Link>
            </p>
          </div>
        </form>
      </Auth>
    )
}
