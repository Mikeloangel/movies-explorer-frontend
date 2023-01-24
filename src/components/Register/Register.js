import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

// utils
import { AppContext } from '../../contexts/AppContext';
import * as api from "../../utils/MainApi";

// formik
import { useFormik } from "formik";
import * as Yup from 'yup';

// css
import './Register.css';

// components
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
        .matches(/^[a-zA-Zа-яА-Я\s/-/-/–]*$/, 'Имя может содержать только латиницу, кириллицу, пробел или дефис.')
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
          onSuccess(values, msg);
        })
        .catch(errorMsg => {
          onFail(errorMsg);
          setIsSubmittingForm(false);
        })
    },
  });

  function handleFocus(e) {
    formik.setTouched({ ...formik.touched, [e.target.name]: true });
  }

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
            className={`auth__input ${formik.errors.name && 'auth__input_invalid'}`}
            name='name'
            id='name'
            type='text'
            required
            minLength='2'
            maxLength='30'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFocus}
          />
          <p className='auth__error-message'>
            {formik.errors.name && formik.touched.name ? formik.errors.name : ''}
          </p>

          <label
            className='auth__label'
            htmlFor='email'>
            E-mail
          </label>
          <input
            className={`auth__input ${formik.errors.email && 'auth__input_invalid'}`}
            name='email'
            id='email'
            type='email'
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFocus}
          />
          <p className='auth__error-message'>
            {formik.errors.email && formik.touched.email ? formik.errors.email : ''}
          </p>

          <label
            className='auth__label'
            htmlFor='password'>
            Пароль
          </label>
          <input
            className={`auth__input ${formik.errors.password && 'auth__input_invalid'}`}
            name='password'
            id='password'
            type='password'
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFocus}
          />
          <p className='auth__error-message'>
            {formik.errors.password && formik.touched.password ? formik.errors.password : ''}
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
