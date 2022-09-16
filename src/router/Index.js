import VueRouter from 'vue-router'


const routes = [
    {
        path:'/',
        name:'login',
        component:() => import("../pages/LoginIndex.vue")
    },
    {
        path:'/blogHome',
        name:'blogHome',
        component:() => import("../pages/BlogHome.vue"),
        children:[
            {
                path:'blogMarkdown',
                name:'blogMarkdown',
                component:() => import("../pages/BlogMarkdown.vue")
            },
            {
                path:'blogManage',
                name:'blogManage',
                component:() => import("../pages/BlogManage.vue")
            },
            {
                path:'vueeasytable',
                name:'vueEasyTable',
                component:()=> import("../pages/VueEasyTable.vue")
            }
        ]
    }
]


const router = new VueRouter({
    mode:'history',
    routes:routes
})

export default router