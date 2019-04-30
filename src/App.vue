<template>
  <div id="app" class="uk-container">
    <main-header />
    <router-view />
  </div>
</template>

<script>
import Header from '../src/components/header/Header';

export default {
  name: 'App',
  components: {
    'main-header': Header
  }
};
</script>
