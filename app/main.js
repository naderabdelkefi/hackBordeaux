import Vue from "vue"
import VueRouter from "vue-router"
import App from "./components/App"
import routes from "./routes"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes,
})

new Vue({
    router,
    render: h => h(App)
}).$mount("#appMountPoint")
