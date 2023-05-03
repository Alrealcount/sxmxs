<template lang="">
    <div>
        控制台主页
        <div>
            <!-- <StatuLight></StatuLight> -->
        </div>
        <div>
            <ThreadTable></ThreadTable>
        </div>
        <div>
            <UserInfo></UserInfo>
        </div>
    </div>
</template>
<script>
// import StatuLight from "../components/main/StatuLight.vue"
import ThreadTable from "../components/main/ThreadTable.vue"
import UserInfo from "../components/main/UserInfo.vue"
export default {
    components:{
        // StatuLight,
        ThreadTable,
        UserInfo
    },
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