<template>
    <el-row>
        <el-col :span="8" style="padding-right: 10px;">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/user.png" alt="">
                    <div class="userinfo">
                        <p class="name">admin</p>
                        <p class="access">超集管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间 :<span>2023-07-01</span> </p>
                    <p>上次登录地点 :<span>武汉</span> </p>
                </div>
            </el-card>
            <!-- 表格 -->
            <el-card style="margin-top: 20px">
                <el-table :data="tableData" height="350" border style="width: 100%">
                    <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val" :key="key">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left: 10px;">
            <div class="num">
                <el-card v-for="item in  countData " :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="price">￥ {{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px;">
                <!-- 折线图 -->
                <div ref="echarts1" style="height: 280px;"></div>
            </el-card>
            <div class="graph">
                <el-card>
                    <div ref="echarts2" style="height: 260px;"></div>
                </el-card>
                <el-card>
                    <div ref="echarts3" style="height: 260px;"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
    mounted() {
        getData().then(({ data }) => {
            const { tableData } = data.data
            this.tableData = tableData
            // 基于准备好的dom 初始化echarts实例
            const echarts1 = echarts.init(this.$refs.echarts1)
            // 指定图标的配置项和数据
            const echarts1Option = {
            }
            // 处理数据 xAxis
            const { orderData, userData, videoData } = data.data
            const xAxis = Object.keys(orderData.data[0]) //  Object.keys 返回对象的枚举
            const xAxisData = {
                data: xAxis
            }
            echarts1Option.xAxis = xAxisData
            echarts1Option.yAxis = {}
            echarts1Option.legend = xAxisData
            echarts1Option.series = []
            xAxis.forEach(key => {
                echarts1Option.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line'
                })
            })
            echarts1.setOption(echarts1Option);
            // 柱状图
            const echarts2 = echarts.init(this.$refs.echarts2)
            const echarts2Option = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ],
            }
            echarts2.setOption(echarts2Option)
            // 饼状图
            const echarts3 = echarts.init(this.$refs.echarts3)
            const echarts3Option = {
                legend: {
                    top: 'bottom'
                },
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data: videoData,
                        type: 'pie',
                        // 玫瑰图设置
                        radius: [10, 100],
                        center: ['45%', '40%'],
                        roseType: "area",
                        // 设置圆角
                        itemStyle: {
                            borderRadius: 5
                        }
                    }
                ],
            }
            echarts3.setOption(echarts3Option)
        })


    },
    data() {
        return {
            tableData: [],
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],
        }
    }
}
</script>

<style lang="less" scoped>
.user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            color: #000;
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999;
        }
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        color: #fff;
        text-align: center;
        line-height: 80px;
    }

    .detail {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .price {
            font-size: 20px;
            margin-bottom: 10px;
            height: 30px;
            line-height: 30px;
        }

        .desc {
            color: #999;
            font-size: 14px;
            text-align: center;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999;

        span {
            margin-left: 60px;
        }
    }
}

.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 48%;
        height: 260px;
    }
}

.echarts1 {
    height: 280px;
}
</style>