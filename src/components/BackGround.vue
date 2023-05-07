<template lang="">
    <div style="position: absolute;width: 100%;height: 200px;overflow: hidden;z-index: -10;">
        <div class="console-box-background">
            <div style="opacity: 0.2;" class="background-color-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#4FFABC" fill-opacity="1"
                        d="M0,192L40,170.7C80,149,160,107,240,106.7C320,107,400,149,480,192C560,235,640,277,720,250.7C800,224,880,128,960,96C1040,64,1120,96,1200,106.7C1280,117,1360,107,1400,101.3L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z">
                    </path>
                </svg>
            </div>
            <div class="background-color-item" style="opacity: 0.3;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#4FFABC" fill-opacity="1"
                        d="M0,192L40,192C80,192,160,192,240,186.7C320,181,400,171,480,138.7C560,107,640,53,720,64C800,75,880,149,960,186.7C1040,224,1120,224,1200,197.3C1280,171,1360,117,1400,90.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z">
                    </path>
                </svg>
            </div>
            <div class="background-color-item" style="opacity: 0.2;transform: translate(5%,-50%);">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#4FFABC" fill-opacity="1"
                        d="M0,0L40,5.3C80,11,160,21,240,42.7C320,64,400,96,480,128C560,160,640,192,720,197.3C800,203,880,181,960,186.7C1040,192,1120,224,1200,224C1280,224,1360,192,1400,176L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z">
                    </path>
                </svg>
            </div>
            <div class="background-color-item" style="opacity: 0.1;transform: translate(0,-50%);">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#4FFABC" fill-opacity="1"
                        d="M0,224L40,234.7C80,245,160,267,240,245.3C320,224,400,160,480,149.3C560,139,640,181,720,170.7C800,160,880,96,960,106.7C1040,117,1120,203,1200,213.3C1280,224,1360,160,1400,128L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z">
                    </path>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'BackGround',
    data() {
        return {
            
        }
    },
}
</script>
<style scoped>
.console-box-background{
    width: 100%;
    position: fixed;
    z-index: 99;
    pointer-events: none;
}
.background-color-item{
    width: 100%;
    position: absolute;
    transform: translateY(-45%);
}
</style>