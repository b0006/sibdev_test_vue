import posts from './posts';

const state = Object.assign(
  {
    error: {
      title: null,
      message: null,
      error: null
    }
  },
  posts
);

export default state;
