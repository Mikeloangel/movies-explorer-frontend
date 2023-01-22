/**
 * Local storage logics
 * 01. constants
 * 02. utility private functions
 * 03. public functions
 */

import { LOCAL_STORAGE_PREFIX } from "./variables";

// 01. constants
// fields
const enumFields = Object.freeze({
  query: 'query',
  shortfilm: 'shortfilm',
  list: 'list'
});


// 02. utility public functions
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

/**
 * Removes item from local storage
 * @param {String} key
 */
const _lsRemoveItem = (key) => {
  localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}-${key}`);
}

// 03. export functions
/**
 *
 * @returns Array [query, isShortFilm]
 */
export const getCurrentStorage = () => {
  return [
    _lsGetItem(enumFields.query) || '',
    _lsGetItem(enumFields.shortfilm) === 'true' ? true : false
  ];
}

/**
 * Sets current storage with new values
 * @param {String or function} query if function should accept previous values,
 *                                   cb shoud return array as [query, isShortFilm]
 * @param {Boolean} isShortFilm
 */
export const setCurrentStorage = (query, isShortFilm) => {
  if (typeof query === 'function') {
    const [q, i] = query(...getCurrentStorage());
    setCurrentStorage(q, i);
  } else {
    _lsSetItem(enumFields.query, query);
    _lsSetItem(enumFields.shortfilm, isShortFilm)
  }
};

/**
 * Parses list from local storage
 * @returns returns parsed list as Object
 */
export const getListFromStorage = () => {
  return checkIsListInStorage() && JSON.parse(_lsGetItem(enumFields.list) || []);
};

/**
 * inserts current list to storage
 * @param {Array} list
 */
export const setListToStorage = (list) => {
  _lsSetItem(enumFields.list, JSON.stringify(list))
};

/**
 * Checks if cached list in local storage
 * @returns {Boolean}
 */
export const checkIsListInStorage = () => {
  return _lsGetItem(enumFields.list) && _lsGetItem(enumFields.query);
};

/**
 * Clears local storage
 */
export const removeItemsFromStorage = () => {
  Object.keys(enumFields).forEach(item => _lsRemoveItem(item));
}