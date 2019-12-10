<template>
  <div
    class="container"
    tabindex="-1"
    @keydown="redirect"
  >
    <div class="gameCon">
      <div class="display">
        <h2 class="name">
          AAAAKE
        </h2>
        <h2><span>scroe</span>20</h2>
      </div>
      <div class="playArea">
        <div
          class="box"
          v-for="index in 448"
          :key="index"
        />
        <div
          class="snake"
          v-for="(item, index) in snake"
          :style="{top: item[1] * zBox+ 'px', left: item[0] * zBox + 'px'}"
          :key="index"
        />
      </div>
      <div class="display">
        <h2>
          <span>best</span>80
        </h2>
        <h2 class="name rotate">
          AAAAKE
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import { setInterval } from 'timers';

export default {
  name: 'Snake',
  data() {
    return {
      xBox: 28,
      yBox: 16,
      zBox: 40,
      food: [1, 1],
      snake: [[0, 8]],
      direct: null,
      startMove: false,
    };
  },
  methods: {
    redirect(e) {
      const key = e.which;
      if (key === 38) this.direct = 'up';
      if (key === 40) this.direct = 'down';
      if (key === 39) this.direct = 'right';
      if (key === 37) this.direct = 'left';
      if (this.startMove === false) this.play();
    },
    snakeMove() {
      if (this.direct === 'up') this.snake[0][1] = this.snake[0][1] + 1;
      if (this.direct === 'down') this.snake[0][1] = this.snake[0][1] - 1;
      if (this.direct === 'right') this.snake[0][0] = this.snake[0][1] + 1;
      if (this.direct === 'left') this.snake[0][0] = this.snake[0][1] - 1;
    },
    play() {
      this.startMove = true;
      setInterval(() => {
        this.snakeMove();
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  align-items: center;
  height: 100vh;
}
.gameCon{
  width: 1120px;
  height: 800px;
  margin: 0 auto;
  .display{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2{
      display: flex;
      align-items: center;
      margin: 16px 0;
      font-size: 36px;
      color: white;
      span{
        display: block;
        margin-right: 10px;
        font-size: 16px;
      }
      &.name{
        position: relative;
        margin: 16px 0 16px -16px;
        &::before{
          content: 'SNAA';
          display: block;
          position: absolute;
          top: -4px;
          left: -42px;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      }
      &.rotate{
        margin: 16px -16px 16px 0px;
        transform: rotate(180deg);
      }
    }
  }
  .playArea{
    position: relative;
    display: flex;
    flex-wrap: wrap;
    height: 640px;
    margin: 0 auto;
    background: #00035A;
    .box{
      width: 40px;
      height: 40px;
      border: 1px solid #002A9D;
    }
    .snake{
      position: absolute;
      width: 40px;
      height: 40px;
      background: #00FFE2;
    }
  }
}
</style>
