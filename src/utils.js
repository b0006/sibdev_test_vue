import * as type from './vuex/types';

export function throwError(commit, title, message) {
  return error => {
    const status = error && error.response ? error.response.status : 0;
    if (status !== 401 && status < 500) {
      // eslint-disable-next-line
      console.error(
        'catchError',
        status,
        title,
        error ? error.response : '',
        error
      );
      // Глобальные ошибки 401, 500 обрабатываются в перехватчике src/axios.js
      commit(type.ERROR, { title, message, error });
    }
    throw error || new Error(message);
  };
}

// Получени объекта в state по заданному пути
export function getStateProperty(state, propertyRef) {
  const property = propertyRef
    ? (Array.isArray(propertyRef)
        ? propertyRef
        : propertyRef.split('.')
      ).reduce(
        (prop, propName) => (prop && prop[propName] ? prop[propName] : prop),
        state
      )
    : state;

  if (property === state) {
    // eslint-disable-next-line
    console.error('state property ref not found', propertyRef);
    return null;
  }
  return property;
}

const tokenKey = 'token';
const storage = localStorage;

export function loadToken() {
  return storage.getItem(tokenKey);
}

export function saveToken(token) {
  storage.setItem(tokenKey, token);
  return token;
}

export function removeToken() {
  storage.removeItem(tokenKey);
  return null;
}
