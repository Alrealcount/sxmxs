<template lang="">
    <div style="z-index: 100;position: relative;">
        <div class="thread-table-header">
            <div class="thread-table-heade-item">
                <div>
                    <span>活动线程</span>
                </div>
                <span>54</span>
            </div>
            <div class="thread-table-heade-item">
                <div>
                    <span>活动线程</span>
                </div>
                <span>68</span>
            </div>
            <div class="thread-table-heade-item">
                <div>
                    <span>线程峰值</span>
                </div>
                <span>68</span>
            </div>
        </div>
        <div id="thread-table">

        </div>
    </div>
</template>
<script>
import * as echarts from "echarts"
import "../../assets/js/roma.project.json"

export default {
    name:'ThreadTable',
    data() {
        return {
            threadData:[],
            min:'',
            max:'',
            guardTimes:[],
            activityTimes:[],
            status:0,
            mintime:''
        }
    },
    mounted() {
        this.myChart = echarts.init(document.getElementById('thread-table'), 'roma.project')
        this.mintime = Date.parse(new Date())
        console.log(this.mintime)
        this.guardTimes.push([this.mintime, 40])
        this.activityTimes.push([this.mintime, 0])
        this.echartsInit()
        this.updataEchart(this.status)
        console.log(this.myChart)
        window.addEventListener("resize", () => {
            // console.log(this.myChart)
            // this.myChart.resize();
            console.log(this)
            if (this.myChart)
                this.myChart.resize()
        })
    },
    methods: {
        updataEchart(status){
            setInterval(() => {
                this.readTimeData(status)
                this.echartsInit()
            }, 5000)
        },
        readTimeData(status){
            let timestamp = Date.parse(new Date());
            let timeory,timeory_act
            switch (status) {
                case 0:
                    timeory = 280 - Math.floor(Math.random() * 10);
                    timeory_act = 300 - Math.floor(Math.random() * 10);
                    break;
                case 1:
                    timeory = Math.floor(Math.random() * 10 + 300);
                    timeory_act = Math.floor(Math.random() * 30 + 310);
                    break;
                case 2:

                    break;
                default:
                    break;
            }
            this.guardTimes.push([timestamp,timeory]);
            this.activityTimes.push([timestamp,timeory_act])
        },
        echartsInit() {
            this.myChart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['活动线程', '守护进程']
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'time',
                    min: this.mintime,
                    // max: this.max,
                    show: true,
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name:'活动线程',
                    symbol: "none",
                    data: this.guardTimes,
                    type: 'line',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    }
                },{
                    name:'守护进程',
                    symbol: "none",
                    data: this.activityTimes,
                    type: 'line',
                    // showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(120, 20, 220, 0.8)'
                    }
                }]
            },{
                notMerge: false,
                lazyUpdate: true,
                silent: false
            })
        }
    },
}
</script>
<style scoped>
#thread-table{
    width: 100%;
    height: 400px;
    /* margin: 20px; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.thread-table-header{
    display: flex;
    justify-content: space-around;
    padding: 20px;
}
.thread-table-heade-item{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.thread-table-heade-item div span{
    font-weight: 600;
}
</style>