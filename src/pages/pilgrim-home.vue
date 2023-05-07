<template lang="">
    <div class="home-box">
        <div class="home-head">
            <!-- <ToolBar></ToolBar> -->
            <div class="home-head-bar">
                <router-link :to="{name:'控制台'}" active-class="active">控制台</router-link>
            </div>
        </div>
        <div class="home-main">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
// import ToolBar from "../components/ToolBar.vue"

export default {
    components:{
        // ToolBar
    },
    data() {
        return {
            
        }
    },
    mounted() {
        // this.getUserId()
        this.$router.push({ name: '控制台' })
    },
    methods: {
        
        
    },
}
</script>
<style scoped>
.home-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.home-head{
    height: 61px;
    width: 100%;
    border-bottom: 1px solid black;
    background-color: rgb(81, 104, 156);
    display: flex;
    align-items: center;
    z-index: 999;
}
.home-head-bar{
    padding: 0 20px;
    
}
.home-head-bar a{
    padding: 10px 20px;
    border-radius: 8px;
}
.home-main{
    height: calc(100% - 61px);
    position: relative;
}
.active{
    background-color: rgb(236, 246, 246);
}

a {
    text-decoration: none;
}
/*正常的未被访问过的链接*/
a:link {
    text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
    text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
    text-decoration: none;
}
/* 正在点击的链接，鼠标在元素上按下还没有松开*/
a:active {
    text-decoration: none;
}
/* 获得焦点的时候 鼠标松开时显示的颜色*/
a:focus {
    text-decoration: none;
}
</style>