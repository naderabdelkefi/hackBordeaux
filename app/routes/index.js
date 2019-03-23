import PlayGame from "../components/PlayGame"
import Home from "../components/Home"

export default [
    {
        name: 'home',
        component: Home,
        path: '/',
    },
    {
        name: 'play',
        component: PlayGame,
        path: '/play',
    },
]
