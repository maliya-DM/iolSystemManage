<template>
    <div id='dataBasePage'>
        <div class="dataBase-top">
            <span class="indicators-text">指标设定</span>
            <div class="indicators-checkBox">
                <el-checkbox-group v-model="checkList" @change="checkListChange">
                    <el-checkbox
                        v-for="(attributes,index) in CheckListData"
                        :key="index"
                        :label="attributes"
                        :disabled="isDisabled">
                        {{attributes}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="indicators-btn">
                <el-button type="primary" style="margin: 10px 0 10px 0" @click="settingIndi">阈值设定</el-button>
                <el-button type="primary" @click="saveSetting">保存设置</el-button>
            </div>
        </div>
        <div class="dataBase-tableData">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="原始数据" name="first">
                    <tableCom
                        ref="tableRef"
                        :data="rowData"
                        :columns="rowDataColumnArray"
                        :colData="colData"
                        :showPagination = true
                        :pager="rowDataPagerArray">
                    </tableCom>
                </el-tab-pane>
                <el-tab-pane label="分析用数据" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="训练用数据" name="third">角色管理</el-tab-pane>
            </el-tabs>
        </div>
    </div> 
</template>
<script>
// 'Ai', '测试', 'Ca', 'Cu', '设置'
const CheckListData = ['水分', '酸度', '粘度', '颗粒', 'Fe', 'Cu', 'Na', '测试']
import { getList } from '@/api/table'
import tableCom from "@/components/Table/Table.vue"
export default {
    name:"Database",
    components: {
        tableCom
    },
    data () {
        return {
            activeName: 'first',
            checkList: ['水分', '酸度', '粘度', '颗粒', 'Fe', 'Cu', 'Na', '测试'], // 默认选中的值(多选框)
            isDisabled: true,
            rowData: [], // 初始数据
            rowDataPagerArray: {
                currentPage: 1, // 当前页
                pageSize: 10, // 每页数据量
                total: 0, //总数据量
                pageSizesArray:[10,20,30]
            },
            isTrue: true,
            rowDataColumnArray: [
                { prop: 'display_time', label: "水分", minWidth: 80, sortable: false },
	            { prop: 'pageviews', label: "酸度", minWidth: 80 }, 
	            { prop: 'title', label: "粘度", minWidth: 60 },
                { prop: 'display_time', label: "颗粒", minWidth: 80, sortable: false },
	            { prop: 'pageviews', label: "Fe", minWidth: 80 }, 
	            { prop: 'title', label: "Cu", minWidth: 60 },
	            { prop: 'title', label: "Na", minWidth: 60 }
            ],
            bigarray: [],
            CheckListData: CheckListData,  // 多选框
            colData : [
                { title: '水分', isShow: true },
                { title: '酸度', isShow: true },
                { title: '粘度', isShow: true },
                { title: '颗粒', isShow: true },
                { title: 'Fe', isShow: true },
                { title: 'Cu', isShow: true },
                { title: 'Na', isShow: true },
                { title: '测试', isShow: true }
            ]
        }
    },
    computed :{
    },
    watch:{
        checkList(newVal,oldVal) {
            if(newVal ){
                var noSelectArr = this.CheckListData.filter(item=>
                    newVal.indexOf(item) < 0
                )
                this.colData.filter(i => {
                    if(noSelectArr.indexOf(i.title) !=-1){
                        i.isShow = false
                        this.isTrue = false
                    }else{
                        i.isShow = true
                        this.isTrue = true
                    }
                })
            }
        }
    },
    created () {
        this.fetchData()
    },
    methods:{
         fetchData() {
            getList().then(response => {
                this.rowData = response.data.items
            })
        },
        // 阈值设定checkBox
        checkListChange (val) {
            this.checkList = val
            console.log(this.checkList)
        },
        // 修改阈值是否可以设置
        settingIndi () {
            this.isDisabled = !this.isDisabled
        },
        // 保存设置
        saveSetting () {
           
        },
        handleClick(tab, event) {

        },
    }
}
</script>
<style scoped lang='scss'>
#dataBasePage {
    .dataBase-top {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 30px;
        padding-bottom: 10px;
        border-bottom: 1px solid #E4E7ED;
        .indicators-text {
            display: inline-block;
            writing-mode: vertical-lr;
            // background: #4987C0;
            width: 50px;
            height: 100px;
            line-height: 50px;
            text-align: center;
        }
        .indicators-btn {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
    }
    .dataBase-tableData {
        
    }
    .dataBase-tableData ::deep.is-active {
            background-color: #3cb661;
            color: white;
            
        }
}
</style>