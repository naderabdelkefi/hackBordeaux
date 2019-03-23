<template lang="html">
    <div class="play">
        <div class="play-column">
            <h1>column</h1>
        </div>
        <div class="play-column">
            <h2>column</h2>
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
    height: calc(100vh - 53px);
    display: flex;
}
</style>
