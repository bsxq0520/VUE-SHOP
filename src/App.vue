<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <transition name="router-fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './style/common';
  .router-fade-enter-active, .router-fade-leave-ative {
    transition: opacity .3s ease;
  }
  .router-fade-enter, .router-fade-leave-to {
    opacity: 0;
  }
</style>
