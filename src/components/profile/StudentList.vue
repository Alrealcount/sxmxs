<template lang="">
    <div style="padding: 20px;">
        <div class="student-box">
            <div slot="header" class="clearfix">
                <span>学生列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addStudent">添加</el-button>
            </div>
            <div class="student-box-tip">
                <el-alert title="@ 点击下方卡片可对对象监听状态进行更改" type="info" close-text="知道了" style="color: rgb(26, 115, 240);background-color: rgba(224, 224, 251, 0.463);">
                </el-alert>
            </div>
            <div style="max-height: 800px;overflow-y: scroll;width: 100%;margin-bottom: 20px;">
                <div class="add-student-tab" id="add-student-tab">
                    <el-form :model="newStu" label-width="80px" label-position="left" style="padding: 10px 0;">
                        <el-form-item label="昵称">
                            <el-input v-model="newStu.notes"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ号">
                            <el-input v-model="newStu.qqNumber"></el-input>
                        </el-form-item>
                    </el-form>
                    <div style="width: 100%;display: flex;
                    justify-content: center;transform: translateY(-15px);">
                        <el-button type="primary" style="width: 100px;" @click="addStuData">添加</el-button>
                        <el-button style="width: 100px;" @click="addStudent">取消</el-button>
                    </div>
                </div>
                <!-- <el-skeleton :rows="16" animated /> -->
                <el-card v-for="(item,id) in stuList" :key="id" class="box-card" shadow="hover" style="margin-top: 20px;">
                    <div class="text item" @click="setStatus(item)">
                        <div class="avatar">
                            <img src="" alt="">
                            <!-- <i class="el-icon-user" style="font-size: 40px;"></i> -->
                        </div>
                        <el-descriptions column="1" style="width: 350px;background-color: transparent !important">
                            <el-descriptions-item label="备注名">{{item.notes}}</el-descriptions-item>
                            <!-- <el-descriptions-item label="选中状态">{{item.selected?'是':'否'}}</el-descriptions-item> -->
                            <el-descriptions-item label="QQ号">{{item.qqNumber}}</el-descriptions-item>
                        </el-descriptions>
                        
                        <div class="student-option">
                            <div class="option-span">
                                <span style="transform: translate(5px,-5px);color: rgba(4, 127, 158, 0.658);">修改</span>
                                <span style="transform: translate(5px,5px);color: rgba(186, 131, 4, 0.508);">删除</span>
                            </div>
                            <div>
                                <div class="re-set-notes">
                                    <input type="text" placeholder="点此更改昵称" v-on:click.stop="stopMaopao">
                                </div>
                                <el-button style="margin-left: 0;" @click="reSetInfo(item,$event)" v-on:click.stop="stopMaopao"></el-button>
                            </div>
                            <template>
                                <el-popconfirm confirm-button-text='是' cancel-button-text='不用了' icon="el-icon-info"
                                    icon-color="red" @confirm="deleteBtn(item)" title="确认删除该学生信息？">
                                    <el-button slot="reference" v-on:click.stop="stopMaopao"></el-button>
                                </el-popconfirm>
                            </template>
                            
                        </div>
                    </div>
                    <div :class="[item.selected?'back-i-right':'back-i-wrong']">
                        <i :class="[item.selected?'el-icon-check':'el-icon-close']"></i>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
    // import Ava from "../assets/js/getAvatar.js"
    import "../../assets/style/global.css"

    export default {
        name: 'StudentList',
        data() {
            return {
                stuList: [],
                // map: Ava.getAvatar(this.map),
                newStu:{
                    notes:'',
                    qqNumber:''
                }
            }
        },
        mounted() {
            // console.log(this.map)
            this.getStuList()
            this.updateAvatar()
        },
        methods: {
            getStuList() {
                this.$axios({
                    url: 'http://api.pi1grim.top/ea/api/v3/student',
                    method: 'get',
                    headers: {
                        token: sessionStorage.getItem('token')
                    }
                }).then(({ data }) => {
                    console.log(data)
                    if (data.code === 2035) {
                        this.stuList = data.data
                        this.stuList.reverse()
                    } else {
                        this.$message(`${data.message}`)
                    }

                })
            },
            updateAvatar() {

            },
            setStatus(item) {
                console.log(item, '修改')
                let i = 0
                if(item.selected){
                    i=-1
                }else{
                    i=1
                }
                item.selected = !item.selected
                this.$axios({
                    url: 'http://api.pi1grim.top/ea/api/v3/student',
                    method: 'put',
                    data: {
                        students: [item]
                    },
                    headers: {
                        token: sessionStorage.getItem('token')
                    }
                }).then(({ data }) => {
                    console.log(data)
                    let stu = sessionStorage.getItem('stu')
                    if(i===1){
                        stu++
                    }else{
                        stu--
                    }
                    sessionStorage.removeItem('stu')
                    sessionStorage.setItem('stu', stu)
                })
            },
            addStudent() {
                var addTab = document.getElementById('add-student-tab')
                if(addTab.style.display === 'block'){
                    addTab.style.display = 'none'
                    // addTab.style.animation = 'flip-out-hor-top 0.45s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;'
                }else{
                    addTab.style.display = 'block'
                    // addTab.style.animation = 'fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
                }
                
            },
            addStuData(){
                if(this.newStu.qqNumber!='' && this.newStu.notes!=''){
                    this.$axios({
                        url: 'http://api.pi1grim.top/ea/api/v3/student',
                        method: 'post',
                        data: {
                            qqNumber: this.newStu.qqNumber,
                            notes: this.newStu.notes
                        },
                        headers: {
                            token: sessionStorage.getItem('token')
                        }
                    }).then(({ data }) => {
                        console.log(data)
                        if(data.code===2030){
                            this.newStu.qqNumber = ''
                            this.newStu.notes = ''
                            this.$message({
                                message: '学生添加成功!',
                                type: 'success'
                            })
                            this.stuList.push(data.data)
                        }else{
                            this.$message({
                                message: `${data.message}`,
                                type: 'warning'
                            });
                        }
                    })
                }else{
                    this.$message({
                        message:'请填入所需信息！',
                        type: 'warning'
                    })
                }
            },
            deleteBtn(item) {
                console.log(item)
                this.$axios({
                    url: 'http://api.pi1grim.top/ea/api/v3/student',
                    method: 'delete',
                    data: {
                        students: [
                            {
                                id: item.id,
                                qqNumber: item.qqNumber,
                                notes: item.notes,
                                selected: item.selected
                            }
                        ]
                    },
                    headers: {
                        token: sessionStorage.getItem('token')
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$message({
                            message: '学生信息删除成功!',
                            type: 'success'
                        });
                        this.getStuList()
                    }
                })
            },
            reSetInfo(item,e) {
                let parent = e.target.parentNode.children[0]
                let obj = parent.children[0]
                console.log(item)
                if(obj.value != ''){
                    this.$axios({
                        url: 'http://api.pi1grim.top/ea/api/v3/student',
                        method: 'put',
                        data: {
                            students: [
                                {
                                    id: item.id,
                                    qqNumber: item.qqNumber,
                                    notes: obj.value,
                                    selected: item.selected
                                }
                            ]
                        },
                        headers: {
                            token: sessionStorage.getItem('token')
                        }
                    }).then(({ data }) => {
                        console.log(data)
                        if (data.code === 2040) {
                            this.$message({
                                message: '学生信息修改成功!',
                                type: 'success'
                            });
                            this.getStuList()
                            obj.value = ''
                        }else{
                            this.$message({
                                message: `${data.message}`,
                                type: 'warning'
                            });
                        }
                    })
                }else{
                    this.$message({
                        message: '请填入修改后的昵称!',
                        type: 'warning'
                    })
                } 
            }
        },

    }
</script>
<style scoped>
    ::-webkit-scrollbar {
        width: 8px; 
        height: 8px;
    }
    /* /滚动条的滑块 */
    ::-webkit-scrollbar-thumb {
        background-color: #eaecf1;
        border-radius: 3px;
    }
    .student-box {
        width: 100%;
        /* border-radius: 40px; */
        border: 1px solid rgb(169, 169, 169);
        /* border-right    : 0; */
        padding: 20px;
        /* background-color: white; */
        background-color: rgba(255, 255, 255, 0.655);
        min-height: 600px;
        box-shadow: 0 0px 2px 0 rgba(0,0,0,.25);
        /* max-height: 800px; */
        /* overflow-y: auto; */
    }
    .text {
        font-size: 14px;
    }

    .item {
        /* in-bottom: 18px; */
        display: flex;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        padding: 12px 20px;
        z-index: 9;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .clearfix {
        padding: 20px;
        border-bottom: 1px solid rgb(243, 242, 242);
        margin-bottom: 5px;
        padding-top: 0;
        /* font-weight: 600; */
        display: block;
    }

    .box-card {
        /* width: 480px; */
        height: 80px;
        margin-bottom: 5px;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        -webkit-animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }

    .box-card:hover .back-i-right {
        opacity: 0.5;
    }

    .box-card:hover .back-i-wrong {
        opacity: 0.5;
    }

    .back-i-right {
        margin: 0;
        left: 0;
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgb(185, 250, 191);
        opacity: 0.1;
        transition: .5s;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .option-span span{
        text-align: center;
    }
    .back-i-right-enter,
    .back-i-right-enter-active {
        -webkit-animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }

    .re-set-notes {
        position: absolute;
        right: 80px;
        top: 10px;
    }

    .re-set-notes input {
        background-color: transparent;
        outline: none;
        border-width: 0;
        height: 26px;
        /* background-color: rgb(184, 250, 192); */
        /* opacity: 0.5; */
        /* border: 1px solid rgb(225, 224, 224); */
        border-radius: 16px;
    }

    .back-i-wrong {
        margin: 0;
        left: 0;
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgb(243, 192, 175);
        opacity: 0.1;
        transition: .5s;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .back-i-right i {
        font-size: 80px;
        color: rgb(30, 244, 30);
        -webkit-animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }

    .back-i-wrong i {
        font-size: 80px;
        color: rgb(248, 64, 44);
        -webkit-animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }

    .avatar {
        width: 40px;
        height: 40px;
        /* border-radius: 40px; */
        /* border: 1px solid black; */
    }

    .student-option {
        top: 0;
        right: 0;
        height: 80px;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        z-index: 9;
    }

    .student-option .el-button {
        /* border-radius: 13px !important; */
        width: 60px !important;
        height: 40px !important;
        z-index: 9;
        opacity: 0;
        /* transform: translateY(-50%); */
        /* padding: 0; */
    }

    .student-option .option-span {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-weight: 900;
        /* align-items: center; */
    }

    .add-student-tab {
        display: none;
        width: 100%;
        height: 180px;
        padding: 0 20px;
        border-radius: 0 0 40px 40px;
        padding-bottom: 0px;
        border: 1px solid rgb(243, 242, 242);
        border-top: 0px;
        /* -webkit-animation: fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both; */
        animation: fade-in-top 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }
    .student-box-tip{
        width: 100%;
        /* height: 100px; */
    }
    /* ----------------------------------------------
 * Generated by Animista on 2023-5-3 9:54:35
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

    /**
 * ----------------------------------------
 * animation fade-in-top
 * ----------------------------------------
 */
    @-webkit-keyframes fade-in-top {
        0% {
            -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
            opacity: 0;
        }

        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes fade-in-top {
        0% {
            -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
            opacity: 0;
        }

        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
        }
    }
    /* ----------------------------------------------
 * Generated by Animista on 2023-5-3 13:41:28
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation flip-out-hor-top
 * ----------------------------------------
 */
@-webkit-keyframes flip-out-hor-top {
  0% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateX(70deg);
            transform: rotateX(70deg);
    opacity: 0;
  }
}
@keyframes flip-out-hor-top {
  0% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateX(70deg);
            transform: rotateX(70deg);
    opacity: 0;
  }
}

</style>