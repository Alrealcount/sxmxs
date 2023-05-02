<template lang="">
    <div class="console-box">
        <!-- 控制台主页 -->
        <div class="console-main">
            <div class="console-bar">
                <!-- 索引 -->
                <el-col :span="12">
                    <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                    :collapse="isCollapse" router="true" default-openeds="['1']">
                        <el-menu-item @click="showTo">
                            <!-- el-icon-s-unfold -->
                            <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
                            <span slot="title">{{isCollapseTxt}}</span>
                        </el-menu-item>
                        <el-menu-item index="/pilgrim-home/pilgrim-control/console-main">
                            <i class="el-icon-menu"></i>
                            <span slot="title">主页</span>
                        </el-menu-item>
                        <el-menu-item index="/pilgrim-home/pilgrim-control/console-profile">
                            <i class="el-icon-document"></i>
                            <span slot="title">用户设置</span>
                        </el-menu-item>
                        <el-menu-item index="/pilgrim-home/pilgrim-control/console-anaylsis">
                            <i class="el-icon-setting"></i>
                            <span slot="title">数据分析</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </div>
            <div>
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
            isCollapse: true,
            isCollapseTxt: '展开',
        }
    },
    mounted() {
        
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
      }
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
}
</style>