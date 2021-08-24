<template>
    <div id='dataBasePage'>
        <h3 style="text-align: center">寿命预测</h3>
        <div class="content-top">
            <div class="model-prediction">
                <p>模型名称: </p>
                <el-input style="width: 70%" v-model="modelName"></el-input>
            </div>
            <div class="model-prediction">
                <p>预测指标: </p>
                <el-input style="width: 60%" v-model="Predictor"></el-input>
            </div>
            <el-button type="primary" size="medium" icon="el-icon-edit">选择数据</el-button>
            <el-button type="primary" size="medium" icon="el-icon-video-play">开始预测</el-button>
        </div>
        <div id="showCharts" ref="PredictionCharts">
        </div>
    </div>
</template>
<script>
export default {
    name: 'Database',
    data () {
        return {
            modelName: '航空发动机通用预测模型', // 模型名称
            Predictor: '粘度', // 预测指标
            // echarts数据(模拟)
            liftPrediction: [
                {
                    date: 20,
                    effectiveValue: 4
                },
                {
                    date: 7,
                    effectiveValue: 14
                },
                {
                    date: 54,
                    effectiveValue: 21
                },
                {
                    date: 76,
                    effectiveValue: 0.9
                },
                {
                    date: 23,
                    effectiveValue: 2
                }
            ]
        }
    },
    computed: {
    },
    watch: {

    },
    created () {

    },
    methods: {
        // ehcarts图表方法
        echartsDeploy () {
            // const PredictionCharts = this.$refs.PredictionCharts
        }
    }
}
</script>
<style scoped lang='scss'>
#dataBasePage {
    padding: 20px;
    .content-top {
        display: flex;
        align-items: center;
        .model-prediction {
            display: flex;
            align-items: center;
            margin-right: 10px;
            p {
                padding-right: 10px;
            }
        }
    }
}
</style>