import VueRouter from "vue-router";
import Login from "../pages/pilgrim-login.vue"
import Sign from "../pages/pilgrim-sign.vue"
import Home from "../pages/pilgrim-home.vue"
import Console from "../pages/pilgrim-console.vue"
import Profile from "../pages/console-profile.vue"
import Main from "../pages/console-main.vue"
import Anaylsis from "../pages/console-anaylsis.vue"

const router =  new VueRouter({
    routes:[
        {
            name:'登录',
            path:'/pilgrim-login',
            component:Login,
        },
        {
            name:'注册',
            path:'/pilgrim-sign',
            component:Sign,
        },
        {
            name:'主页',
            path:'/pilgrim-home',
            component:Home,
            children:[
                {
                    name:'控制台',
                    path:'pilgrim-console',
                    component:Console,
                    children:[
                        {
                            name:'用户设置',
                            path:'console-profile',
                            component:Profile,
                        },
                        {
                            name: '控制台主页',
                            path: 'console-main',
                            component: Main,
                        },
                        {
                            name: '数据分析',
                            path: 'console-anaylsis',
                            component: Anaylsis,
                        }
                    ]
                }
            ]
        }
    ]
})

export default router