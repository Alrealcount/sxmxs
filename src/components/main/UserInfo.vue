<template>
    <div style="padding: 20px;z-index: 100;position: relative;">
        <el-card class="box-card" shadow="never" style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);">
            <div slot="header" class="clearfix">
                <span>用户信息</span>
                <div style="position: absolute;right: 50px;">
                    <el-button type="text" @click="updataUserData">刷新</el-button>
                </div>
            </div>
            <div>
                <el-descriptions column="1" style="margin-top: 10px;">
                    <el-descriptions-item label="邮箱">
                        <div class="user-info-item">
                            <span>{{user.mail}}</span>
                        </div>
                    </el-descriptions-item>
                    <!-- <el-descriptions-item label="选中状态">{{item.selected?'是':'否'}}</el-descriptions-item> -->
                    <el-descriptions-item label="手机号" label-class-name="my-label" content-class-name="my-content">
                        <div class="user-info-item">
                            <span>{{user.phone}}</span>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="监听好友数">
                        <div class="user-info-item">
                            <span>{{stu}}</span>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="监听步长" label-class-name="my-label" content-class-name="my-content">
                        <div class="user-info-item">
                            <span>{{user.step}}</span>
                        </div>
                    </el-descriptions-item>
                    
                </el-descriptions>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'UserInfo',
        props: {
            // user:[]
        },
        data() {
            return {
                user: [],
                stu:0
            }
        },
        mounted() {
            setTimeout(()=>{
                this.stu = sessionStorage.getItem('stu')
                this.updateInfo()
            },300)
        },
        methods: {
            updateInfo() {
                this.user = JSON.parse(sessionStorage.getItem('userInfo'))
            },
            updataUserData(){
                this.user = JSON.parse(sessionStorage.getItem('userInfo'))
                this.stu = sessionStorage.getItem('stu')
                setTimeout(()=>{
                    this.$message({
                        message: '刷新用户数据成功',
                        type: 'success'
                    })
                },300)
                
            }
        },
        activated() {
            this.stu = sessionStorage.getItem('stu')
            this.updateInfo()
        },
    }
</script>
<style>
    .user-info-box {}

    .user-info-head {
        padding: 10px 0;
        border-bottom: 1px solid rgb(235, 232, 232);
    }
    .user-info-item{
        position: absolute;
        left: 40%;
    }
    .clearfix{
        display: flex;
        align-items: center;
    }
    /* .my-label,.my-content{
        background-color: #F9FAFB;
    } */
</style>