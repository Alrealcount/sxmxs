<template lang="">
    <div style="position: relative;height: 100%;width: 100%;">
        <div id="deep-table">

        </div>
        <div>

        </div>
        <!-- <div><button @click="getStuList">获取信息</button></div> -->
    </div>
</template>
<script>
    import * as echarts from "echarts"
    export default {
        name: 'OverDeep',
        props: ['averageData', 'noteData'],
        data() {
            return {
                
            }
        },
        mounted() {
            // this.dataControl()
            this.myChart = echarts.init(document.getElementById('deep-table'))
            setTimeout(() => {
                this.echartsInit()
            }, 0)
            window.addEventListener("resize", () => {
                // console.log(this)
                if (this.myChart)
                    this.myChart.resize()
            })
        },
        watch: {
            averageData(oldVal, curVal) {
                console.log('监听到更改')
                console.log(oldVal, curVal)
                if (curVal) {
                    this.echartsInit()
                }
            }
        },
        methods: {
            echartsInit() {
                console.log(this.noteData, this.averageData)
                this.myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        },
                        orient: 'vertical',
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        },
                    },
                    grid: {
                        left: '0%',
                        right: '3%',
                        bottom: '0%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        show: true,
                        boundaryGap: false, // 不留白，从原点开始
                        data: this.noteData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name: '',
                        symbol: "none",
                        data: this.averageData,
                        type: 'line',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(220, 220, 220, 0.8)'
                        }
                    }]
                }, {
                    notMerge: false,
                    lazyUpdate: true,
                    silent: false
                })
            }
        },
    }
</script>
<style scoped>
    #deep-table {
        width: 100%;
        height: 100%;
    }
</style>