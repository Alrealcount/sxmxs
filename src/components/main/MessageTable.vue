<template lang="">
    <div style="">
        <!-- <div class="message-background">
        </div> -->
        <el-card class="box-card" shadow="never" style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);">
            <div slot="header" class="clearfix">
                <span>深度搜索进程</span>
                <div @click="SetShrink" style="position: absolute;right: 40px;" type="button">
                    <i :class="isShrink?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                </div>
                <div style="position: absolute;right: 80px;" @click="SetShrink" type="button">
                    <span style="font-size: 14px;color: rgb(180, 180, 180);">{{isShrink?'查询详细信息':'关闭详细信息'}}</span>
                </div>
                <div style="position: absolute;font-size: 14px;left: 30%;transform: translateY(20%);">
                    <span v-if="percentage===0">进程未开始</span>
                    <span v-else>当前进度 : {{percentage+'%'}}</span>
                </div>
            </div>
            <div class="message-table-body" :style="{'height':(isShrink?'0px':'300px')}">
                <div class="process-jet">
                    <div style="position: relative;width: 100%;">
                        <div class="progress" role="progressbar" aria-label="Animated striped example" :aria-valuenow="percentage" aria-valuemin="0"
                            aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bar-color" :style="{width: percentage + '%'}">{{percentage+'%'}}</div>
                        </div>
                        <!-- <el-progress :percentage="percentage" :color="customColors" text-inside :stroke-width="26"></el-progress> -->
                    </div>
                </div>
                <!-- <div class="message-tip">
                    <span>未提供更多信息 : )</span>
                </div> -->
                <div class="message-main">
                    <div class="main-item" v-if="messList.length===0">
                        <el-empty description="暂无数据" :image-size="120"></el-empty>
                    </div>
                    <div class="main-item" v-else>
                        <div style="width: 100%;">
                            <template>
                                    <el-alert v-for="(item,id) in messList" :key="id" :title="item.qqNumber+' --- '+time[id]" type="success" style="margin-bottom: 20px;"
                                    :description="item.notes+' 数据获取完成'"
                                    show-icon
                                    >
                                    </el-alert>
                            </template>
                        </div>
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
        messList:[],
        time:[]
    },
    data() {
        return {
            isShrink:true,
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
            this.getPercent(curVal[curVal.length-1].headCount)
            
        }
    },
    methods: {
        SetShrink(){
            this.isShrink = !this.isShrink

        },
        getPercent(num){
            this.percentage = 100 * num / sessionStorage.getItem('stu')
            if(this.percentage===100){
                setTimeout(()=>{
                    this.percentage=0
                },1000)
            }
        },
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
    
}
.main-item{
    width: 100%;
    height: 260px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
}
::-webkit-scrollbar {
    width: 8px; 
    height: 8px;
}
/* /滚动条的滑块 */
::-webkit-scrollbar-thumb {
    background-color: #eaecf1;
    border-radius: 3px;
}
.flip-in-hor-bottom {
	-webkit-animation: flip-in-hor-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: flip-in-hor-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@-webkit-keyframes flip-in-hor-bottom {
  0% {
    -webkit-transform: rotateX(80deg);
            transform: rotateX(80deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
    opacity: 1;
  }
}
@keyframes flip-in-hor-bottom {
  0% {
    -webkit-transform: rotateX(80deg);
            transform: rotateX(80deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
    opacity: 1;
  }
}
.bar-color{
    background-color: #67C23A !important;
}

.flip-out-hor-top {
	-webkit-animation: flip-out-hor-top 0.45s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
    animation: flip-out-hor-top 0.45s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}
@-webkit-keyframes flip-out-hor-top {
  0% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateX(70deg);
            transform: rotateX(70deg);
    opacity: 0;
  }
}
@keyframes flip-out-hor-top {
  0% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateX(70deg);
            transform: rotateX(70deg);
    opacity: 0;
  }
}

</style>