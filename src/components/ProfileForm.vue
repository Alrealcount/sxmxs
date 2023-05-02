<template lang="">
    <div class="profile-box">
        <div class="profile-form">
            <el-form label-position="top" label-width="80px" :model="profileform" :rules="rules" ref="profileform" status-icon style="padding-top: 20px;">
                <el-collapse v-model="activeNames" @change="handleChange" style="margin-bottom: 20px;">
                    <el-collapse-item>
                        <template slot="title">
                            邮箱 mail
                            <div style="position: absolute;right: 50px;">
                                <span style="margin-right: 20px;">{{user.mail}}</span>
                                <i class="header-icon el-icon-info"></i>
                            </div>
                        </template>
                        <div>
                            <el-form-item prop="mail" style="margin-bottom: 0px;">
                                <el-popover placement="left" title="邮箱要求" width="200" trigger="click" offset="0" content="至少大于6个字符小于20个字符">
                                    <el-input v-model="profileform.mail" slot="reference"></el-input>
                                    <!-- <el-button slot="reference" id="active"></el-button> -->
                                </el-popover>
                            </el-form-item>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item>
                        <template slot="title">
                            手机号 phone
                            <div style="position: absolute;right: 50px;">
                                <span style="margin-right: 20px;">{{user.phone}}</span>
                                <i class="header-icon el-icon-info"></i>
                            </div>
                        </template>
                        <div>
                            <el-form-item prop="phone" style="margin-bottom: 0px;">
                                <el-input v-model="profileform.phone"></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="手机号" prop="phone">
                                <el-input v-model="formLabelAlign.phone" style="width: 96%;"></el-input>
                            </el-form-item> -->
                        </div>
                    </el-collapse-item>
                    <el-collapse-item>
                        <template slot="title">
                            监听步长 step
                            <div style="position: absolute;right: 50px;">
                                <span style="margin-right: 20px;">{{user.step}}</span>
                                <i class="header-icon el-icon-info"></i>
                            </div>
                        </template>
                        <div>
                            <el-input label="监听步长" type="number" min="0" max="254" v-model="profileform.step"></el-input>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-form>
            <el-button type="primary" @click="setUserInfo('profileform')">确认修改</el-button>
            <el-button @click="updataInfo">重置</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'ProfileForm',
    data() {
        var validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else if (!/^1[34578]\d{9}$/.test(this.formLabelAlign.phone)) {
                callback(new Error('手机号格式错误'));
            } else {
                callback();
            }
        };
        var validateMail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.profileform.mail)) {
                callback(new Error('邮箱格式错误'));
            } else {
                callback();
            }
        };
        return {
            user:[],
            profileform:{
                phone: '',
                mail: '',
                step: 0,
            },
            rules: {
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                mail: [
                    { validator: validateMail, trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.updataInfo()
    },
    methods: {
        updataInfo(){
            this.user = JSON.parse(sessionStorage.getItem('userInfo'))
            this.profileform.phone = this.user.phone
            this.profileform.mail = this.user.mail
            this.profileform.step = this.user.step
        },
        setUserInfo(){
            this.$axios({
                url:'http://api.pi1grim.top/ea/api/v3/user/profile',
                method:'post',
                data:{
                    password: JSON.parse(sessionStorage.getItem('userInfo')).password,
                    phone:this.profileform.phone,
                    mail:this.profileform.mail,
                    step:this.profileform.step,
                },
                headers:{
                    token:sessionStorage.getItem('token')
                }
            }).then(({data})=>{
                console.log(data)
                sessionStorage.removeItem('userInfo')
                sessionStorage.setItem('userInfo',JSON.stringify(data.data))
                this.updataInfo()
                if(data.code===2015){
                    this.$message('用户信息修改成功！');
                }
            })
        }
    },
}
</script>
<style scoped>
.profile-box{
    height: 100%;
    padding: 20px;
}
.profile-form{
    padding: 20px;
    width: 50%;
    position: relative;
}
</style>