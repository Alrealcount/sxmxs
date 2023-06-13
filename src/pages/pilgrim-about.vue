<template lang="">
    <div style="height: 100%;
        overflow-y: scroll;">
        <div class="about-box">
            <div class="about-head-box">
                <div class="about-head">
                    <div class="about-head-main">
                        <div class="about-head-title">
                            <span>关于我们</span>
                        </div>
                        <div class="about-head-intro">
                            <p>青岛易软天创网络科技有限公司，专注于为天下企业提供专业的管理解决方案，让每一个成长中的企业都可高效协作。</p>
                        </div>
                    </div>
                    <div class="about-head-img">
                        <img src="../assets/igg.png" alt="">
                    </div>
                </div>
            </div>
            <div class="about-item">
                <div class="about-item-head">
                    <span>
                        队伍简介
                    </span>
                </div>
                <div class="about-item-main">
                    <div>
                        <p>Pirgrim组内成员三名，三人共同努力，希望为用户搭建简洁有效的不同功能体验平台。</p>
                        <p>小组于2023年初成立，为了参与相关的专业比赛，并在此基础上锻炼我们的能力，我们决定成立小组来实现我们的想法。</p>
                        <p>自小组成立以来，我们尝试了不同的项目，在不同的模式下进行网页亦或是小程序的开发。</p>
                        <p>我们的目标不止在这些方面，我们希望在能够相对熟练掌握已有知识的情况下，尝试去学习新的东西，来满足我们的求知欲。</p>
                        <p class="special">任何的收获不是巧合，而是每天的努力与坚持得来的。人生因有梦想，而充满动力。 不怕你每天迈一小步，只怕你停滞不前；不怕你每天做一点事，只怕你无所事事。
                            坚持，是生命的一种毅力！执行，是努力的一种坚持！</p>
                    </div>
                </div>
            </div>
            <div class="about-item-back">
                <div class="about-item">
                    <div class="about-item-head">
                        <span>团队成员</span>
                    </div>
                    <div class="about-item-main group">
                        <span>陈云杰</span>
                        <p>团队队长，负责功能实现的算法部分，为用户提供更加有效，合理的回馈</p>
                        <span>宾俊凯</span>
                        <p>团队成员，负责后端开发，搭建服务器，保存和获取数据，并优化代码以提高网站的响应性</p>
                        <span>王嘉明</span>
                        <p>团队成员，负责前端开发，主要涉及网站，为用户提供简洁，高效的网站设计界面</p>
                    </div>
                </div>
            </div>
            <div class="about-bottom-box">
                <div class="about-bottom-item">
                    <div class="about-bottom-item-head">
                        <span>联系方式</span>
                    </div>
                    <div class="about-bottom-item-main">
                        <div class="main-item">
                            <i class="el-icon-user-solid"></i>
                            <p>ming</p>
                        </div>
                        <div class="main-item">
                            <i class="el-icon-phone"></i>
                            <p>1235646487</p>
                        </div>
                        <div class="main-item">
                            <i class="el-icon-position"></i>
                            <p>2822564634@qq.com</p>
                        </div>
                    </div>
                    <div class="about-bottom-logo">
                        <span>@2023</span>
                        <p>PILGRIM</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {

        },
    }
</script>
<style lang="css">
    .about-box {
        width: 100%;
        box-sizing: border-box;
        /* padding: 0 20%; */
        /* background-color: antiquewhite; */
    }

    .about-head-box {
        width: 100%;
        height: 400px;
        /* background-color: ; */
        display: flex;
        justify-content: center;
        background: url('../assets/cool-background.png');
    }

    .about-head {
        width: 100%;
        height: 100%;
        padding: 0 20%;
        position: relative;
        display: flex;
    }

    .about-head-img {
        /* position: absolute; */
        top: 50%;
        transform: translateY(-50%);
        /* left: 60%; */
        width: 30%;
        height: 50%;
        position: relative;
        /* right: 20%; */
    }

    .about-head-img img {
        width: 100%;
        height: 100%;
    }

    .about-head-main {
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .about-head-main span {
        font-size: 30px;
        font-weight: 700;

    }

    .about-head-intro {
        width: 80%;
        padding: 20px 0;
        font-size: 18px;
    }

    .about-item {
        width: 100%;
        padding: 0 20%;
        padding-bottom: 40px;
    }

    .about-item-head {
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
    }

    .about-item-main p {
        padding: 10px 0;
    }

    .special {
        color: rgb(0, 132, 255);
    }

    .about-item-back {
        width: 100%;
        position: relative;
        background-color: #ECEFF5;
    }
    .group{
        background-color: white;
        padding: 20px;
        border-radius: 16px;
    }
    .group span{
        font-size: 18px;
        font-weight: 700;
    }
    .about-bottom-box{
        width: 100%;
        background-color: #3A3C4F;
        color: white;
    }
    .about-bottom-box{
        padding-left: 20px;
    }
    .about-bottom-item{
        display: flex;
        height: 100px;
        position: relative;
        width: 100%;
        padding: 0 20%;
    }
    .about-bottom-item-head{
        width: 120px;
        color: white;
        height: 100%;
        line-height: 100px;
        padding: 0 20px;
        padding-left: 0;
        border-bottom: 1px solid rgb(169, 169, 169);
        position: relative;
        margin-right: 10px;
    }
    .about-bottom-item-head::after{
        content: '';
        position: absolute;
        top: 41%;
        width: 40px;
        height: 1px;
        background-color: white;
        left: 60%;
        transform:rotate(25deg);
    }
    .about-bottom-item-head::before{
        content: '';
        position: absolute;
        bottom: 41%;
        width: 40px;
        height: 1px;
        background-color: white;
        left: 60%;
        transform:rotate(-25deg);
    }
    .about-bottom-item-main{
        /* margin-top: 20px; */
        display: flex;
        height: 100%;
        align-items: center;
    }
    .main-item{
        display: flex;
        /* width: 140px; */
        margin-right: 20px;
        height: 40px;
        align-items: center;
        color: #B0B1B9;
        line-height: 40px;
    }
    .main-item i{
        margin-right: 20px;
    }
    .main-item p{
        margin-bottom: 0;
    }
    .about-bottom-logo{
        position: absolute;
        right: 20%;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        color: #B0B1B9;
    }
    .about-bottom-logo p{
        margin-left: 10px;
        margin-bottom: 0;
    }
</style>