<template>
    <div style="padding: 20px;">
        <div class="user-info-box">
            <div class="user-info-head">
                <span>用户信息</span>
            </div>
            <el-descriptions column="1" style="margin-top: 10px;">
                <el-descriptions-item label="备注名">{{user.notes}}</el-descriptions-item>
                <!-- <el-descriptions-item label="选中状态">{{item.selected?'是':'否'}}</el-descriptions-item> -->
                <el-descriptions-item label="手机号">{{user.phone}}</el-descriptions-item>
                <el-descriptions-item label="监听步长">{{user.step}}</el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'UserInfo',
        data() {
            return {
                user: []
            }
        },
        mounted() {
            this.updateInfo()
        },
        methods: {
            updateInfo() {
                this.user = JSON.parse(sessionStorage.getItem('userInfo'))
            },
        },
    }
</script>
<style>
    .user-info-box {}

    .user-info-head {
        padding: 10px 0;
        border-bottom: 1px solid rgb(235, 232, 232);
    }
</style>