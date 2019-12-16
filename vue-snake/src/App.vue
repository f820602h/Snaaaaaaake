<template>
  <div id="app">
    <component :is="gameState"></component>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Start from './views/Start.vue';
import Snake from './views/Snake.vue';
import End from './views/End.vue';

export default {
  name: 'App',
  components: {
    Start,
    Snake,
    End,
  },
  computed: {
    ...mapState(['gameState']),
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    min-width: 1280px;
    font-family: 'Press Start 2P', cursive;
    background: #000;
  }
</style>
