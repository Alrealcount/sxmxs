<template lang="">
    <div>
        <BackGround></BackGround>
        <div style="display: flex;">
            <div style="width: 50%;padding: 20px;z-index: 100;">
                <div style="border: 1px solid rgb(204, 204, 204);background-color: white;">
                    <div style="">
                        <div class="profile-header">
                            <span>用户信息修改</span>
                        </div>
                        <ProfileForm></ProfileForm>
                    </div>
                </div>
            </div>
            <div style="width: 50%;z-index: 100;">
                <StudentList></StudentList>
            </div>
        </div>
    </div>
</template>
<script>
import ProfileForm from "../components/profile/ProfileForm"
import StudentList from "../components/profile/StudentList"
import BackGround from "../components/BackGround.vue"
export default {
    components:{
        ProfileForm,
        StudentList,
        BackGround
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
</style>