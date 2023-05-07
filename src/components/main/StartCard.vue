<template lang="">
    <div style="z-index: 100;position: relative;">
        <el-card class="box-card" shadow="never" style="background-color: rgba(255, 255, 255, 0.655);box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);">
            <div slot="header" class="start-header">
                <span>登录</span>
                <div class="quit-start">
                    <el-button type="text" @click="closeCrawler" :disabled="status==='NOT_CREATED'?true:false">退出登录</el-button>
                </div>
            </div>
            <div class="start-tip" id="start-tip">
                <template>
                    <el-alert title="登录状态" type="info" :description="status==='NOT_CREATED'?'用户进程未创建':
                status==='OFFLINE'?'进程已创建，用户未登录':status==='LEAVE_UNUSED'?'用户登录成功，功能可正常使用':
                status==='DEEP_SEARCH'?'深度搜索进行中':'实时监听已开启'" show-icon
                    closable @close="closeAlter" :class="status==='NOT_CREATED'?'':
                status==='OFFLINE'?'offine':status==='LEAVE_UNUSED'?'lev-unused':
                status==='DEEP_SEARCH'?'deep-search':'listen'" style="transition: 0.5s;">
                    </el-alert>
                </template>
            </div>
            <div class="start-btn-box" id="start-btn-box">
                <div id="loading-img">
                    <el-skeleton style="width: 128px" :loading="loading" animated>
                        <template slot="template">
                            <el-skeleton-item variant="image" style="width: 128px; height: 128px;" />
                        </template>
                    </el-skeleton>
                </div>
                <div class="start-btn-box-show" id="start-btn-box-show">
                    <div style="width: 128px;height: 128px;display: none;position: relative;" id="img-box"><img src="" alt="" id="this-img"></div>
                    <el-button @click="getQR" style="margin-top: 20px;" v-if="!isGetQR" :disabled=getQR_disabled>登录</el-button>
                    <el-button @click="reClaimQR" style="margin-top: 20px;width: 120px;" v-else :disabled=re_disabled>
                        <span>刷新</span>
                        <span v-if="re_disabled">({{loading_sum}})</span>
                    </el-button>
                </div>
            </div>
            <div class="start-btn-box" id="option-btn">
                <el-button @click="deepSearch()">深度搜索</el-button>
                <el-button @click="Listen()">实时监听</el-button>
            </div>
            <div class="start-btn-box" id="close-listen-btn">
                <el-button @click="Listen()">关闭实时监听</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name:'StartCard',
    props: ['status'],
    data() {
        return {
            loading:true,
            isGetQR:false,
            getQR_disabled:false,
            re_disabled:false,
            loading_sum:0,
        }
    },
    mounted() {
        // console.log(this.status)
        // this.status = sessionStorage.getItem('crawStatus')
    },
    activated() {
        // setInterval(()=>{
        //     this.status = sessionStorage.getItem('crawStatus')
        // },1000)
    },
    watch:{
        status(curVal,oldVal){
            console.log(oldVal)
            switch(curVal){
                case 'LEAVE_UNUSED':
                    this.changeInterface(false)
                    break;
                case 'DEEP_SEARCH':
                    
                    break;
                case 'LISTEN':

                    break;
                default:
                    break;
            }
        }
    },
    methods: {
        isBtnClose(tof){
            var option_btn = document.getElementById('option-btn')
            if(tof){
                option_btn.style.display = 'none'
            }else{
                option_btn.style.display = 'flex'
            }
        },
        deepSearch() {
            this.isBtnClose(true)
            this.$axios({
                url: 'http://api.pi1grim.top/ea/api/v3/crawler/deep',
                method: 'get',
                headers: {
                    token: sessionStorage.getItem('token')
                }
            }).then(({data})=>{
                if(data.code===2065){
                    this.$message({
                        message:'深度搜索开始执行',
                        type:'success'
                    })
                }
            })
        },
        Listen(){
            this.isBtnClose(true)
            this.$axios({
                url: 'http://api.pi1grim.top/ea/api/v3/crawler/listen',
                method: 'get',
                headers: {
                    token: sessionStorage.getItem('token')
                }
            }).then(({ data }) => {
                if (data.code === 2070) {
                    this.$message({
                        message: '实时监听开启成功',
                        type: 'success'
                    })
                }
            })
        },
        reClaimQR(){
            this.re_disabled = true
            this.loading_sum = 10
            var timer = setInterval(()=>{
                this.loading_sum--
                if(this.loading_sum===0){
                    clearInterval(timer)
                }
            },1000)
            setTimeout(()=>{
                this.re_disabled = false
            },10000)
            this.getQR()
        },
        getQR(){
            this.getQR_disabled=true
            this.loading = true
            var loading_img = document.getElementById('loading-img')
            this.$message({
                message:'开始获取二维码',
            })
            loading_img.style.display = 'block'
            console.log('开始获取二维码')
            // this.loading = false
            var img_box = document.getElementById('img-box')
            img_box.style.display = 'none'
            this.$axios({
                url:'http://api.pi1grim.top/ea/api/v3/crawler/login',
                method:'GET',
                responseType: 'blob' ,
                headers:{
                    token:sessionStorage.getItem('token')
                }
            }).then((res)=>{
                this.isGetQR = true
                console.log(res)
                const blob = res.data
                let img = document.getElementById('this-img')
                window.URL.revokeObjectURL(img.src);
                img.src = window.URL.createObjectURL(blob);
                this.loading = false
                img_box.style.display = 'block'
                this.$message({
                    message:'获取二维码成功',
                    type:'success'
                })
            })
        },
        closeAlter(){
            let start_tip = document.getElementById('start-tip')
            setTimeout(()=>{
                start_tip.style.display = 'none'
            },300)
        },
        closeCrawler(){
            this.$axios({
                url: 'http://api.pi1grim.top/ea/api/v3/crawler',
                method: 'delete',
                headers: {
                    token: sessionStorage.getItem('token')
                }
            }).then(({ data }) => {
                if (data.code === 2060) {
                    this.$message({
                        message: 'Crawler终止成功',
                        type: 'success'
                    })
                    this.isGetQR = false
                     var img_box = document.getElementById('img-box')
                     this.changeInterface(true)
                     img_box.style.display = 'none'
                    sessionStorage.removeItem('crawStatus')
                    sessionStorage.setItem('crawStatus','NOT_CREATED')
                }
            })
        },
        changeInterface(type){
            var start_btn_box_show = document.getElementById('start-btn-box-show')
            var option_btn = document.getElementById('option-btn')
            if(type){
                start_btn_box_show.style.display = 'flex'
                option_btn.style.display = 'none'

            }else{
                start_btn_box_show.style.display = 'none'
                option_btn.style.display = 'flex'
            }
            
        }
    },
}
</script>
<style scoped>
.start-tip{
    height: 50px;
    width: 100%;
    margin-bottom: 30px;
}
.start-btn-box{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
.start-btn-box-show{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.start-header{
    display: flex;
    align-items: center;
}
.quit-start{
    position: absolute;
    right: 20px;
}
#option-btn{
    display: none;
}
#close-listen-btn{
    display: none;
}
#this-img{
    width: 100%;
    height: 100%;
    -webkit-animation: flip-in-ver-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: flip-in-ver-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
#loading-img{
    display: none;
    -webkit-animation: slide-in-fwd-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-fwd-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.offine{
    background-color: #6ebfe57b !important;
    color: #04425ead !important;
    /* color: black !important; */
}
.lev-unused{
    background-color: #3ffca178 !important;
}
.deep-search{
    background-color: #9f47f681 !important;
}
.listen{
    background-color: #ebaf5a76 !important;
}
@-webkit-keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
            transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
            transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}
@-webkit-keyframes flip-in-ver-left {
  0% {
    -webkit-transform: rotateY(80deg);
            transform: rotateY(80deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
    opacity: 1;
  }
}
@keyframes flip-in-ver-left {
  0% {
    -webkit-transform: rotateY(80deg);
            transform: rotateY(80deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
    opacity: 1;
  }
}

</style>