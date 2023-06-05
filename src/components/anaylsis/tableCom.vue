<template lang="">
    <div>
        <el-table stripe ref="multipleTable" tooltip-effect="dark"
            :data="tableData_view.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 99%;margin-left: .4rem;margin-top: .4rem;
            " height="492">
            <!-- <el-table-column type="selection" width="55" align="center" fixed>
            </el-table-column> -->
            <el-table-column prop="qqNumber" label="QQ账号" width="200" fixed></el-table-column>
            <el-table-column prop="notes" label="备注名" width="200"></el-table-column>
            <el-table-column prop="content" label="发言" width="600"></el-table-column>
            <el-table-column prop="score" label="消极指数" width="200"></el-table-column>
            <el-table-column prop="status" label="状态" width="200"></el-table-column>
            <el-table-column prop="postTime" label="发言时间" width="200"></el-table-column>
            <!-- <el-table-column prop="ad" label="建议" width="200"></el-table-column> -->
            <el-table-column label="操作" width="180" fixed="right">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="deleteRow(scope.$index, tableData)"
                        style="margin-left: 10px;font-size: 14px;background-color: #FFEDED;color: #FF6349;">delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[5,7,10]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name: 'tableCom2',
        props: ['tableData', 'type'],
        data() {
            return {
                currentPage: 1,
                currentIndex: '',
                pagesize: 7,
                tableData_view: [],
            }
        },
        mounted() {
            this.tableData_view = this.tableData
            // console.log(this.type)
        },
        watch: {
            tableData(curVal, oldVal) {
                console.log(oldVal)
                if (curVal) {
                    this.tableData_view = curVal
                }
            },
            type(curVal) {
                if (curVal) {
                    // console.log(this.type)
                    this.selectDoctor()
                }
            }
        },
        methods: {
            selectDoctor() {
                console.log(this.type)
                this.tableData_view = this.tableData.filter((item) => {
                    return item.status === this.type
                })
                if (this.type === '全部') this.tableData_view = this.tableData
                // console.log(tableData_view)
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val
            },
        },
    }
</script>
<style scoped>

</style>