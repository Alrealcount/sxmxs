<template lang="">
    <div style="display: flex;align-items: center;">
        <div class="login-form">
            <div class="login-form-title"><span>登录</span></div>
            <div style="border-bottom: 1px solid rgb(245, 245, 245);width: 100%;"></div>
            <el-form ref="form" :model="form" label-width="80px" label-position="top" :rules="rules" style="padding: 10px 0;">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-btn">
                <el-button type="primary" @click="forHome('form')" class="login-spe-btn">登录</el-button>
            </div>
            <div class="btn-box">
                <span>还没有账号？</span>
                <el-link type="success" @click="forSign">马上注册</el-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'LoginForm',
    props:[],
    data() {
        return {
            url:'http://api.pi1grim.top/ea/api/v3/user/login',
            form: {
                username: '',
                password: ''
            },
            rules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            }
        }
    },
    mounted() {
        
    },
    methods: {
        forSign(){
            this.$router.push({name:'注册'})
        },
        forHome(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = this.form
                    console.log(data)
                    this.$axios.post(this.url,{
                            "username": data.username,
                            "password": data.password
                    }).then(({data})=>{
                        if(data.status===200){
                            console.log(data)
                            if(data.code!=2005){
                                alert(`${data.message}`)
                            }else{
                                // alert('submit!');
                                sessionStorage.setItem('token',data.data)
                                this.$router.replace({name:'主页'})
                            }
                            // alert('submit!');
                            // this.$router.push({name:'主页'})
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
}
</script>
<style scoped>
.login-form{
    width: 350px;
    height: auto;
    padding: 20px;
    border-top: 2px solid #7482F0;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.login-form-title{
    width: 100%;
    text-align: center;
    font-weight: 600;
    color: rgb(4, 145, 16);
    /* padding: 16px 0px; */
    margin-bottom: 20px;
    
}
.login-btn{
    text-align: center;
    margin-bottom: 25px;
}
.login-spe-btn{
    margin-top: 20px;
    width: 100%;
    background-color: #7482F0;
}
.btn-box{
    text-align: center;
    font-size: 14px;
    padding: 8px 0;
}
</style>