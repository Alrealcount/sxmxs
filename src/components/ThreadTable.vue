<template lang="">
    <div>
        <div id="thread-table">

        </div>
    </div>
</template>
<script>
export default {
    name:'ThreadTable',
    data() {
        return {
            threadData:[]
        }
    },
    mounted() {
        this.tableInit()
    },
    methods: {
        tableInit(){
            var bang = echarts.init(document.getElementById('thread-table'));
            bangOption = {
                // 标题
                title: {
                    text: '概览展示图'
                },
                // 图例
                tooltip: {
                    show: true,
                    trigger: "axis",
                    backgroundColor: "#1677FF",
                    // {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
                    formatter: "{b}:{c}",
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
                xAxis: {
                    name: '评论',
                    type: 'category',
                    data: Array.from(this.realName) ,
                    boundaryGap: false // 不留白，从原点开始    
                    // data: realName
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                {
                    name: '学生',
                    data: Array.from(this.avgScore),
                    // data: avgScore,
                    type: 'line',
                    smooth: true,
                    stack: '总量',
                    areaStyle: {},
                    markPoint: {
                        // 标注图形数据
                        itemStyle:{
                            normal:{
                                color:"#3EC5F3",
                                label:{
                                    show:false,
                                    color:"blue"
                                }
                            }
                        },
                        data: [{
                                type: 'max', // 类型
                                symbol: 'pin', // 标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'），默认循环选择类型有：'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 另外，还支持五种更特别的标志图形'heart'（心形）、'droplet'（水滴）、'pin'（标注）、'arrow'（箭头）和'star'（五角星），这并不出现在常规的8类图形中，但无论是在系列级还是数据级上你都可以指定使用，同时，'star' + n（n>=3)可变化出N角星，如指定为'star6'则可以显示6角星 
                                name: '最大值',
                                animation: true
                            },
                            {
                                type: 'min', // 类型
                                symbol: 'pin',
                                name: '最小值'
                            },
                        ],
                        // 特殊标注文字
                        label: {
                            normal: {
                                color:'blue',
                                show: true,
                                position: 'top', // 文字位置
                                // 显示的文字
                                formatter: '{b}：{c}',
                            },
                            emphasis:{
                                color:"red",//移入后的颜色
                            }
                        },
                    },
                    markLine: {
                        data: [{
                            type: 'average',
                            name: '平均值',
                            itemStyle: {
                                normal: {
                                    color: 'orange'
                                }
                            }
                        }]
                    }
                }],
                grid:{
                    top:"50px",
                    left:"50px",
                    right:"50px",
                    bottom:"50px",
                }
            };
            bang.setOption(bangOption);
        }
    },
}
</script>
<style scoped>
    
</style>