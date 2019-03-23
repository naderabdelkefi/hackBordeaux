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
            <canvas ref="game" class="game"></canvas>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log("hello")
    }
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
