import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
const routes:Array<RouteRecordRaw>=[
    {
        path:'/',
        component:()=>import('@/pages/Index.vue')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})