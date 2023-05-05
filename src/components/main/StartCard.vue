<template lang="">
    <div style="z-index: 100;position: relative;">
        <el-card class="box-card" shadow="never" style="background-color: white;box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);">
            <div slot="header">
                <span>登录</span>
            </div>
            <div class="start-tip" id="start-tip">
                <template>
                    <el-alert title="登录状态" type="info" description="用户未实现登录" show-icon
                    closable @close="closeAlter">
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
                <div class="start-btn-box-show">
                    <div style="width: 128px;height: 128px;display: none;position: relative;" id="img-box"><img src="" alt="" id="this-img"></div>
                    <el-button @click="getQR" style="margin-top: 20px;" v-if="!isGetQR" :disabled=getQR_disabled>登录</el-button>
                    <el-button @click="reClaimQR" style="margin-top: 20px;width: 120px;" v-else :disabled=re_disabled>
                        <span>刷新</span>
                        <span v-if="re_disabled">({{loading_sum}})</span>
                    </el-button>
                </div>
            </div>
            <div class="option-btn" id="option-btn">
                <el-button @click="deepSearch()">深度搜索</el-button>
                <el-button @click="Listen()">实时监听</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name:'StartCard',
    data() {
        return {
            loading:true,
            isGetQR:false,
            getQR_disabled:false,
            re_disabled:false,
            loading_sum:0
        }
    },
    mounted() {
        
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
                        message:'深度搜索开启成功',
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
}
.start-btn-box-show{
    display: flex;
    flex-direction: column;
    align-items: center;
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