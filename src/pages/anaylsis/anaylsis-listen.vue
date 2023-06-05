<template lang="">
    <div>
        <BackGround></BackGround>
        <loadBox></loadBox>
        <div style="padding: 0 20px;padding-top: 20px;">
            <div class="anaylsis-overflow-header">
                <span>实时监听</span>
                <div style="font-size: 12px;font-weight: 400;font-style: italic;"><span>f00867df</span></div>
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
                        <tableCom :tableData.sync="ListenData" :type.sync="type"></tableCom>
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
export default {
    components: {
        BackGround,
        LoadBox,
        tableCom
    },
    data() {
        return {
            ListenData:[],
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
        }
    },
    mounted() {
        this.$bus.$on('getListenData', (data) => {
            this.ListenData = data
        })
    },
    activated() {
        
    },
    methods: {
        
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
</style>