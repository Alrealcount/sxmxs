<template lang="">
    <div style="position: relative;height: 100%;width: 100%;">
        <div id="radio-table">

        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
import theme from "../../assets/wonderland.json"
export default {
    name:'RadioCom',
    props: ['noteData'],
    data() {
        return {
            myMap : []
        }
    },
    mounted() {
        echarts.registerTheme("slef-theme", theme)
        this.myChart = echarts.init(document.getElementById('radio-table'), "slef-theme")
        this.getFrequence()
        window.addEventListener("resize", () => {
            // console.log(this)
            if (this.myChart)
                this.myChart.resize()
        })
    },
    watch:{
        noteData: {
            handler(curVal) {
                if (curVal) {
                    this.getFrequence()
                }
            }
        }
    },
    methods: {
        echartsInit(){
            let data = []
            this.myMap.forEach((item,index)=>{
                const f = {
                    value : item,
                    name : this.noteData[index]
                }
                data.push(f)
            })
            console.log(data,this.noteData)
            this.myChart.setOption({
                tooltip: {},
                legend: {
                    show: true,
                    bottom: 5,
                    data: this.noteData
                },
                radar: [{
                    center: ['50%', '50%'],             // 圆中心坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
                    radius: 120,                        // 圆的半径，数组的第一项是内半径，第二项是外半径。
                    startAngle: 90,                     // 坐标系起始角度，也就是第一个指示器轴的角度。[ default: 90 ]
                    name: {                             // (圆外的标签)雷达图每个指示器名称的配置项。
                        formatter: '{value}',
                        textStyle: {
                            fontSize: 14,
                            color: '#000'
                        }
                    },
                    nameGap: 15,                        // 指示器名称和指示器轴的距离。[ default: 15 ]
                    splitNumber: 4,                     // (这里是圆的环数)指示器轴的分割段数。[ default: 5 ]
                    shape: 'circle',                    // 雷达图绘制类型，支持 'polygon'(多边形) 和 'circle'(圆)。[ default: 'polygon' ]
                    axisLine: {                         // (圆内的几条直线)坐标轴轴线相关设置
                        lineStyle: {
                            color: '#fff',                   // 坐标轴线线的颜色。
                            width: 1,                      	 // 坐标轴线线宽。
                            type: 'solid',                   // 坐标轴线线的类型。
                        }
                    },
                    splitLine: {                        // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
                        lineStyle: {
                            color: '#fff',                       // 分隔线颜色
                            width: 2, 							 // 分隔线线宽
                        }
                    },
                    splitArea: {                        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                        show: true,
                        areaStyle: {                            // 分隔区域的样式设置。
                            color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],       // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                        }
                    },
                    indicator: [{               // 雷达图的指示器，用来指定雷达图中的多个变量（维度）,跟data中 value 对应
                        name: '良好',                           // 指示器名称   
                        max: 20,                               // 指示器的最大值，可选，建议设置 
                        //color: '#fff'                           // 标签特定的颜色。
                    }, {
                        name: '轻度消极',
                        max: 3
                    }, {
                        name: '中度消极',
                        max: 3
                    }, {
                        name: '重度消极',
                        max: 3
                    }]
                }],
                series: [{
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    itemStyle: {                // 折线拐点标志的样式。
                        normal: {                   // 普通状态时的样式
                            lineStyle: {
                                width: 3
                            },
                            // opacity: 0.2
                        },
                        emphasis: {                 // 高亮时的样式
                            lineStyle: {
                                width: 8
                            },
                            opacity: 1
                        }
                    },
                    
                    lineStyle: {
                        width: 3,
                        color: 'rgba(0,0,0,1)'
                    },
                    data: data,
                }]
            })
        },
        getFrequence(){
            let map = []
            this.$store.getters.overMap.forEach(item => {
                let e = [0,0,0,0]
                item.forEach(itemp=>{
                    switch(itemp.status){
                        case '良好':
                            e[0]++
                            break;
                        case '轻度消极':
                            e[1]++
                            break;
                        case '中度消极':
                            e[2]++
                            break;
                        case '重度消极':
                            e[3]++
                            break;
                    }
                })
                console.log(e)
                map.push(e)
            });
            this.myMap = map
            this.echartsInit()
        }
    },
}
</script>
<style lang="css">
    #radio-table {
        width: 502px;
        height: 374px;
    }
</style>