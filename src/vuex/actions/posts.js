import * as type from '../types';
import { throwError } from '../../utils';

export default {
  [type.FETCH_POSTS]: ({ commit, getters }, { userId } = {}) => {
    const name = type.POSTS;
    commit(type.LOADING, name);
    return getters
      .GET('/posts', userId)
      .then(list => {
        commit(type.SET_LIST, { name, list });
        return list;
      })
      .catch(throwError(commit, 'Ошибка получения публикаций'))
      .finally(() => commit(type.LOADED, name));
  },
  [type.FETCH_POST]: ({ commit, getters }, { id }) => {
    const name = type.POST;
    commit(type.LOADING, name);
    return getters
      .GET(`/post/${id}`)
      .then(model => {
        commit(type.SET_MODEL, { name, model });
        return model;
      })
      .catch(throwError(commit, 'Ошибка получения публикации'))
      .finally(() => commit(type.LOADED, name));
  },
  [type.SAVE_POST]: ({ commit, getters }, { id, userId, title, body }) => {
    const name = type.POST;
    commit(type.LOADING, name);

    let action;
    if (id) {
      action = getters.PUT(`/posts/${id}`, { id, userId, title, body });
    } else {
      action = getters.POST(`/posts`, { userId, title, body });
    }

    return action
      .then(model => {
        commit(type.SET_MODEL, { name, model });
        return model;
      })
      .catch(throwError(commit, 'Ошибка получения публикации'))
      .finally(() => commit(type.LOADED, name));
  },
  [type.DELETE_POST]: ({ commit, getters }, { id }) => {
    const name = type.POST;
    commit(type.LOADING, name);
    return getters
      .DELETE(`/post/${id}`)
      .catch(throwError(commit, 'Ошибка получения публикации'))
      .finally(() => commit(type.LOADED, name));
  }
};
