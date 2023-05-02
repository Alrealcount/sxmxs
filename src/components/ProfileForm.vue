<template lang="">
    <div style="display: flex;justify-content: center;">
        <div class="sign-form">
            <div class="sign-form-title"><span>修改信息</span></div>
            <div style="border-bottom: 1px solid rgb(245, 245, 245);width: 100%;"></div>
            <el-form label-position="top" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign" status-icon style="padding-top: 20px;">
                <div class="sign-form-twice">
                    <div style="width: 50%;">
                        <el-form-item label="手机号" prop="phone">
                          <el-input v-model="formLabelAlign.phone" style="width: 96%;"></el-input>
                        </el-form-item>
                    </div>
                    <div style="width: 50%;padding-left: 2%;">
                        <el-form-item label="邮箱" prop="mail">
                          <el-input v-model="formLabelAlign.mail" style="width: 96%;"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="sign-form-twice">
                    <div style="width: 50%;">
                        <el-form-item label="密码" prop="password">
                          <!-- <el-input v-model="formLabelAlign.password" style="width: 96%;"></el-input> -->
                          <el-popover
                                placement="left"
                                title="密码要求"
                                width="200"
                                trigger="click"
                                offset="0"
                                content="至少8位，包含数字与字母">
                                <el-input v-model="formLabelAlign.password" style="width: 96%;" slot="reference" type="password" aria-disabled></el-input>
                                <!-- <el-button slot="reference" id="active"></el-button> -->
                            </el-popover>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <div class="sign-btn">
                <el-button type="primary" @click="getSign('formLabelAlign')" class="sign-spe-btn">修改</el-button>
                <div><span>or</span></div>
                <el-button type="primary" @click="reNovate('formLabelAlign')" class="sign-spe-rebtn" style="margin: 0;">重置</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'ProfileForm',
    data() {
        var validateUsername = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入用户名'));
            } else if(!this.userTset.test(this.formLabelAlign.username)){
                callback(new Error('用户名格式错误'));
            }else{
                callback();
            }
        };
        var validatePhone = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入手机号'));
            } else if(!/^1[34578]\d{9}$/.test(this.formLabelAlign.phone)){
                callback(new Error('手机号格式错误'));
            }else{
                callback();
            }
        };
        var validateMail = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入邮箱'));
            } else if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.formLabelAlign.mail)){
                callback(new Error('邮箱格式错误'));
            }else{
                callback();
            }
        };
        return {
            url:'http://api.pi1grim.top/ea/api/v3/user/register',
            formLabelAlign: {
                mail: this.userInfo.mail,
                phone: this.userInfo.phone,
                password: this.userInfo.password,
                checkPass: '',
                step: this.userInfo.step
            },
            userTset:/^.{7,20}$/,
            // passTest:/(?!\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,30}/,
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                mail: [
                    { validator: validateMail, trigger: 'blur'}
                ]
            }
        }
    },
    mounted() {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        this.mail = userInfo.mail
        this.password = userInfo.password
        this.phone = userInfo.phone
        this.step = userInfo.step
        console.log(userInfo,this.password)
    },
    methods: {
        getSign(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = this.formLabelAlign
                    console.log(data)
                    this.$axios.post(this.url,{
                            "username": data.username,
                            "phone": data.phone,
                            "password": data.password,
                            "mail": data.mail,
                    }).then(({data}) => {
                        if(data.status===200){
                            console.log(data)
                            alert(data.message);
                            console.log(this.formLabelAlign)
                            if(data.code===2000){
                                this.$router.go(-1)
                            }
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        reNovate(formName){
            if(this.$refs[formName] != undefined){
                this.$refs[formName].resetFields();
            } 
        },
        forLogin(){
            this.$router.push({name:'登录'})
        }
    },
}
</script>
<style scoped>
.sign-form{
    padding: 20px;
    border-top: 2px solid #049110;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    width: 800px;
}
.sign-form-title{
    width: 100%;
    text-align: center;
    font-weight: 600;
    color: rgb(4, 145, 16);
    /* padding: 16px 0px; */
    margin-bottom: 20px;
    
}
.sign-btn{
    /* display: flex; */
    /* justify-content: space-around; */
    margin: 20px 0;
    text-align: center;
}
.sign-btn div{
    margin: 12px 0;
    color: #525355;
    font-weight: 600;
}
.sign-form-twice{
    display: flex;
}
.sign-spe-btn{
    width:100%;
    /* margin-bottom: 30px; */
    background-color: #7482F0;
}
.sign-spe-btn:hover{
    background-color: #3648bb;
}
.sign-spe-rebtn{
    width: 100%;
    background-color: #3ABAF4;
}
.sign-spe-rebtn:hover{
    background-color: #22a4e1;
}
.btn-box{
    text-align: center;
    font-size: 14px;
    padding: 8px 0;
}
</style>