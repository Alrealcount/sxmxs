<template lang="">
    <div class="title-box">
        <el-menu
        :default-active="activeIndex"
        class="el-menu-demo title"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b" router="true">
            <el-menu-item :index="{name:'控制台'}">控制台</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    name:'ToolBar',
    data() {
        return {
            activeIndex: '1'
        }
    },
    mounted() {
        
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
}
</script>
<style scoped>
.title-box{
    width: 100%;
}
.title{
    width: 100%;
    padding: 0 10%;
}
</style>