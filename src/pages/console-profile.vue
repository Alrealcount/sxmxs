<template lang="">
    <div style="display: flex;">
        <div style="width: 50%;">
            <ProfileForm></ProfileForm>
        </div>
        <div style="width: 50%;">
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