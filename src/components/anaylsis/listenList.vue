<template lang="">
    <div style="width: 100%;height: 100%;position: relative;">
        <div class="list-form-box">
            <el-card class="box-card" shadow="never"
                style="box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);background-color: rgba(255, 255, 255, 0.655);height: 100%;">
                <div slot="header" class="clearfix">
                    <span>实时列表</span>
                </div>
                <div class="list-form-card-main">
                    <el-table :data="tableData" style="width: 100%;overflow-y: scroll;">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="商品名称">
                                        <span>{{ props.row.name }}</span>
                                    </el-form-item>
                                    <el-form-item label="所属店铺">
                                        <span>{{ props.row.shop }}</span>
                                    </el-form-item>
                                    <el-form-item label="商品 ID">
                                        <span>{{ props.row.id }}</span>
                                    </el-form-item>
                                    <el-form-item label="店铺 ID">
                                        <span>{{ props.row.shopId }}</span>
                                    </el-form-item>
                                    <el-form-item label="商品分类">
                                        <span>{{ props.row.category }}</span>
                                    </el-form-item>
                                    <el-form-item label="店铺地址">
                                        <span>{{ props.row.address }}</span>
                                    </el-form-item>
                                    <el-form-item label="商品描述">
                                        <span>{{ props.row.desc }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品 ID" prop="id">
                        </el-table-column>
                        <el-table-column label="商品名称" prop="name">
                        </el-table-column>
                        <el-table-column label="描述" prop="desc">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:'listenList',

    data() {
        return {
            tableData: [{
                id: '12987122',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987123',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987125',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987126',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }]
        }
    },
    computed: {
        ...mapState(['listenData'])
    },
    mounted() {
        console.log(this.$store.state.listenData)
    },
    methods: {
        
    },
}
</script>
<style lang="css">
    .list-form-box{
        width: 100%;
        height: 100%;
        /* box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 2px 0px; */
    }
    .clearfix{
        height: 30px;
        font-weight: 600;
    }
    .list-form-card-main{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: calc(500px - 67px);
        /* overflow-y: scroll; */
    }
    /* .list-item{
        width: 100%;
        height: 80px;
        padding-bottom: 10px;
        border-bottom: 1px solid black;
        display: flex;
        font-size: 14px;
    }
    .list-item-left{
        width: 60%;
    }
    .left-top{
        display: flex;
    }
    .left-bottom{
        white-space: nowrap; 
        overflow: hidden;
        text-overflow:ellipsis;
    } */
    .demo-table-expand {
    font-size: 0;
    margin-left: 30px;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 80%;
  }
</style>