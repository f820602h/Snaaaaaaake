<template>
  <div class="end">
    <h2 class="title">GAME OVER</h2>
    <div class="score">
      <div>
        <span>score</span>
        <h2 v-if="lastScore !== null">{{ lastScore }}</h2>
      </div>
      <h2>/</h2>
      <div>
        <span>best</span>
        <h2 v-if="bestScore !== null">{{ bestScore }}</h2>
      </div>
    </div>
    <p class="restrat">
      RESTART?
    </p>
    <p class="yesNo">
      <span>YES[Y]</span><span>NO[N]</span>
    </p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'End',
  data() {
    return {
      lastScore: null,
      bestScore: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (this.gameOver) next();
    else next('/');
  },
  mounted() {
    this.getScore();
    window.addEventListener('keydown', this.setGameState);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.setGameState);
  },
  methods: {
    ...mapMutations(['SET_GAME_STATE']),
    getScore() {
      this.lastScore = localStorage.getItem('lastScore');
      this.bestScore = localStorage.getItem('best') ? localStorage.getItem('best') : 0;
    },
    setGameState(e) {
      if (e.which === 89) this.SET_GAME_STATE('Snake');
      if (e.which === 78) this.SET_GAME_STATE('Start');
    },
  },
};
</script>

<style lang="scss" scoped>
h2{
  margin: 20px 0;
  font-size: 36px;
  color: white;
}
p{
  margin-top: 20px;
  font-size: 24px;
}
span{
  display: block;
}
.end{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .title{
    position: relative;
    padding: 0 20px;
    &::after, &::before{
      content: '';
      display: block;
      position: absolute;
      width: 40px;
      height: 40px;
      top: -5px;
      left: -40px;
      background: white;
    }
    &::after{
      left: unset;
      right: -40px;
    }
  }
  .score{
    display: flex;
    justify-content: space-between;
    width: 364px;
    margin: 20px 0;
    span{
      text-align: center;
      color: white
    }
    h2{
      text-align: center;
    }
  }
  .restrat{
    padding: 8px;
    margin-bottom: 40px;
    background: white;
  }
  .yesNo{
    display: flex;
    justify-content: space-between;
    width: 350px;
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
