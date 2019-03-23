<template lang="html">
    <div class="play">
        <div class="left play-column">
            <div class="header">
              <div>
                <h1 class="title">Hack Bordeaux</h1>
              </div>
              <div id="level-counter">
                <span class="arrow left">◀</span>
                <span id="level-indicator">
                  <span id="labelLevel">Level</span>
                  <span class="current">1</span>
                  <span id="labelOf" class="translate">of</span>
                  <span class="total">1</span>
                  <span class="caret">▾</span>
                </span>
                <span class="arrow right">▶</span>
                <div id="levelsWrapper" class="tooltip">
                  <div id="levels"></div>
                  <div id="labelReset">Reset</div>
                </div>
              </div>
            </div>
            <div class="program">
                    <div class="carre"></div>
                    <!--<div class="name">move_right</div>
                    <div class="parameters">
                        <span class="parameter">5</span>
                    </div>-->

                <div class="instruction">
                    <!--<div class="name">move_bottom</div>
                    <div class="parameters">
                        <span class="parameter">5</span>
                    </div>-->
                    <div id="editor">
                      <div id="css">
                        <div class="line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>
                        <pre id="before"></pre>
                        <textarea id="code" autofocus></textarea>
                        <pre id="after"></pre>
                      </div>
                      <button id="next" class="translate">Next</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="right play-column">
            <canvas ref="game" class="game" width="1000" height="1000"></canvas>
        </div>
    </div>
</template>

<script>
import sprite from "../images/bat-sprite.png"
import coinSprite from "../images/coin-sprite.png"
const TOP = 2
const BOTTOM = 4
const RIGHT = 8
const LEFT = 16
const CHARACTER_WIDTH = 16
const CHARACTER_HEIGHT = 16
export default {
    data() {
        return {
            timer: null,
            context: null,
            direction: RIGHT,
            pos: {
                x: 50,
                y: 50,
            },
            frame: 0,
            coinFrame: 0,
            coins: [{x:1,y:5}, {x:6,y:7}],
            moves: [{x:2,y:1},{x:3,y:1},{x:3,y:2},{x:4,y:2}],
            square_width: 0,
            square_height: 0,
            sprite: new Image(),
            coin_sprite: new Image(),
        }
    },
    mounted() {
        this.sprite.src = sprite
        this.coin_sprite.src = coinSprite
        this.ctx = this.$refs.game.getContext("2d")
        this.$refs.game.width = window.innerWidth / 2
        this.$refs.game.height = window.innerHeight - 53
        this.square_width = 48
        this.square_height = this.square_width
        this.pos.x = 8
        this.pos.y = 8
        this.timer = setInterval(this.update, 10)
    },
    methods: {
        update() {
            this.frame = this.frame + 1
            this.coinFrame = (this.coinFrame + 1) % 8
            this.ctx.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height)

            let k = 0
            while(k*this.square_height < this.$refs.game.height) {
                this.ctx.fillStyle = 'rgba(0,0,0,0.05)'
                this.ctx.fillRect(0, this.square_height * k, this.$refs.game.width, this.square_height)
                k = k+2
            }
            k = 0
            while(k*this.square_width < this.$refs.game.width) {
                this.ctx.fillStyle = 'rgba(0,0,0,0.05)'
                this.ctx.fillRect(this.square_width * k, 0, this.square_width, this.$refs.game.height)
                k = k+2
            }
            for(let coin of this.coins) {
                this.ctx.drawImage(this.coin_sprite, this.coinFrame * 16, 0, 16, 16, coin.x * this.square_width + (this.square_width-16)/2, coin.y * this.square_height + (this.square_height - 16)/2, 16, 16)
            }
            let yoffset = 0
            if(this.moves.length) {
                if (this.moves[0].x < this.pos.x) {
                    this.direction = LEFT
                    yoffset = 3 * 32
                    this.pos.x -= 1
                }
                else if (this.moves[0].x > this.pos.x) {
                    this.direction = RIGHT
                    yoffset = 1 * 32
                    this.pos.x += 1
                }
                else if (this.moves[0].y < this.pos.y) {
                    this.direction = TOP
                    yoffset = 2 * 32
                    this.pos.y -= 1
                }
                else if (this.moves[0].y > this.pos.y) {
                    this.direction = BOTTOM
                    yoffset = 0 * 32
                    this.pos.y += 1
                }

                if (this.frame === 48) {
                    this.moves.shift()
                    this.frame = 0
                }
            }
            this.ctx.drawImage(this.sprite, (this.frame % 4) * 32, yoffset, 32, 32, this.pos.x, this.pos.y, 32, 32)
        },
    },
    destroyed() {
        clearInterval(this.timer)
    }
}
</script>

<style lang="css" scoped>
@font-face {
  font-family: 'Fredoka One';
  font-style: normal;
  font-weight: 400;
  src: local('Fredoka One'), local('FredokaOne-Regular'), url(https://fonts.gstatic.com/s/fredokaone/v6/k3kUo8kEI-tA1RRcTZGmTlHGCac.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
.carre {
 width:600px;
 height:300px;
 background:white;
 margin:10px auto;
}
#editor {
  position: relative;
}

#editor,
pre {
  font-family: 'Source Code Pro', monospace;
  font-size: 16px;
  line-height: 1.5;
  color: #aaa;
}
#css {
  height: 260px;
  position: relative;
  padding: 10px 10px 10px 40px;
  background-color: #ddd;
  border-radius: 4px;
  overflow: hidden;
}
.line-numbers {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: 10px 6px;
  text-align: right;
  background-color: #999;
  color: #D5D5D5;
}

pre {
  margin: 0;
}

code {
  padding: 0 2px;
  background-color: rgba(255, 255, 255, 0.2);
  font-family: 'Source Code Pro', monospace;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;

}
#code {
  display: block;
  width: calc(100% - 16px);
  height: 200px;
  margin-left: 16px;
  border: none;
  font-family: 'Source Code Pro', monospace;
  font-size: 50px;
  outline: none;
  resize: none;
  overflow: auto;
}
#levelsWrapper:after {
  left: calc(50% - 12px);
}
#next {
  position: -webkit-sticky;
position: sticky;
  right: 1em;
  bottom: 1em;
}

#next.disabled {
  opacity: 0.5;
}
.instructions,
.instructions p,
.instructions ul {
	/* helps prevent the difficulty animation from jumping */
	margin: 0;
  padding-bottom: 1em;
}
.play {
    width: 100vw;
    margin-top: 53px;
    box-sizing: border-box;
    display: flex;
}
.play-column {
    height: calc(100vh - 53px);
    width: 50vw;
}
.game {
    background: #388138;
}
.right.play-column {
    background: #f5f5f5;
}
.program > .instruction {
    border-bottom: 1px solid #cecece;
    height: 30px;
    line-height: 30px;
    background: #fbfbfb;
    display: flex;
}
.program > .instruction:odd {
    background: #f5f5f5;
}
.program > .instruction > .name {
    margin-right: 5px;
}
.parameters {

}
.parameters .parameter {
    background: white;
    font-weight: bold;
}
.header {
  display: flex;
  flex-wrap: wrap;
  margin-top: -0.1rem;
  justify-content: space-between;
}
.title {
  margin: 0.5rem 0 0;
  text-transform: uppercase;
  font-family: 'Fredoka One', cursive;
  font-size: 28px;
}
.arrow {
  display: inline-block;
  font-family: 'Comic Sans MS';
  padding: 0.25em 0.4em 0.2em;
  cursor: pointer;
}

.arrow.left {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px 0 0 4px;
}

.arrow.right {
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0 4px 4px 0;
}

.arrow.left:not(.disabled):hover,
.arrow.right:not(.disabled):hover {
  border-color: transparent;
}

.arrow.disabled {
  opacity: 0.5;
}
#level-indicator,
.arrow {
  float: left;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.2);
}

#level-indicator {
  display: inline-block;
  width: 160px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
#level-indicator:hover,
.arrow:not(.disabled):hover {
  background-color: rgba(255, 255, 255, 0.4);
}
#labelLevel {
  margin-left: 5px;
}
.level-marker.current,
.level-marker:hover {
  border-color: rgba(255, 255, 255, 0.5);
}
.caret {
  display: inline-block;
  margin-left: 2px;
}
#levelsWrapper {
  display: none;
  top: 30px;
  right: 31px;
  max-width: 160px;
  padding: 1em 0.5em;
  margin-top: 12px;
  z-index: 80;
}

#levelsWrapper:after {
  left: calc(50% - 12px);
}
.tooltip {
  position: absolute;
  display: inline-block;
  max-width: 225px;
  padding: 1em 1em;
  background-color: #2c3e50;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.5;
  z-index: 60;
}

.tooltip:after {
  content: '';
  position: absolute;
  top: -12px;
  left: 12px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid #2c3e50;
}
#levels {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#labelReset {
  margin-top: 1em;
  text-align: center;
  cursor: pointer;
}
</style>
