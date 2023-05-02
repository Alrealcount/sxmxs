<template lang="">
    <div class="console-box">
        <!-- 控制台主页 -->
        <div class="console-main">
            <div>
                <!-- 索引 -->
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                    :collapse="isCollapse" router="true">
                    <el-menu-item :index="{name:'控制台主页'}">
                        <i class="el-icon-menu"></i>
                        <span slot="title">主页</span>
                    </el-menu-item>
                    <el-menu-item :index="{name:'用户设置'}">
                        <i class="el-icon-document"></i>
                        <span slot="title">用户设置</span>
                    </el-menu-item>
                    <el-menu-item :index="{name:'数据分析'}">
                        <i class="el-icon-setting"></i>
                        <span slot="title">数据分析</span>
                    </el-menu-item>
                </el-menu>
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
            isCollapse: true

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
      }
    }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.console-main{
    display: flex;
    
}
</style>