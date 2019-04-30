<template>
  <div class="post post__body">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </div>
</template>

<script>
export default {
  name: 'posts-list-item',
  props: {
    post: {
      required: true,
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  &__body {
    background: #eee;
    padding: 10px 20px;
    border-radius: 4px;

    h3::first-letter,
    p::first-letter {
      text-transform: uppercase;
    }
  }
}
</style>
