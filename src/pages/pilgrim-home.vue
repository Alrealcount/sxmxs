<template lang="">
    <div class="home-box">
        <div class="home-head">
            <ToolBar></ToolBar>
        </div>
        <div class="home-main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import ToolBar from "../components/ToolBar.vue"

export default {
    components:{
        ToolBar
    },
    data() {
        return {
            
        }
    },
    mounted() {
        this.getUserId()
    },
    methods: {
        getUserId(){
            console.log('getuserid')
            // /api/v3/user/id
            this.$axios({
                url:`http://api.pi1grim.top/ea/api/v3/user/id`,
                method:'GET',
                headers:{
                    token:sessionStorage.getItem('token')
                }
            }).then(res=>{
                console.log(res)
                if(res.status===200){
                    if(res.data.code===2080){
                        sessionStorage.setItem('id',res.data.data)
                        this.openSocket()
                    }
                }
            })
        },
        
        openSocket(){
            if(typeof(WebSocket) == "undefined") {
                console.log("您的浏览器不支持WebSocket");
            }else{
                console.log("您的浏览器支持WebSocket");
                //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
                //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
                //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
                var socketUrl=`ws://api.pi1grim.top/ea/api/v3/websocket/${sessionStorage.getItem('id')}`;
                // socketUrl=socketUrl.replace("https","ws").replace("http","ws");
                console.log(socketUrl);
                if(socket!=null){
                    socket.close();
                    socket=null;
                }
                var socket = new WebSocket(socketUrl);
                //打开事件
                socket.onopen = function() {
                    console.log("websocket已打开");
                    //socket.send("这是来自客户端的消息" + location.href + new Date());
                };
                //获得消息事件
                socket.onmessage = (msg)=>{
                    switch(msg.data.code) {
                        case 3000:
                            console.log(msg.data)
                            break;
                        case 3005:
                            
                            break;
                        case 3010:
                            
                            break;
                        case 3015:
                            
                            break;
                        case 3020:
                            
                            break;
                        default:
                            break;
                    } 
                };
                //关闭事件
                socket.onclose = () => {
                    console.log("websocket已关闭");
                    this.openSocket()
                };
                //发生了错误事件
                socket.onerror = function() {
                    console.log("websocket发生了错误");
                    this.openSocket()
                }
            }
        },
    },
}
</script>
<style scoped>
.home-box{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.home-main{
    height: calc(100% - 61px);
}
</style>