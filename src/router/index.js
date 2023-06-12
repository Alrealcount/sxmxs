import VueRouter from "vue-router";
import Login from "../pages/pilgrim-login.vue"
import Sign from "../pages/pilgrim-sign.vue"
import Home from "../pages/pilgrim-home.vue"
import Console from "../pages/pilgrim-console.vue"
import Intro from "../pages/pilgrim-intro.vue"
import About from "../pages/pilgrim-about.vue"
import Profile from "../pages/console-profile.vue"
import Main from "../pages/console-main.vue"
// import Anaylsis from "../pages/console-anaylsis.vue"
import Overview from "../pages/anaylsis/anaylsis-overview.vue"
import Deep from "../pages/anaylsis/anaylsis-deep.vue"
import Listen from "../pages/anaylsis/anaylsis-listen.vue"

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
            redirect: "/pilgrim-home/pilgrim-console",
            component:Home,
            children:[
                {
                    name:'控制台',
                    path:'pilgrim-console',
                    redirect: "pilgrim-console/console-main",
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
                            name: '总览',
                            path: 'anaylsis-overview',
                            component: Overview,
                        },
                        {
                            name: '深度搜索',
                            path: 'anaylsis-deep',
                            component: Deep,
                        },
                        {
                            name: '实时监听',
                            path: 'anaylsis-listen',
                            component: Listen,
                        }
                    ]
                },
                {
                    name: '项目介绍',
                    path: 'pilgrim-intro',
                    component: Intro,
                },
                {
                    name: '关于我们',
                    path: 'pilgrim-about',
                    component: About,
                }
            ]
        }
    ]
})

export default router