<template lang="">
    <div>
        <div id="radio-table">

        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
import theme from "../../assets/wonderland.json"
export default {
    name:'columnCom',
    data() {
        return {
            
        }
    },
    mounted() {
        echarts.registerTheme("slef-theme", theme)
        this.myChart = echarts.init(document.getElementById('radio-table'), "slef-theme")
        window.addEventListener("resize", () => {
            // console.log(this)
            if (this.myChart)
                this.myChart.resize()
        })
    },
    watch:{

    },
    methods: {
        
    },
}
</script>
<style lang="css">
    
</style>