<template lang="">
    <div class="console-box">
        <!-- 控制台主页 -->
        <div class="console-main">
            <div class="console-bar">
                <!-- 索引 -->
                <el-col :span="12">
                    <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                    :collapse="isCollapse" router="true">
                        <el-menu-item @click="showTo">
                            <!-- el-icon-s-unfold -->
                            <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
                            <span slot="title">{{isCollapseTxt}}</span>
                        </el-menu-item>
                        <el-menu-item index="/pilgrim-home/pilgrim-console/console-main">
                            <i class="el-icon-menu"></i>
                            <span slot="title">主页</span>
                        </el-menu-item>
                        <el-menu-item index="/pilgrim-home/pilgrim-console/console-profile">
                            <i class="el-icon-document"></i>
                            <span slot="title">用户设置</span>
                        </el-menu-item>
                        <!-- <el-menu-item index="">
                            <i class="el-icon-setting"></i>
                            <span slot="title">数据分析</span>
                        </el-menu-item> -->
                        <el-submenu index="">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                <span slot="title">数据分析</span>
                            </template>
                            <el-menu-item index="/pilgrim-home/pilgrim-console/anaylsis-overview">总览</el-menu-item>
                            <el-menu-item index="/pilgrim-home/pilgrim-console/anaylsis-deep">深度搜索</el-menu-item>
                            <el-menu-item index="/pilgrim-home/pilgrim-console/anaylsis-listen">实时监听</el-menu-item>
                        </el-submenu>

                    </el-menu>
                </el-col>
            </div>
            <div class="console-body">
                <!-- 内容 -->
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isCollapse: false,
            isCollapseTxt: '收起',
            
        }
    },
    mounted() {
        this.$router.push({name:'控制台主页'})
        console.log('创建控制台')
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      showTo(){
        if(this.isCollapse){
            this.isCollapse = false
            this.isCollapseTxt = '收起'
        }else{
            this.isCollapse = true
            this.isCollapseTxt = '展开'
        }
      },
      getAvatar() {
            this.$axios({
                url: `http://api.pi1grim.top/ea/api/v3/avatar`,
                method: 'GET',
                headers: {
                    token: sessionStorage.getItem('token')
                }
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    if (res.data.code === 2085) {
                        console.log(res.data)
                        sessionStorage.removeItem('avatar')
                        sessionStorage.setItem('avatar', JSON.stringify(res.data.data))
                    }
                }
            })
        },
    }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    /* height: 100%; */
}
.el-menu--collapse{
    height: 100%;
}
div{
    height: 100%;
}
.console-main{
    display: flex;
}
.console-bar{
    z-index: 999;
}
.console-body{
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}

</style>