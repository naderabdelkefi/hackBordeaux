<template lang="html">
    <div id="app">
        <div class="pusher">
            <div class="ui inverted vertical masthead center aligned segment" v-if="$route.name === 'home'">
                <div class="ui container">
                    <div class="ui large secondary inverted pointing menu">
                        <a class="toc item">
                            <i class="sidebar icon"></i>
                        </a>
                        <router-link v-bind:to="{name: 'home'}" class="item">Accueil</router-link>
                        <router-link v-bind:to="{name: 'play'}" class="item">Jouer</router-link>
                        <router-link v-bind:to="{name: 'home'}" class="item">Leaderboard</router-link>
                        <router-link v-bind:to="{name: 'home'}" class="item">Contact</router-link>
                        <div class="right item">
                            <a class="ui inverted button">Connexion</a>
                            <a class="ui inverted button">Inscription</a>
                        </div>
                    </div>
                </div>

                <div class="ui text container">
                    <h1 class="ui inverted header">
                        Apprends à coder
                    </h1>
                    <h2>Do whatever you want when you want to.</h2>
                    <router-link v-bind:to="{name: 'play'}" class="ui huge primary button">Commencer maintenant <i class="right arrow icon"></i></router-link>
                </div>
            </div>

            <div class="ui large top fixed menu transition visible" style="display: flex !important;" v-else>
              <div class="ui container">
                <router-link v-bind:to="{name: 'home'}" class="item">Accueil</router-link>
                <router-link v-bind:to="{name: 'play'}" class="item">Jouer</router-link>
                <router-link v-bind:to="{name: 'home'}" class="item">Leaderboard</router-link>
                <router-link v-bind:to="{name: 'home'}" class="item">Contact</router-link>
                <div class="right menu">
                  <div class="item">
                    <router-link v-bind:to="{ name:'home' }" class="ui button">Connexion</router-link>
                  </div>
                  <div class="item">
                    <router-link v-bind:to="{ name:'home' }" class="ui primary button">Inscription</router-link>
                  </div>
                </div>
              </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route)
    }
}
</script>

<style lang="css" scoped>
.hidden.menu {
     display: none;
   }

   .masthead.segment {
     min-height: 700px;
     padding: 1em 0em;
   }
   .masthead .logo.item img {
     margin-right: 1em;
   }
   .masthead .ui.menu .ui.button {
     margin-left: 0.5em;
   }
   .masthead h1.ui.header {
     margin-top: 3em;
     margin-bottom: 0em;
     font-size: 4em;
     font-weight: normal;
   }
   .masthead h2 {
     font-size: 1.7em;
     font-weight: normal;
   }

   .ui.vertical.stripe {
     padding: 8em 0em;
   }
   .ui.vertical.stripe h3 {
     font-size: 2em;
   }
   .ui.vertical.stripe .button + h3,
   .ui.vertical.stripe p + h3 {
     margin-top: 3em;
   }
   .ui.vertical.stripe .floated.image {
     clear: both;
   }
   .ui.vertical.stripe p {
     font-size: 1.33em;
   }
   .ui.vertical.stripe .horizontal.divider {
     margin: 3em 0em;
   }

   .quote.stripe.segment {
     padding: 0em;
   }
   .quote.stripe.segment .grid .column {
     padding-top: 5em;
     padding-bottom: 5em;
   }

   .footer.segment {
     padding: 5em 0em;
   }

   .secondary.pointing.menu .toc.item {
     display: none;
   }

   @media only screen and (max-width: 700px) {
     .ui.fixed.menu {
       display: none !important;
     }
     .secondary.pointing.menu .item,
     .secondary.pointing.menu .menu {
       display: none;
     }
     .secondary.pointing.menu .toc.item {
       display: block;
     }
     .masthead.segment {
       min-height: 350px;
     }
     .masthead h1.ui.header {
       font-size: 2em;
       margin-top: 1.5em;
     }
     .masthead h2 {
       margin-top: 0.5em;
       font-size: 1.5em;
     }
   }
</style>
