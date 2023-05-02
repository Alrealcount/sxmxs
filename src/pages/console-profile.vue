<template lang="">
    <div>
        用户设置
        <div>
            <ProfileForm></ProfileForm>
        </div>
        <div>
            <StudentList></StudentList>
        </div>
    </div>
</template>
<script>
import ProfileForm from "../components/ProfileForm"
import StudentList from "../components/StudentList"
export default {
    components:{
        ProfileForm,
        StudentList
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
<style lang="">
    
</style>