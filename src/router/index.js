import Vue from 'vue';
import Router from 'vue-router';
import PostList from '../components/posts/PostList';
import SignIn from '../components/auth/SignIn';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PostList
    },
    {
      path: '/sign_in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/post',
      name: 'PostList',
      component: PostList
    },
  ]
});
