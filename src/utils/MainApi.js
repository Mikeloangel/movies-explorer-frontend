import { BASE_API_URL } from "./variables";
import parseErrorMessage from "./parseErrorMessage";

export const BASE_URL = BASE_API_URL;
export const BASE_HEADERS = {
  'Content-Type': 'application/json',
}

/**
 * Makes fetch request to API
 * @param {String} endpoint AuthAPI endpoint
 * @param {String} method
 * @param {Object} body
 * @param {Object} headers
 * @returns {Promise}
 */
const fetchApi = async (endpoint, method, body = null, headers = BASE_HEADERS, credentials = 'same-origin') => {
  const config = { method, headers, credentials };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return await fetch(`${BASE_URL}/${endpoint}`, config);
}

// authorization
export const authorization = async (email, password) => {
  const res = await fetchApi('signin', 'post', { password, email },
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "withCredentials": true,
    },
    'include'
  );

  if (res.status === 200) {
    const data = await res.json();

    return data.message;
  }

  const errorMessage = await parseErrorMessage(res, 'message');
  return Promise.reject(errorMessage);
}


// logout
export const logout = async () => {
  const res = await fetchApi('signout', 'get', null,
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "withCredentials": true,
    },
    'include');

  if (res.status === 200) {
    const data = await res.json();
    return data.message;
  }

  const errorMessage = await parseErrorMessage(res, 'message');
  return Promise.reject(errorMessage);

}

// register
export const register = async (name, email, password) => {
  const res = await fetchApi('signup', 'post', { name, password, email });

  if (res.status === 201) {
    return res.json();
  }

  const errorMessage = await parseErrorMessage(res, 'message');
  return Promise.reject(errorMessage);
}

// getusers me
export const getUserMe = async () => {
  const res = await fetchApi('users/me', 'get', null,
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "withCredentials": true,
    },
    'include'
  );

  if (res.status === 200) {
    const data = await res.json();

    return data;
  }

  const errorMessage = await parseErrorMessage(res, 'message');
  return Promise.reject(errorMessage);

}

// edit user
export const patchUserMe = async (name, email) => {
  const res = await fetchApi(
    'users/me',
    'PATCH',
    { name, email },
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    'include'
    );

  if (res.status === 200) {
    return res.json();
  }

  const errorMessage = await parseErrorMessage(res, 'message');
  return Promise.reject(errorMessage);
}