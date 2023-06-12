<template lang="">
    <div>
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

            </div>
            <div class="about-item">

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
    .about-box{
        width: 100%;
        /* height: 100%; */
        box-sizing: border-box;
        /* padding: 0 20%; */
        background-color: antiquewhite;
    }
    .about-head-box{
        width: 100%;
        height: 400px;
        /* background-color: ; */
        display: flex;
        justify-content: center;
        background: url('../assets/cool-background.png');
    }
    .about-head{
        width: 100%;
        height: 100%;
        padding: 0 20%;
        position: relative;
        display: flex;
    }
    .about-head-img{
        /* position: absolute; */
        top: 50%;
        transform: translateY(-50%);
        /* left: 60%; */
        width: 30%;
        height: 50%;
        position: relative;
        /* right: 20%; */
    }
    .about-head-img img{
        width: 100%;
        height: 100%;
    }
    .about-head-main{
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .about-head-main span{
        font-size: 30px;
        font-weight: 700;

    }
    .about-head-intro{
        width: 80%;
        padding: 20px 0;
        font-size: 18px;
    }
</style>