<template lang="">
    <div style="padding: 20px;z-index: 100;position: relative;">
        <el-card class="box-card" shadow="never" style="background-color: white;box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);">
            <div slot="header" class="clearfix">
                <span>进程</span>
                <div :class="lightStatus==='NOT_CREATED'?'no-creat':
                lightStatus==='OFFLINE'?'offine':lightStatus==='LEAVE_UNUSED'?'lev-unused':
                lightStatus==='DEEP_SEARCH'?'deep-search':'listen'" class="circle">
                </div>
            </div>
            <div>
                <div style="padding-bottom: 10px;color: rgb(71, 164, 231);"><span>进程状态: {{lightStatus}}</span></div>
                <span style="font-size: 14px;">未提供更多信息 : )</span>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        name:'StatusLight',
        props: ['lightStatus'],
        data() {
            return {
                // lightstatus:''
            }
        },
        mounted() {
            // this.lightstatus = sessionStorage.getItem('crawStatus')
        },
        activated() {
            // setInterval(() => {
            //     this.lightstatus = sessionStorage.getItem('crawStatus')
            // },1000)
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
    transition: 0.5s;
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
    background-color: #6ebfe57b;
}
.lev-unused{
    background-color: #3ffca178;
}
.deep-search{
    background-color: #9f47f681;
}
.listen{
    background-color: #ebaf5a76;
}

</style>