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
                    <span>休眠线程</span>
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
    props: ['status'],
    data() {
        return {
            threadData:[],
            min:'',
            max:'',
            guardTimes:[],
            activityTimes:[],
            mintime:'',
            crawStatus:0
        }
    },
    watch: {
        status(curVal,oldVal){
            console.log(oldVal,curVal)
            this.crawStatus = this.changeType(curVal)
            console.log('改变状态:',this.crawStatus)
        }
    },
    mounted() {
        this.myChart = echarts.init(document.getElementById('thread-table'), 'roma.project')
        this.mintime = Date.parse(new Date())
        // console.log(this.mintime)
        this.guardTimes.push([this.mintime, 0])
        this.activityTimes.push([this.mintime, 0])

        this.echartsInit()

        this.updataEchart()
        // setInterval(this.updataEchart(this.crawStatus),5000)
        // console.log(this.myChart)

        window.addEventListener("resize", () => {
            // console.log(this)
            if (this.myChart)
                this.myChart.resize()
        })
    },
    methods: {
        updataEchart(){
            setInterval(()=>{
                // console.log(this.crawStatus)
                this.readTimeData(this.crawStatus)
                this.echartsInit()
            },3000)
        },
        changeType(str){
            switch(str){
                case 'NOT_CREATED':
                    return 0;
                case 'OFFLINE':
                    return 1;
                case 'LEAVE_UNUSED':
                    return 2;
                case 'DEEP_SEARCH':
                    return 3;
                default:
                    return 4;
            }
        },
        readTimeData(status){
            // console.log(status)
            let timestamp = Date.parse(new Date());
            let timeory,timeory_act
            switch (status) {
                case 0:
                    timeory = 0;
                    timeory_act = 0;
                    break;
                case 1:
                    timeory = Math.floor(Math.random() * 3 + 10);
                    timeory_act = Math.floor(Math.random() * 3 + 15);
                    break;
                case 2:
                    timeory = Math.floor(Math.random() * 3 + 30);
                    timeory_act = Math.floor(Math.random() * 3 + 38);
                    break;
                case 3:
                    timeory = Math.floor(Math.random() * 5 + 50);
                    timeory_act = Math.floor(Math.random() * 5 + 55);
                    break;
                default:
                    timeory = Math.floor(Math.random() * 5 + 40);
                    timeory_act = Math.floor(Math.random() * 5 + 45);
                    break;
            }
            this.guardTimes.push([timestamp,timeory]);
            this.activityTimes.push([timestamp,timeory_act])
        },
        echartsInit() {
            this.myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
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
    }
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