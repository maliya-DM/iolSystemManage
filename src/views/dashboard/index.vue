<template>
    <div class="dashboardContainer">
        <h3>油液数据分析系统</h3>
        <div class="searchCondition">
            <el-row :gutter="24">
                <el-col :span="8">
                    <div class="conditionList">
                        <div class="conditionListText">
                            <i class="el-icon-odometer"></i>
                            <p>设备类型:</p>
                        </div>
                        <el-select v-model="value" clearable placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="conditionList">
                        <div class="conditionListText">
                            <i class="el-icon-odometer"></i>
                            <p>设备编号:</p>
                        </div>
                        <el-input
                            v-model="inputSearchText"
                            style="width:45%"
                            clearable>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="conditionList">
                        <el-input style="width:70%" placeholder="请输入搜索内容"></el-input>
                    </div>
                </el-col>
            </el-row>
             <el-row :gutter="24">
                <el-col :span="8">
                    <div class="conditionList">
                        <div class="conditionListText">
                            <i class="el-icon-odometer"></i>
                            <p>取样部位:</p>
                        </div>
                        <el-select v-model="value" clearable placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="conditionList">
                        <div class="conditionListText">
                            <i class="el-icon-odometer"></i>
                            <p>取样编号:</p>
                        </div>
                        <el-input
                            v-model="inputSearchText"
                            style="width:45%"
                            clearable>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="conditionList">
                        <el-button type="primary" icon="el-icon-search">查找</el-button>
                        <el-button type="primary" icon="el-icon-circle-plus">添加</el-button>
                        <el-button type="primary" icon="el-icon-delete">删除</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="dataShowTable">
            <tableCom
                :data="tableData"
                :columns="columnArray"
                :showOperation = true
                :showCheckbox = true
                :showPagination = true
                :pager="pagerArray"
                :routerList="routerList">
            </tableCom>
        </div>
    </div>
</template>

<script>
import { getList } from '@/api/table'
import tableCom from "@/components/Table/Table.vue"
export default {
    name: 'Dashboard',
    components: {
        tableCom
    },
    data () {
        return {
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, 
                {
                    value: '选项2',
                    label: '双皮奶'
                }, 
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            value: '',
            inputSearchText: '', // 搜索内容
            multipleSelection: [],
            // 表格组件传值start
            tableData: [],
            columnArray: [
                { prop: 'id', label: "交付单编号", minWidth: 80, sortable: false, router:{path:'/Database'} },
	            { prop: 'display_time', label: "金额(元)", minWidth: 80, router:{path:'/Database'} }, 
	            { prop: 'title', label: "交付日期", minWidth: 60, router:{path:'/Database'} },
            ],
            // 操作列路由的跳转
            routerList:[
                {path:'/Database'}
            ],
            pagerArray: {
                currentPage: 1, // 当前页
                pageSize: 10, // 每页数据量
                total: 0, //总数据量
                pageSizesArray:[10,20,30]
            }
        }
    },
    created () {
        this.fetchData()
    },
    mounted () {
        this.columnArray.forEach(item=>{
        })
    },
    computed: {
    },
    methods: {
        fetchData() {
            getList().then(response => {
                this.tableData = response.data.items
                this.pagerArray.total = response.data.total
            })
        },
        // 修改表格表头颜色
        handleClass () {
            return 'background:#eef1f6;'
        },
        handleSelectionChange () {

        },
        handleEdit () {

        },
        handleCurrentChange () {

        },
        handleSizeChange () {
            
        },
        currentPage1 () {

        }
    }
}
</script>

<style scoped  lang="scss" >
.dashboardContainer{
    padding: 20px;
    h3{
        margin: 0 auto;
        text-align: center;
        margin-bottom: 20px;
    }
    .searchCondition{
        margin-bottom: 15px;
        .conditionList{
            display: flex;
            align-content: center;
            justify-content: center;
            .conditionListText{
                margin-right: 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                p{
                    margin-left: 5px;
                }
            }
        }
    }

}

</style>
