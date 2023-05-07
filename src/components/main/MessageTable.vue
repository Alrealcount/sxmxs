<template lang="">
    <div style="">
        <!-- <div class="message-background">
        </div> -->
        <el-card class="box-card" shadow="never" style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);">
            <div slot="header" class="clearfix">
                <span>深度搜索进程</span>
                <div @click="SetShrink" style="position: absolute;right: 40px;">
                    <i :class="isShrink?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                </div>
            </div>
            <div class="message-table-body" :style="{'height':(isShrink?'0px':'300px')}">
                <div class="process-jet">
                    <div style="position: relative;width: 100%;">
                        <el-progress :percentage="percentage" :color="customColors" text-inside :stroke-width="26"></el-progress>
                    </div>
                </div>
                <!-- <div class="message-tip">
                    <span>未提供更多信息 : )</span>
                </div> -->
                <div class="message-main">
                    <div class="main-item" v-if="messList.length===0">
                        <el-empty description="暂无数据"></el-empty>
                    </div>
                    <div class="main-item" v-else>
                        <template>
                            <el-alert v-for="(item,id) in messList" :key="id" :title="item" type="success">
                            </el-alert>
                        </template>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
// import LoadBox from "./LoadBox.vue"

export default {
    name:'MessageTable',
    components: {
        // LoadBox
    },
    props: {
        messList:[]
    },
    data() {
        return {
            isShrink:false,
            percentage: 0,
            customColors: [
                { color: '#f56c6c', percentage: 20 },
                { color: '#e6a23c', percentage: 40 },
                { color: '#5cb87a', percentage: 60 },
                { color: '#1989fa', percentage: 80 },
                { color: '#6f7ad3', percentage: 100 }
            ]
        }
    },
    mounted() {
        console.log(this.messList)
        
    },
    watch:{
        messList(curVal,oldVal){
            console.log(curVal,oldVal)
            
        }
    },
    methods: {
        SetShrink(){
            this.isShrink = !this.isShrink

        }
    },
}
</script>
<style scoped>
.message-background{
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: -99;
}
.message-table-body{
    transition: .5s;
    max-height: 1000px;
    position: relative;
}
.process-jet{
    position: absolute;
    width: 100%;
    height: 40px;
    top: -20px;
    left: 0;
    display: flex;
    /* justify-content: center; */
    align-items: center;
}
.message-tip{
    
    padding-top: 40px;
}
.message-main{
    padding-top: 40px;
    height: 300px;
    overflow-y: hidden;
}
.main-item{
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>