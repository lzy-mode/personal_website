import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/Home.vue'
import { defineAsyncComponent } from 'vue'

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/index",
                name: "index",
                meta: {
                    title: '首页'
                },
                component: defineAsyncComponent(() => import( "../view/Index.vue"))
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;