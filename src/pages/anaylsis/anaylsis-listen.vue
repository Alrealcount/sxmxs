<template lang="">
    <div>
        <BackGround></BackGround>
        <loadBox></loadBox>
        <div style="padding: 20px 20px;">
            <div class="anaylsis-overflow-header">
                <span>实时监听</span>
                <div style="font-size: 12px;font-weight: 400;font-style: italic;"><span>f00867df</span></div>
            </div>
            <div class="listen-table-box">
                <div class="listen-table-charts">
                    <el-card class="box-card" shadow="never"
                        style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);height: 100%;">
                        <div slot="header" class="clearfix">
                            <span>图表1</span>
                        </div>
                        <div class="chart-box">
                            <OverDeep :averageData.sync="averageData" :noteData.sync="noteData" :isArray="false"></OverDeep>
                        </div>
                    </el-card>
                </div>
                <div class="listen-table-list">
                    <div class="list-box">
                        <listenList></listenList>
                    </div>
                </div>
            </div>
            <div class="overTable">
                <el-card class="box-card" shadow="never"
                    style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);height: 100%;">
                    <div slot="header" class="clearfix">
                        <span>表格总览</span>
                        <div class="table-option">
                            <el-select v-model="type" style="padding: 20px 5px;">
                                <el-option v-for="item in types" :key="item.id" :label="item.value" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="clearfix-body">
                        <tableCom :tableData.sync="listenData" :type.sync="type"></tableCom>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
import BackGround from "../../components/BackGround.vue"
import LoadBox from "../../components/main/LoadBox.vue"
import tableCom from "../../components/anaylsis/tableCom.vue"
import listenList from "../../components/anaylsis/listenList.vue"
import OverDeep from "../../components/anaylsis/overDeep.vue"
import {mapState} from 'vuex'
export default {
    components: {
        BackGround,
        LoadBox,
        tableCom,
        listenList,
        OverDeep
    },
    data() {
        return {
            types: [{
                value: '良好'
            }, {
                value: '轻度消极'
            }, {
                value: '中度消极'
            }, {
                value: '重度消极'
            }, {
                value: '全部'
            }],
            type: [],
            averageData:[],
            noteData:[]
        }
    },
    computed: {
        ...mapState(['listenData']),
    },
    mounted() {
        // this.$bus.$on('getListenData', (data) => {
        //     this.ListenData = data
        // })
        this.getAverange()
        this.getNotes()
    },
    activated() {
        
    },
    watch: {
        listenData(cur){
            if(cur){
                this.getAverange()
                this.getNotes()
            }
        }
    },
    methods: {
        getAverange() {
            console.log(this.$store.getters.LisOverMap)
            this.averageData = []
            this.$store.getters.LisOverMap.forEach(ele => {
                // console.log(ele)
                let ave = 0
                for (let i = 0; i < ele.length; i++) {
                    // console.log(ele[i].score)
                    ave += ele[i].score
                }
                // console.log(ave)
                this.averageData.push(Math.floor(ave / ele.length * 100) / 100)
            });
        },
        getNotes() {
            this.noteData = Array.from(this.$store.getters.LisOverMap.keys())
            // console.log(this.noteData)
        },
    },
}
</script>
<style scoped>
.anaylsis-overflow-header{
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
.anaylsis-overflow-header span{
    z-index: 100;
}
.clearfix{
    height: 30px;
    font-weight: 600;
}
.overTable{
    height: 600px;
    position: relative;
}
.table-option{
    padding-left: 30px;
}
.clearfix-body{
    height: 534px;
    position: relative;
}
.listen-table-box{
    display: flex;
    width: 100%;
    height: 500px;
    margin-bottom: 20px;
}
.listen-table-charts{
    width: 60%;
    padding-right: 10px;
    /* background-color: aliceblue; */
}
.listen-table-list{
    width: 40%;
    padding-left: 10px;
    /* background-color: aqua; */

}
.chart-box{
    width: 100%;
    height: 374px;
    position: relative;
    display: flex;
}
.list-box{
    width: 100%;
    height: 100%;
}

</style>