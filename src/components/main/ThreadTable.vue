<template lang="">
    <div>
        <div id="thread-table">

        </div>
    </div>
</template>
<script>
import * as echarts from "echarts"
export default {
    name:'ThreadTable',
    data() {
        return {
            threadData:[],
            min:'',
            max:'',
            xy:[]
        }
    },
    mounted() {
        this.echartsInit()
    },
    methods: {
        echartsInit() {
            echarts.init(document.getElementById('thread-table')).setOption({
                xAxis: {
                    type: 'time',
                    // min: this.min,
                    // max: this.max,
                    show: true,
                    minInterval: 60,
                    axisLabel: {
                        show: true,
                        showMaxLabel: true,
                        showMinLabel: true,
                        formatter: '{MM}/{dd} {HH}:{mm}',
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.xy,
                    type: 'line',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    }
                }]
            })
        }
    },
}
</script>
<style scoped>
#thread-table{
    width: 1400px;
    height: 400px;
}
</style>