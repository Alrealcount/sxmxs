<template lang="">
    <div>
        <BackGround></BackGround>
        <loadBox></loadBox>
        <div style="padding: 0 20px;padding-top: 20px;">
            <div class="anaylsis-overflow-header">
                <span>数据概览</span>
                <div style="font-size: 12px;font-weight: 400;font-style: italic;"><span>f00867df</span></div>
            </div>
            <div class="chart-box">
                <div class="line-chart">
                    <el-card class="box-card" shadow="never"
                        style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);height: 100%;">
                        <div slot="header" class="clearfix">
                            <span>图表1</span>
                        </div>
                        <div class="clearfix-two">
                            <fuCircle :averageData.sync="averageData" :noteData.sync="noteData"></fuCircle>
                        </div>
                    </el-card>
                </div>
                <div class="line-chart center">
                    <el-card class="box-card" shadow="never"
                        style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);height: 100%;">
                        <div slot="header" class="clearfix">
                            <span>图表2</span>
                        </div>
                        <div class="clearfix-two">
                            <tableCircle :averageData.sync="averageData" :noteData.sync="noteData"></tableCircle>
                        </div>
                    </el-card>
                </div>
                <div class="line-chart right">
                    <el-card class="box-card" shadow="never"
                        style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);height: 100%;">
                        <div slot="header" class="clearfix">
                            <span>图表3</span>
                        </div>
                        <div class="clearfix-two">
                            <RadioCom :noteData.sync="noteData"></RadioCom>
                        </div>
                    </el-card>
                </div>
            </div>
            <div class="chart-box">
                <div class="two-chart">
                    <el-card class="box-card" shadow="never"
                        style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);height: 100%;">
                        <div slot="header" class="clearfix">
                            <span>图表1</span>
                        </div>
                        <div class="clearfix-two">
                            <OverDeep :averageData.sync="averageData" :noteData.sync="noteData" :isArray="false"></OverDeep>
                        </div>
                    </el-card>
                </div>
                <div class="two-chart right">
                    <el-card class="box-card" shadow="never"
                        style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);height: 100%;">
                        <div slot="header" class="clearfix">
                            <span>图表2</span>
                        </div>
                        <div class="clearfix-two">
                            <columnCom :averageData.sync="averageData" :noteData.sync="noteData"></columnCom>
                        </div>
                    </el-card>
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
                        <tableCom :tableData.sync="$store.state.tableData" :type.sync="type"></tableCom>
                        
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
import BackGround from "../../components/BackGround.vue"
import LoadBox from "../../components/main/LoadBox.vue"
import OverDeep from "../../components/anaylsis/overDeep.vue"
import tableCircle from "../../components/anaylsis/tableCircle.vue"
import tableCom from "../../components/anaylsis/tableCom.vue"
import RadioCom from "../../components/anaylsis/RadioCom.vue"
import fuCircle from "../../components/anaylsis/fuCircle.vue"
import columnCom from "../../components/anaylsis/columnCom.vue"

export default {
    components: {
        BackGround,
        LoadBox,
        OverDeep,
        tableCom,
        tableCircle,
        RadioCom,
        fuCircle,
        columnCom
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
            dataTotle:0,
            overMap: new Map(),
            averageData: [],//获取全部平均值
            noteData: [],//获取全部备注名
            // listenData:[]
            pie:['65%'],
            pie_inner:['40%','60%']
        }
    },
    computed: {
        deepData(){
            return this.$store.state.deepData
        }  
    },
    mounted() {
        // this.dataControl()
        this.getAverange()
        this.getNotes()
    }, 
    activated() {

    },
    watch: {
        deepData(cur){
            if(cur){
                this.getAverange()
                this.getNotes()
            }
        }
    },
    methods: {
        tableInit(){

        },
        getAverange() {
            console.log(this.$store.getters.overMap)
            this.averageData = []
            this.$store.getters.overMap.forEach(ele => {
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
            this.noteData = Array.from(this.$store.getters.overMap.keys())
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
    height: 620px;
    position: relative;
    padding-bottom: 20px;
}
.table-option{
    padding-left: 30px;
}
.clearfix-body{
    height: 534px;
    position: relative;
}
.clearfix-two{
    width: 100%;
    height: 374px;
    position: relative;
    overflow-y: hidden;
    overflow-x: scroll;
}
.line-chart{
    width: 33.33%;
    /* margin: 20px 0; */
    padding-right: 10px;
    height: 500px;
    padding-bottom: 20px;
}
.two-chart{
    width: 50%;
    padding-right: 10px;
    height: 500px;
    padding-bottom: 20px;
}
.chart-box{
    width: 100%;
    height: 500px;
    position: relative;
    display: flex;
}
.right{
    padding-right: 0;
    padding-left: 10px;
}
.center{
    margin-left: 10px;
}

</style>