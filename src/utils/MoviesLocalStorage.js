/**
 * Local storage logics
 * 01. utility private functions
 * 02. public functions
 */

import { LOCAL_STORAGE_PREFIX } from "./variables";

// 01. utility functions

/**
 * Set pair name value to local storage
 * @param {String} key
 * @param {String} value
 */
const _lsSetItem = (key, value) => {
  localStorage.setItem(`${LOCAL_STORAGE_PREFIX}-${key}`, value);
}

/**
 *
 * @param {String} key
 * @returns Value from local storage by key
 */
const _lsGetItem = (key) => {
  return localStorage.getItem(`${LOCAL_STORAGE_PREFIX}-${key}`);
}

// 02. export functions
/**
 *
 * @returns Array [query, isShortFilm]
 */
export const getCurrentStorage = () => {
  return [_lsGetItem('query') || '', _lsGetItem('shortfilm') === 'true' ? true : false];
}

/**
 * Sets current storage with new values
 * @param {String or function} query if function should accept previous values, cb shoud return array as [query, isShortFilm]
 * @param {Boolean} isShortFilm
 */
export const setCurrentStorage = (query, isShortFilm) => {
  if (typeof query === 'function') {
    const [q, i] = query(...getCurrentStorage());
    setCurrentStorage(q, i);
  } else {
    _lsSetItem('query', query);
    _lsSetItem('shortfilm', isShortFilm)
  }
};

/**
 * Parses list from local storage
 * @returns returns parsed list as Object
 */
export const getListFromStorage = () => {
  return JSON.parse(_lsGetItem('list'));
};

/**
 * inserts current list to storage
 * @param {Array} list
 */
export const setListToStorage = (list) => {
  _lsSetItem('list', JSON.stringify(list))
};

/**
 * Checks if cached list in local storage
 * @returns {Boolean}
 */
export const checkIsListInStorage = () => {
  return _lsGetItem('list') && _lsGetItem('query');
};
