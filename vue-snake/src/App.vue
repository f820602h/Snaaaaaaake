<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    @import url('https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap');
    font-family: 'Press Start 2P', cursive;
    background: #000;
  }
</style>
