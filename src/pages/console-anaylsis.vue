<template lang="">
    <div>
        <BackGround></BackGround>
        <loadBox></loadBox>
        数据分析
        <div>
            <router-link :to="{name:'总览'}">总览</router-link>
            <router-link :to="{name:'深度搜索'}">深度搜索数据</router-link>
            <router-link :to="{name:'实时监听'}">实时监听数据</router-link>
        </div>
        <div>
            <router-view name="path"></router-view>
        </div>
    </div>
</template>
<script>
import BackGround from "../components/BackGround.vue"
import LoadBox from "../components/main/LoadBox.vue"

export default {
    components:{
        BackGround,
        LoadBox
    },
    data() {
        return {
            tableData:[]
        }
    },
    mounted() {
        this.getTableData()
    },
    methods: {
        getTableData(){
            this.$axios({
                url:'http://api.pi1grim.top/ea/api/v3/result',
                method:'GET',
                headers:{
                    token:sessionStorage.getItem('token')
                }
            }).then(({data})=>{
                console.log(data)
            })
        }
    },
}
</script>
<style scoped>
    
</style>