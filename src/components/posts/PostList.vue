<template>
  <div class="posts__container">
    <post-list-item
      v-for="post in posts"
      :key="post.id"
      class="posts__post"
      :post="post"
    ></post-list-item>
  </div>
</template>

<script>
import { POSTS, FETCH_POSTS } from '../../vuex/types';
import PostListItem from './PostListItem';

export default {
  name: 'post-list',
  components: {
    PostListItem
  },
  computed: {
    posts() {
      return this.$store.state[POSTS].list;
    }
  },
  created() {
    this.$store.dispatch(FETCH_POSTS);
  }
};
</script>

<style lang="scss">
.posts {
  &__container {
    margin: 0 auto;
    width: 80%;
  }

  &__post {
    margin-bottom: 8px;
  }
}
</style>
