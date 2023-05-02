<template lang="">
    <div class="login-box">
        <div class="login-form-box">
            <LoginForm></LoginForm>
        </div>
    </div>
</template>
<script>
import LoginForm from '../components/LoginForm.vue'

export default {
    components:{
        LoginForm
    },
    data() {
        return {
            
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>
<style scoped>
.login-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.login-form-box{
    width: 80%;
    margin: 0 10%;
    display: flex;
    justify-content: center;
}
</style>