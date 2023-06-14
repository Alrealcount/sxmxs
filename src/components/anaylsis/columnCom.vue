<template lang="">
    <div style="position: relative;height: 100%;width: 100%;">
        <div id="bar-table">

        </div>
        <div>

        </div>
        <!-- <div><button @click="getStuList">获取信息</button></div> -->
    </div>
</template>
<script>
    import theme from "../../assets/wonderland.json"
    import * as echarts from "echarts"
    export default {
        name: 'columnCom',
        props: ['averageData', 'noteData', 'isArray'],
        data() {
            return {

            }
        },
        mounted() {
            // this.dataControl()
            echarts.registerTheme("slef-theme", theme)
            console.log('1111', this.averageData)
            this.myChart = echarts.init(document.getElementById('bar-table'), "slef-theme")
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
                const series = []
                let xAxis = {}
                if (this.isArray) {
                    for (let item in this.averageData) {
                        series.push({
                            name: `${this.noteData[item]}`,
                            symbol: "none",
                            data: this.averageData[item],
                            type: 'line',
                            showBackground: true
                        })
                    }
                    xAxis = {
                        type: 'category',
                        show: true,
                        boundaryGap: false, // 不留白，从原点开始
                    }
                } else {
                    series.push({
                        name: '',
                        symbol: "none",
                        data: this.averageData,
                        type: 'bar',
                        showBackground: true
                    })
                    xAxis = {
                        type: 'category',
                        show: true,
                        // boundaryGap: false, // 不留白，从原点开始
                        data: this.noteData
                    }
                }
                console.log(series)
                // const series = 
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
                    legend: {
                        data: this.noteData
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '0%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: xAxis,
                    yAxis: {
                        name: '心情指数',
                        type: 'value'
                    },
                    series: series
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
    #bar-table {
        width: 100%;
        height: 100%;
    }
</style>