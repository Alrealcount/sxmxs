<template lang="">
    <div>
        <BackGround></BackGround>
        <LoadBox></LoadBox>
        <div class="profile-title">
            <span>用户设置</span>
            <div style="font-weight: 400;font-size: 12px;font-style: italic;"><span>f00867df</span></div>
        </div>
        <div style="display: flex;">
            <div style="width: 50%;z-index: 100;" class="fade-in">
                <StudentList></StudentList>
            </div>
            <div style="width: 50%;padding: 20px;z-index: 100;" class="fade-in">
                <div style="border: 1px solid rgb(204, 204, 204);background-color: rgba(255, 255, 255, 0.655);box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);">
                    <div style="">
                        <div class="profile-header">
                            <span>用户信息修改</span>
                        </div>
                        <ProfileForm></ProfileForm>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import ProfileForm from "../components/profile/ProfileForm"
import StudentList from "../components/profile/StudentList"
import BackGround from "../components/BackGround.vue"
import LoadBox from "../components/main/LoadBox.vue"

export default {
    components:{
        ProfileForm,
        StudentList,
        BackGround,
        LoadBox
    },
    data() {
        return {
            password:'',
            mail:'',
            phone:'',
            step:''
        }
    },
    mounted() {
        
    },
    methods: {
        modifyInfo(){
            this.$axios({
                url:'',
                method:'post',
                headers:{
                    token:sessionStorage.getItem('token')
                },
                data:{
                    password:this.password,
                    mail:this.mail,
                    phone:this.phone,
                    step:this.step,
                }
            })
        }
    },
}
</script>
<style scoped>
.profile-header{
    padding: 20px;
    padding-bottom: 0;
    /* border-bottom: 1px solid rgb(243, 242, 242); */
    /* margin-bottom: 5px; */
}
.profile-title{
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
.profile-title span{
    /* font-size: 20px;
    font-weight: 700; */
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