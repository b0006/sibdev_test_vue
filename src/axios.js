import axios from 'axios';
import store from './vuex';
import * as type from './vuex/types';

const HTTP = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

HTTP.interceptors.response.use(
  response => response,
  error => {
    // Do something with response error
    const status = error.response ? error.response.status : 408;
    if (status >= 500) {
      store.commit(type.ERROR, {
        title: 'Непредвиденная ошибка!',
        message: 'Обратитесь к администратору или попробуйте зайти позже.',
        error
      });
    } else if (status >= 408) {
      store.commit(type.ERROR, {
        title: 'Превышено время ожидания!',
        message: 'Попробуйте повторить запрос.',
        error
      });
    } else if (status === 403) {
      store.commit(type.GO_OVER, 'access-denied');
    } else if (status === 404) {
      store.commit(type.GO_OVER, 'not-found');
    } else if (status === 401) {
      const url = error.request.responseURL;
      if (url && url.includes('login')) {
        // ошибка на странице авторизации
        store.commit(type.ERROR, {
          title: 'Авторизация.',
          message: 'Неверное имя пользователя или пароль.',
          error
        });
      } else {
        // TODO: ошибка на любой другой странице (нужен выход с параметром редирект)
      }
    }
    return Promise.reject(error);
  }
);

export default HTTP;
