<template lang="">
    <div class="sign-box">
        <div class="sign-form-box">
            <SignForm></SignForm>
        </div>
    </div>
</template>
<script>
import SignForm from '../components/SignForm.vue'

export default {
    components:{
        SignForm
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
.sign-box{
    /* width: 100%; */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.sign-form-box{
    width: 80%;
    margin: 0 10%;
    display: flex;
    justify-content: center;
}  
</style>