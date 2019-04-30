import Vue from 'vue';
import * as type from './types';
import { getStateProperty } from '../utils';

export default {
  [type.GO_OVER]: () => {},
  [type.GO_EXIT]: () => {},
  // loading mutations
  [type.LOADING]: (state, propertyRef) => {
    const property = getStateProperty(state, propertyRef);
    property.loading = true;
  },
  [type.LOADED]: (state, propertyRef) => {
    const property = getStateProperty(state, propertyRef);
    property.loading = false;
  },
  [type.ERROR]: (state, { title, message, error, status }) => {
    state.error = {
      title,
      message:
        message ||
        (error.response && error.response.data
          ? error.response.data.message
          : null) ||
        error.message ||
        'Непредвиденная ошибка.',
      code:
        error.response && error.response.data ? error.response.data.code : -100,
      status: status || (error.response ? error.response.status : 0),
      response: error.response,
      error
    };
  },
  // model mutations
  [type.SET_MODEL]: (state, { name, model }) => {
    Vue.set(state[name], 'model', model);
  },

  [type.UPDATE_MODEL]: (state, { name, model }) => {
    Object.assign(state[name].model, model);
  },

  // установка значения вложенного свойства модели
  [type.SET_PROPERTY]: (state, { propertyRef, name, value }) => {
    const property = getStateProperty(state, propertyRef);
    if (property) {
      Vue.set(property, name, value);
    }
  },

  // изменение значения вложенного свойства модели в store
  [type.UPDATE_PROPERTY]: (state, { propertyRef, value }) => {
    const property = getStateProperty(state, propertyRef);
    if (property) {
      Object.assign(property, value);
    }
  },

  // добавление значения во вложенное свойство-массив
  [type.ADD_PROPERTY_ITEM]: (state, { propertyRef, index, value }) => {
    const property = getStateProperty(state, propertyRef);
    if (property) {
      if (index !== null && index >= 0) {
        property.splice(index, 0, value);
      } else {
        property.push(value);
      }
    }
  },

  // удаление значения из вложенного свойства-массива
  [type.REMOVE_PROPERTY_ITEM]: (state, { propertyRef, index }) => {
    const property = getStateProperty(state, propertyRef);
    if (property && property[index]) {
      property.splice(index, 1);
    }
  },

  // list mutations
  [type.SET_LIST]: (state, { name, list }) => {
    Vue.set(state[name], 'list', list);
    state[name].count = list ? list.length : 0;
  },

  [type.ADD_LIST_ITEMS]: (state, { name, list }) => {
    if (list && list.length > 0) {
      state[name].list = state[name].list.concat(...list);
      state[name].count = state[name].list.length;
    }
  },

  [type.REMOVE_LIST_ITEM]: (state, { name, id }) => {
    const index = state[name].list.findIndex(model => model.id === id);
    if (index >= 0) {
      state[name].list.splice(index, 1);
    }
  },

  [type.UPDATE_LIST_ITEM]: (state, { name, id, value }) => {
    const index = state[name].list.findIndex(model => model.id === id);
    if (index >= 0) {
      Object.assign(state[name].list[index], value);
    }
  }
};
