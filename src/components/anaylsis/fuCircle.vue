<template lang="">
    <div style="position: relative;height: 100%;width: 100%;">
        <div id="dep-circle">

        </div>
    </div>
</template>
<script>
    import theme from "../../assets/wonderland.json"
    import * as echarts from "echarts"
    export default {
        name: 'tableCircle',
        props: ['averageData', 'noteData'],
        data() {
            return {
                circle_data: []
            }
        },
        mounted() {
            echarts.registerTheme("slef-theme", theme)
            this.myChart = echarts.init(document.getElementById('dep-circle'), "slef-theme")
            this.getCircleData()
            window.addEventListener("resize", () => {
                // console.log(this)
                if (this.myChart)
                    this.myChart.resize()
            })
        },
        watch: {
            noteData: {
                handler(curVal) {
                    if (curVal) {
                        this.getCircleData()
                    }
                }
            }
        },
        methods: {
            echartsInit() {
                console.log(this.circle_data)
                this.myChart.setOption({
                    tooltip: {
                        show: true,
                        trigger: "item",
                        // backgroundColor: "#1677FF",
                        // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
                        formatter: "{a}:{b}<br/>{c}分({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',      //可设定图例在左、右、居中
                        y: 'top',     //可设定图例在上、下、居中
                        padding: [0, 10, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                        data: this.noteData
                    },
                    series: [
                        {
                            name: '备注名',
                            type: 'pie',
                            // 数组的第一项是内半径，第二项是外半径；可以设置不同的内外半径显示成圆环图
                            radius: ['0','70%'],
                            // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标；设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
                            center: ['50%', '50%'],
                            data: Array.from(this.circle_data),
                        }
                    ]
                })
            },
            getCircleData() {
                console.log(this.averageData, this.noteData)
                this.circle_data = []
                for (let i = 0; i < this.noteData.length; i++) {
                    let data_init = {
                        name: this.noteData[i],
                        value: this.averageData[i]
                    }
                    this.circle_data.push(data_init)
                }
                console.log(this.circle_data)
                this.echartsInit()
            }
        },
    }
</script>
<style scoped>
    #dep-circle {
        width: 502px;
        height: 374px;
    }
</style>