<template lang="html">
    <div class="play">
        <div class="left play-column">
            <h1>Program</h1>
            <div class="program">
                <div class="instruction">
                    <div class="name">move_right</div>
                    <div class="parameters">
                        <span class="parameter">5</span>
                    </div>
                </div>
                <div class="instruction">
                    <div class="name">move_bottom</div>
                    <div class="parameters">
                        <span class="parameter">5</span>
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
const TOP = 2
const BOTTOM = 4
const RIGHT = 8
const LEFT = 16
export default {
    data() {
        return {
            timer: null,
            context: null,
            direction: RIGHT,
            frame: 0,
            square_width: 0,
            square_height: 0,
            sprite: new Image()
        }
    },
    mounted() {
        console.log(window.innerWidth)
        this.sprite.src = sprite
        this.ctx = this.$refs.game.getContext("2d")
        this.$refs.game.width = window.innerWidth / 2
        this.$refs.game.height = window.innerHeight - 53
        this.square_width = this.$refs.game.width / 20
        // console.log("ok", this.$refs.game.height, this.$refs.game.width, (this.$refs.game.height / this.$refs.game.width).toPrecision(3))
        console.log(this.$refs.game.height, this.$refs.game.width)
        this.square_height = this.square_width
        this.timer = setInterval(this.update, 100)
    },
    methods: {
        update() {
            this.frame = (this.frame + 1) % 4
            console.log("update")
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
            this.ctx.drawImage(this.sprite, this.frame * 32, 32, 32, 32, 32, 32, 32, 32)
            // this.ctx.beginPath();
            // this.ctx.arc(500*Math.random(), 75+10*Math.random(), 50, 0, 2 * Math.PI)
            // this.ctx.stroke()
        },
    }
    // destroyed() {
    //     clearInterval(this.timer)
    // }
}
</script>

<style lang="css" scoped>
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
    width: 100vw;
    background: #388138;
    height: calc(100vh - 53px);
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
</style>
