<template lang="">
    <div class="home-box">
        <div class="home-back"></div>
        <div class="home-head">
            <!-- <ToolBar></ToolBar> -->
            <div class="home-head-title">
                <i class="el-icon-discount"></i>
                <span>Pirgrim</span>
            </div>
            <div class="home-head-bar">
                <router-link :to="{name:'控制台'}" active-class="active">控制台</router-link>
                <router-link :to="{name:'项目介绍'}" active-class="active">项目介绍</router-link>
                <router-link :to="{name:'关于我们'}" active-class="active">关于我们</router-link>
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
import "@/assets/text/text.css";

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
    border-bottom: 1px solid rgb(10, 242, 118);
    /* background-color: #049c8598; */
    background-color: #16aa4291;
    display: flex;
    align-items: center;
    z-index: 999;
}
.home-head-title{
    width: 200px;
    height: 61px;
    color: white;
    font-family: 'yishuti';
    font-size: 24px;
    line-height: 61px;
    /* text-align: center; */
    padding-left: 20px;
}
.home-head-title span{
    margin-left: 10px;
}
.home-back{
    position: absolute;
    width: 100%;
    height: 61px;
    background-color: rgba(0, 94, 255, 0.649);
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
    /* background-color: rgb(9, 248, 248); */
    color: rgb(0, 0, 0);
    font-size: 17px;
}

a {
    text-decoration: none;
    color: rgb(255, 235, 235);
    transition: .5s;
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
    /* color: rgb(196, 196, 197); */
}
</style>