<template>
  <div class="container">
    <div class="gameCon">
      <div class="display">
        <h2 class="name">
          AAAAKE
        </h2>
        <h2><span>scroe</span>{{ score }}</h2>
      </div>
      <div class="playArea">
        <div
          class="box"
          v-for="index in xBox * yBox"
          :key="index"
        />
        <div
          v-for="(item, index) in snake"
          :class="{'head': index === 0, 'dead': dead}"
          :style="{
            top: item.y * zBox + 'px',
            left: item.x * zBox + 'px',
            opacity: snake.length / (index + snake.length)
          }"
          :key="'S'+index"
          class="snake"
        />
        <div
          class="food"
          v-if="food.x !== null"
          :style="{
            top: food.y * zBox + 'px',
            left: food.x * zBox + 'px',
          }"
        />
      </div>
      <div class="display">
        <h2><span>best</span>{{ bestScore }}</h2>
        <h2 class="name rotate">
          AAAAKE
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Snake',
  data() {
    return {
      xBox: 28,
      yBox: 16,
      zBox: 40,
      food: { x: null, y: null },
      snake: [{ x: 0, y: 8 }],
      direct: 'right',
      time: null,
      speed: 100,
      score: 0,
      bestScore: null,
      dead: false,
    };
  },
  mounted() {
    window.addEventListener('keydown', this.redirect);
    this.getBestScore();
    this.play();
    this.createFood();
  },
  watch: {
    dead() {
      window.removeEventListener('keydown', this.redirect);
      window.clearInterval(this.time);
      if (this.score > this.bestScore) localStorage.setItem('best', this.score);
      localStorage.setItem('lastScore', this.score);
      this.SET_GAME_STATE('End');
    },
  },
  methods: {
    ...mapMutations(['SET_GAME_STATE']),
    getBestScore() {
      this.bestScore = localStorage.getItem('best') ? localStorage.getItem('best') : 0;
    },
    redirect(e) {
      const key = e.which;
      if (key === 38 && this.direct !== 'down') this.direct = 'up';
      if (key === 40 && this.direct !== 'up') this.direct = 'down';
      if (key === 39 && this.direct !== 'left') this.direct = 'right';
      if (key === 37 && this.direct !== 'right') this.direct = 'left';
      this.play();
    },
    snakeMove() {
      const prevSnake = { x: 0, y: 0 };
      const nowSnake = { x: 0, y: 0 };
      this.snake.forEach((item, index) => {
        if (index === 0) {
          prevSnake.x = item.x;
          prevSnake.y = item.y;
          if (this.direct === 'up') item.y = (item.y - 1 + this.yBox) % this.yBox;
          if (this.direct === 'down') item.y = (item.y + 1 + this.yBox) % this.yBox;
          if (this.direct === 'right') item.x = (item.x + 1 + this.xBox) % this.xBox;
          if (this.direct === 'left') item.x = (item.x - 1 + this.xBox) % this.xBox;
          this.isDead(item.x, item.y);
          this.getPoint(item.x, item.y);
        } else {
          nowSnake.x = item.x;
          nowSnake.y = item.y;
          item.x = prevSnake.x;
          item.y = prevSnake.y;
          prevSnake.x = nowSnake.x;
          prevSnake.y = nowSnake.y;
        }
      });
    },
    play() {
      this.snakeMove();
      window.clearInterval(this.time);
      this.time = window.setInterval(() => {
        this.snakeMove();
      }, this.speed);
    },
    createFood() {
      const foodX = Math.floor(Math.random() * this.xBox);
      const foodY = Math.floor(Math.random() * this.yBox);
      const double = this.snake.some(s => s.x === foodX && s.y === foodY);
      if (!double) {
        this.food.x = foodX;
        this.food.y = foodY;
      } else {
        this.createFood();
      }
    },
    getPoint(snakeX, snakeY) {
      if (snakeX === this.food.x && snakeY === this.food.y) {
        const lastbody = this.snake[this.snake.length - 1];
        const newHead = { x: lastbody.x, y: lastbody.y };
        this.score += 1;
        this.snake.push(newHead);
        this.createFood();
      }
    },
    isDead(snakeX, snakeY) {
      const snakeBody = this.snake.slice(1, this.snake.length);
      this.dead = snakeBody.some(body => snakeX === body.x && snakeY === body.y);
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
      background: #fff;
    }
    .head{
      z-index: 20;
      background: #00FFE2;
      box-shadow: 0px 0px 30px #fff;
      &.dead{
        background: rgb(252, 91, 91);
      }
    }
    .food{
      position: absolute;
      width: 40px;
      height: 40px;
      background: yellow;
    }
  }
}
</style>
