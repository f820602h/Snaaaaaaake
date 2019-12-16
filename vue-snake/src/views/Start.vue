<template>
  <div class="start">
    <h2>SNAAAAAAKE</h2>
    <p>PRESS [SPACE] TO START</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Start',
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.which === 32) this.SET_GAME_STATE('Snake');
    });
  },
  methods: {
    ...mapMutations(['SET_GAME_STATE']),
  },
};
</script>

<style lang="scss" scoped>
.start{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url("~@/assets/bg-start.png") center no-repeat;
  background-size: 1280px;
  h2{
    position: relative;
    margin: 20px 0;
    font-size: 36px;
    color: white;
    &::after, &::before{
      content: '';
      display: block;
      position: absolute;
      width: 40px;
      height: 40px;
      top: 0;
      left: -60px;
      background: white;
    }
    &::after{
      left: unset;
      right: -60px;
    }
  }
  p{
    margin-top: 20px;
    font-size: 24px;
    color: #00FFE2;
    animation: shine 1s infinite;
  }
  @keyframes shine {
    50%{
      opacity: 0;
    }100%{
      opacity: 1;
    }
  }
}
</style>
