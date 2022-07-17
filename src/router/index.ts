import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/pages/Index.vue')
    },
    {
        path: '/player',
        components: {
            player: () => import('@/pages/Player.vue')
        }
    }, {
        path: '/chanel',
        component: () => import('@/pages/Chanel.vue')
    },
    {
        path: '/special',
        component: () => import('@/pages/Special.vue')
    },
    {
        path: '/cats',
        component:  () => import('@/pages/Category.vue')
    },
    {
        path: '/my',
        component: () => import('@/pages/My.vue')
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})