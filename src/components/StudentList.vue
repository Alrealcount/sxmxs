<template lang="">
    <div>
        <div class="student-box">
            <el-card v-for="(item,id) in stuList" :key="id" class="box-card" shadow="hover">
                <div class="text item">
                    <div class="avatar">
                        <img src="" alt="">
                        <!-- <i class="el-icon-user" style="font-size: 40px;"></i> -->
                    </div>
                    <el-descriptions column="1">
                        <el-descriptions-item label="备注名">{{item.notes}}</el-descriptions-item>
                        <!-- <el-descriptions-item label="选中状态">{{item.selected?'是':'否'}}</el-descriptions-item> -->
                        <el-descriptions-item label="QQ号">{{item.qqNumber}}</el-descriptions-item>
                    </el-descriptions>
                </div>
                <div :class="[item.selected?'back-i-right':'back-i-wrong']" @click="setStatus(item)">
                    <i :class="[item.selected?'el-icon-check':'el-icon-close']"></i>
                </div>
            </el-card>
            
        </div>
    </div>
</template>
<script>
import Ava from "../assets/js/getAvatar.js"

export default {
    name:'StudentList',
    data() {
        return {
            stuList:[],
            map:Ava.getAvatar(this.map)
        }
    },
    mounted() {
        console.log(this.map)
        this.getStuList()
        this.updateAvatar()
    },
    methods: {
        getStuList(){
            this.$axios({
                url:'http://api.pi1grim.top/ea/api/v3/student',
                method:'get',
                headers:{
                    token:sessionStorage.getItem('token')
                }
            }).then(({data})=>{
                console.log(data)
                if(data.code===2035){
                    this.stuList = data.data
                }else{
                    this.$message(`${data.message}`)
                }
                
            })
        },
        updateAvatar(){
            
        },
        setStatus(item){
            console.log(item,'修改')
            item.selected = !item.selected
            this.$axios({
                url:'http://api.pi1grim.top/ea/api/v3/student',
                method:'put',
                data:{
                    students:[item]
                },
                headers:{
                    token:sessionStorage.getItem('token')
                }
            }).then(({data})=>{
                console.log(data)
            })
        }
    },

}
</script>
<style scoped>
.studeng-box{
    width: 50%;
    border-radius: 40px;
}
.text {
font-size: 14px;
}

.item {
    /* in-bottom: 18px; */
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    padding: 12px 20px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.box-card {
    width: 480px;
    height: 80px;
    margin-bottom: 5px;
    border-radius: 40px;
    position: relative;
    overflow: hidden;
}
.box-card:hover .back-i-right{
    opacity: 0.5;
}
.box-card:hover .back-i-wrong{
    opacity: 0.5;
}
.back-i-right{
    margin: 0;
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(185, 250, 191);
    opacity: 0.1;
    transition: .5s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.back-i-wrong{
    margin: 0;
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(243, 192, 175);
    opacity: 0.1;
    transition: .5s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.back-i-right i{
    font-size: 80px;
    color: rgb(30, 244, 30);
}
.back-i-wrong i{
    font-size: 80px;
    color: rgb(248, 64, 44);
}
.avatar{
    width: 40px;
    height: 40px;
    /* border-radius: 40px; */
    /* border: 1px solid black; */
}
</style>