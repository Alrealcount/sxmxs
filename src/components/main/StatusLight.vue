<template lang="">
    <div style="padding: 20px;z-index: 100;position: relative;">
        <el-card class="box-card" shadow="never" style="background-color: white;box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);">
            <div slot="header" class="clearfix">
                <span>进程</span>
                <div :class="lightstatus==='NOT_CREATED'?'no-creat':
                lightstatus==='OFFLINE'?'offine':lightstatus==='LEAVE_UNUSED'?'lev-unused':
                lightstatus==='DEEP_SEARCH'?'deep-search':'listen'" class="circle">
                </div>
            </div>
            <div>
                <div style="padding-bottom: 10px;color: rgb(71, 164, 231);"><span>进程状态: {{this.lightstatus}}</span></div>
                <span style="font-size: 14px;">未提供更多信息 : )</span>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        name:'StatusLight',
        props: ['lightstatus'],
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        methods: {
            
        },
    }
</script>
<style scoped>
.circle{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgb(162, 162, 162);
    position: absolute;
    right: 50px;
}
.clearfix{
    position: relative;
    display: flex;
    align-items: center;
}
.no-creat{
    background-color: #BAC8D3;
}
.offine{
    background-color: #FF6666;
}
.lev-unused{
    background-color: #66FF66;
}
.deep-search{
    background-color: #007FFF;
}
.listen{
    background-color: #6600CC;
}
</style>