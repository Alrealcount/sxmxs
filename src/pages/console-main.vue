<template lang="">
    <div>
        控制台主页

    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        this.getUserInfo()
    },
    methods: {
        getUserInfo(){
            this.$axios({
                url:'http://api.pi1grim.top/ea/api/v3/user/profile',
                method:'get',
                headers:{
                    token:sessionStorage.getItem('token')
                }
            }).then(({data})=>{
                if(data.code===2010){
                    console.log(data.data)
                    sessionStorage.removeItem('userInfo')
                    sessionStorage.setItem('userInfo', JSON.stringify(data.data))
                }else{
                    console.log('error')
                }
            })
        }
    },
}
</script>
<style scoped>

</style>