<template lang="">
    <div>
        <BackGround></BackGround>
        <loadBox></loadBox>
        overflow
    </div>
</template>
<script>
import BackGround from "../../components/BackGround.vue"
import LoadBox from "../../components/main/LoadBox.vue"
export default {
    components: {
        BackGround,
        LoadBox
    },
    data() {
        return {
            tableData: [],
            deepData:[],
            listenData:[]
        }
    },
    mounted() {
        this.getTableData()
    },
    activated() {
        this.getTableData()
    },
    methods: {
        getTableData() {
            this.$axios({
                url: 'http://api.pi1grim.top/ea/api/v3/result',
                method: 'GET',
                headers: {
                    token: sessionStorage.getItem('token')
                }
            }).then(({ data }) => {
                this.tableData = data.data
                console.log(this.tableData)
                
            })
        }
    },
}
</script>
<style lang="">
    
</style>