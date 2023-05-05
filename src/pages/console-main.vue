<template lang="">
    <div style="width: 100%;position: relative;">
        <BackGround></BackGround>
        <div class="console-main-header">
            <span>控制台主页</span>
            <div style="font-size: 12px;font-weight: 400;font-style: italic;"><span>f00867df</span></div>
        </div>
        <div class="main-top-box">
            <div style="width: 50%;">
                <div class="user-info">
                    <UserInfo></UserInfo>
                </div>
                <div class="start-card">
                    <StartCard></StartCard>
                </div>
                <div class="">

                </div>
            </div>
            <div style="width: 50%;">
                <div class="statu-light">
                    <StatuLight></StatuLight>
                </div>
                <div class="main-center-box">
                    <div class="thread-table">
                        <el-card class="box-card" shadow="never" style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);">
                            <div slot="header" class="clearfix">
                                <span>线程</span>
                            </div>
                            <div>
                                <ThreadTable></ThreadTable>
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
export default {
    components:{
        StatuLight,
        ThreadTable,
        UserInfo,
        StartCard,
        BackGround,
    },
    data() {
        return {
            crawStatus:'',
            stu_statu_num:0
        }
    },
    mounted() {
        this.getStuData()
        this.getUserInfo()
        this.getCrawStatus()
        this.openSocket()
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
                    sessionStorage.removeItem('crawStatus')
                    sessionStorage.setItem('crawStatus',this.crawStatus)
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
                    // console.log(msg)
                    let data = JSON.parse(msg.data)
                    switch (data.code) {
                        case 3000:
                            console.log(data)
                            this.reclaimCraw('OFFLINE')
                            break;
                        case 3005:
                            console.log(data)
                            break;
                        case 3010:
                            console.log(data)
                            break;
                        case 3015:
                            console.log(data)
                            break;
                        case 3020:
                            console.log(data)
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
                socket.onerror = function () {
                    console.log("websocket发生了错误");
                    this.openSocket()
                }
            }
        },
        reclaimCraw(status){
            sessionStorage.removeItem('crawStatus')
            sessionStorage.setItem('crawStatus',status)
        }
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
</style>