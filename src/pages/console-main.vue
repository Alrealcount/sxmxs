<template lang="">
    <div style="width: 100%;position: relative;">
        <BackGround></BackGround>
        <LoadBox></LoadBox>
        <div class="console-main-header">
            <span>控制台主页</span>
            <div style="font-size: 12px;font-weight: 400;font-style: italic;"><span>f00867df</span></div>
        </div>
        <div class="main-top-box">
            <div style="width: 50%;">
                <div class="user-info fade-in">
                    <UserInfo></UserInfo>
                </div>
                <div class="start-card fade-in">
                    <StartCard :status.sync="crawStatus"></StartCard>
                </div>
                <div class="time-show fade-in">
                    <el-card class="box-card" shadow="never" style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);">
                        <div slot="header" class="clearfix">
                            <span>功能耗时</span>
                        </div>
                        <div style="display: flex;justify-content: space-around;">
                            <div class="time-show-item">
                                <span>深度搜索</span>
                                <div><span>{{deepTime}}</span></div>
                            </div>
                            <div class="time-show-item">
                                <span>实时监听</span>
                                <div><span>{{listenTime}}</span></div>
                            </div>
                            <div class="time-show-item">
                                <span>最大耗时</span>
                                <div><span>{{maxTime}}</span></div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
            <div style="width: 50%;">
                <div class="statu-light fade-in">
                    <StatuLight :lightStatus.sync="crawStatus"></StatuLight>
                </div>
                <div style="padding: 20px;" class="fade-in">
                    <MessageTable :messList.sync="messageList" :time="time"></MessageTable>
                </div>
                <div class="main-center-box">
                    <div class="thread-table fade-in">
                        <el-card class="box-card" shadow="never" style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);">
                            <div slot="header" class="clearfix">
                                <span>线程</span>
                            </div>
                            <div>
                                <ThreadTable :status.sync="crawStatus"></ThreadTable>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import StatuLight from "../components/main/StatusLight.vue"
import ThreadTable from "../components/main/ThreadTable.vue"
import UserInfo from "../components/main/UserInfo.vue"
import StartCard from "../components/main/StartCard.vue"
import BackGround from "../components/BackGround.vue"
import MessageTable from "../components/main/MessageTable.vue"
import LoadBox from "../components/main/LoadBox.vue"

export default {
    components:{
        StatuLight,
        ThreadTable,
        UserInfo,
        StartCard,
        BackGround,
        MessageTable,
        LoadBox
    },
    data() {
        return {
            crawStatus:'',
            stu_statu_num:0,
            messageList:[],
            time:[],
            deepTime:0,
            deepTimer:'',
            listenTime:0,
            listenTimer:'',
            maxTime:0
        }
    },
    
    mounted() {
        this.getStuData()
        this.getUserInfo()
        this.getCrawStatus()
        this.getUserId()
        this.deepTime = this.formateSeconds(0)
        this.listenTime = this.formateSeconds(0)
        this.maxTime = this.formateSeconds(0)
    },
    methods: {
        getStuData(){
            this.$axios({
                url: 'http://api.pi1grim.top/ea/api/v3/student',
                method: 'get',
                headers: {
                    token: sessionStorage.getItem('token')
                }
            }).then(({ data }) => {
                console.log(data)
                if (data.code === 2035) {
                    let stuList = data.data
                    for(let i in stuList){
                        if(stuList[i].selected){
                            this.stu_statu_num++
                        }
                    }
                    sessionStorage.removeItem('stu')
                    sessionStorage.setItem('stu', this.stu_statu_num)
                }
            })
        },
        getUserId() {
            console.log('getuserid')
            // /api/v3/user/id
            this.$axios({
                url: `http://api.pi1grim.top/ea/api/v3/user/id`,
                method: 'GET',
                headers: {
                    token: sessionStorage.getItem('token')
                }
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    if (res.data.code === 2080) {
                        sessionStorage.setItem('id', res.data.data)
                        this.openSocket()
                    }
                }
            })
        },
        getUserInfo(){
            this.$axios({
                url:'http://api.pi1grim.top/ea/api/v3/user/profile',
                method:'get',
                headers:{
                    token:sessionStorage.getItem('token')
                }
            }).then(({data})=>{
                if(data.code===2010){
                    console.log(data.data)
                    sessionStorage.removeItem('userInfo')
                    sessionStorage.setItem('userInfo', JSON.stringify(data.data))
                }else{
                    console.log('error')
                }
            })
        },
        getCrawStatus(){
            this.$axios({
                url: 'http://api.pi1grim.top/ea/api/v3/crawler/status',
                method: 'get',
                headers: {
                    token: sessionStorage.getItem('token')
                }
            }).then(({ data }) => {
                if (data.code === 2055) {
                    this.crawStatus = data.data
                    console.log(this.crawStatus)
                    if (this.crawStatus === 'LISTEN') {
                        let i = 1
                        this.listenTimer = setInterval(() => {
                            if (i > this.maxTime) {
                                this.maxTime = this.formateSeconds(i)
                            }
                            this.listenTime = this.formateSeconds(i++)
                        }, 1000)
                    } else {
                        clearInterval(this.listenTimer)
                    }
                    if(this.crawStatus==='DEEP_SEARCH'){
                        let i = 1
                        this.deepTimer = setInterval(()=>{
                            if (i > this.maxTime) {
                                this.maxTime = this.formateSeconds(i)
                            }
                            this.deepTime = this.formateSeconds(i++)
                        },1000)
                    }else{
                        clearInterval(this.deepTimer)
                    }
                    
                } else {
                    console.log('get CrawStatus error')
                }
            })
        },
        openSocket() {
            if (typeof (WebSocket) == "undefined") {
                console.log("您的浏览器不支持WebSocket");
            } else {
                console.log("您的浏览器支持WebSocket");
                //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
                //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
                //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
                var socketUrl = `ws://api.pi1grim.top/ea/api/v3/websocket/${sessionStorage.getItem('id')}`;
                // socketUrl=socketUrl.replace("https","ws").replace("http","ws");
                console.log(socketUrl);
                if (socket != null) {
                    socket.close();
                    socket = null;
                }
                var socket = new WebSocket(socketUrl);
                //打开事件
                socket.onopen = function () {
                    console.log("websocket已打开");
                    //socket.send("这是来自客户端的消息" + location.href + new Date());
                };
                //获得消息事件
                socket.onmessage = (msg) => {
                    let data = JSON.parse(msg.data)
                    switch (data.code) {
                        case 3000:
                            console.log(data)
                            // this.reclaimCraw('OFFLINE')
                            break;
                        case 3005:
                            console.log(data)
                            this.getCrawStatus()
                            
                            break;
                        case 3010:
                            console.log(data)
                            break;
                        case 3015:
                            console.log(data)
                            break;
                        case 3020:
                            // console.log(msg)
                            this.messageList.push(data.data)
                            this.time.push((data.timestamp.split('.')[0]).split('T')[1])
                            console.log(this.messageList)
                            break;
                        default:
                            break;
                    }
                };
                //关闭事件
                socket.onclose = (event) => {
                    console.log('websocket 断开: ' + event.codvent + ' ' + event.reason + ' ' + event.wasClean)
                    console.log(event)
                    console.log("websocket已关闭");
                    this.openSocket()
                };
                //发生了错误事件
                socket.onerror = function (e) {
                    console.log(e)
                    console.log("websocket发生了错误");
                    this.openSocket()
                }
            }
        },
        formateSeconds(endTime) {
            let secondTime = parseInt(endTime); //将传入的秒的值转化为Number
            let min = 0; // 初始化分
            let h = 0; // 初始化小时
            let result = "";
            if (secondTime > 60) {
                //如果秒数大于60，将秒数转换成整数
                min = parseInt(secondTime / 60); //获取分钟，除以60取整数，得到整数分钟
                secondTime = parseInt(secondTime % 60); //获取秒数，秒数取佘，得到整数秒数
                if (min > 60) {
                    //如果分钟大于60，将分钟转换成小时
                    h = parseInt(min / 60); //获取小时，获取分钟除以60，得到整数小时
                    min = parseInt(min % 60); //获取小时后取佘的分，获取分钟除以60取佘的分
                }
            }
            if (h.toString().padStart(2, "0") == "00") {
                result = `${min.toString().padStart(2, "0")}:${secondTime
                    .toString()
                    .padStart(2, "0")}`;
            } else {
                result = `${h.toString().padStart(2, "0")}:${min
                    .toString()
                    .padStart(2, "0")}:${secondTime.toString().padStart(2, "0")}`;
            }

            return result;
        },
    },
}
</script>
<style scoped>
.statu-light{
    width: 100%;
    position: relative;
}
.user-info{
    width: 100%;
    
}
.main-top-box{
    width: 100%;
    display: flex;
}
.main-center-box{
    width: 100%;
    display: flex;
}
.thread-table{
    width: 100%;
    padding: 20px;
}
.console-main-header{
    width: 100%;
    padding: 20px;
    padding-top: 40px;
    /* padding-top: 0; */
    font-size: 20px;
    display: flex;
    flex-direction: column;
    /* margin-top: 20px; */
    justify-content: center;
    align-items: center;
    font-weight: 700;
    margin-bottom: 50px;
}
.console-main-header span{
    z-index: 100;
}
.start-card{
    width: 100%;
    padding: 20px;
}
.time-show{
    padding: 20px;
}
.time-show-item{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.fade-in {
	-webkit-animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes fade-in-top {
  0% {
    -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in-top {
  0% {
    -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}


</style>