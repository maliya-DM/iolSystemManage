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
                        <el-select
                            v-model="deviceType"
                            clearable
                            placeholder="请选择设备类型">
                            <el-option
                                v-for="(item,index) in selectDeviceType"
                                :key="index"
                                :label="item.deviceType"
                                :value="index">
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
                            v-model="deviceId"
                            style="width:45%"
                            clearable>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="conditionList">
                        <el-input
                            style="width:70%"
                            placeholder="请输入搜索内容"
                            clearable>
                        </el-input>
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
                        <el-select
                            v-model="samplingSite"
                            clearable
                            placeholder="请选择取样部位">
                            <el-option
                                v-for="(item,index) in selectSamplingSite"
                                :key="index"
                                :label="item.samType"
                                :value="index">
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
                            v-model="samplingNum"
                            style="width:45%"
                            clearable>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="conditionList">
                        <el-button
                            type="primary"
                            icon="el-icon-search"
                            @click="searchResult">
                            查找
                        </el-button>
                        <el-button
                            type="primary"
                            icon="el-icon-circle-plus"
                            @click="dialogFormVisible = true">
                            添加
                        </el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            @click="deleteInfo">
                            删除
                        </el-button>
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
        <!-- 新增对话框 -->
        <el-dialog
            title='信息录入'
            :visible.sync="dialogFormVisible">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref='addInfoForm'>
                <el-form-item label='设备类型' prop="addDeviceType">
                    <el-select
                        v-model="ruleForm.addDeviceType"
                        clearable
                        placeholder="请选择设备类型">
                        <el-option
                            v-for="(item,index) in selectDeviceType"
                            :key="index"
                            :label="item.deviceType"
                            :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='设备编号' prop="deviceId">
                    <el-input
                        v-model="ruleForm.deviceId"
                        placeholder="请输入设备编号"
                        style="width:205px"
                        clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label='取样部位' prop="addSamSite">
                    <el-select
                        v-model="ruleForm.addSamSite"
                        clearable
                        placeholder="请选择取样部位">
                        <el-option
                            v-for="(item,index) in selectSamplingSite"
                            :key="index"
                            :label="item.samType"
                            :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='取样编号' prop="samplingNum">
                    <el-input
                        v-model="ruleForm.samplingNum"
                        placeholder="请输入取样编号"
                        style="width:205px"
                        clearable>
                    </el-input>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer">
                <el-button
                    @click="cancelSubmit">
                    取 消
                </el-button>
                <el-button
                    type="primary"
                    @click="submitForm()">
                    确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getList } from '@/api/table'
import { selectDeviceType, selectSamSite } from '@/api/home'
import tableCom from '@/components/Table/Table.vue'
export default {
    name: 'Dashboard',
    components: {
        tableCom
    },
    data () {
        return {
            selectDeviceType: [], // 选择设备类型
            selectSamplingSite: [], // 选择取样部位
            deviceType: '', // 设备类型选择
            deviceId: '', // 设备编号
            samplingSite: '', // 取样部位
            samplingNum: '', // 取样编号
            inputSearchText: '', // 搜索内容
            multipleSelection: [],
            // 表格组件传值start
            tableData: [],
            columnArray: [
                { prop: 'id', label: '交付单编号', minWidth: 80, sortable: false, router: { path: '/Database' } },
                { prop: 'display_time', label: '金额(元)', minWidth: 80, router: { path: '/Database' } },
                { prop: 'title', label: '交付日期', minWidth: 60, router: { path: '/Database' } }
            ],
            // 操作列路由的跳转
            routerList: [
                { path: '/Database' }
            ],
            pagerArray: {
                currentPage: 1, // 当前页
                pageSize: 10, // 每页数据量
                total: 0, // 总数据量
                pageSizesArray: [10, 20, 30]
            },
            dialogFormVisible: false, // 信息录入对话框
            formLabelWidth: '120px',
            ruleForm: {
                addDeviceType: '', // 设备类型
                deviceId: '', // 设备ID
                addSamSite: '', // 取样部位
                samplingNum: '' // 取样编号
            },
            rules: {
                addDeviceType: [
                    { required: true, message: '请选择设备类型', trigger: 'change' }
                ],
                deviceId: [
                    { required: true, message: '请输入设备ID', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                samplingNum: [
                    { required: true, message: '请输入取样编号', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                addSamSite: [
                    { required: true, message: '请选择取样部位', trigger: 'change' }
                ]
            },
            addDeviceType: '', // 信息录入表单--设备类型
            addSamSite: '' // 信息录入表单--取样部位
        }
    },
    created () {
        this.init()
        this.getDeviceType() // 获取设备类型数据
        this.getSamSite() // 获取取样部位数据
    },
    mounted () {
        this.columnArray.forEach(item => {
        })
    },
    computed: {
    },
    methods: {
        init () {
            getList().then(response => {
                this.tableData = response.data.items
                this.pagerArray.total = response.data.total
            })
        },
        // 获取设备类型下拉选择框
        getDeviceType () {
            selectDeviceType().then(res => {
                this.selectDeviceType = res.data.data
            })
        },
        // 获取设备类型下拉选择框
        getSamSite () {
            selectSamSite().then(res => {
                this.selectSamplingSite = res.data.data
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
        handleCurrentChange () {},
        handleSizeChange () {},
        currentPage1 () {},

        // 查找
        searchResult () {
            // 请求搜索接口 将 requestParams 这个Object传给后台
            // let requestParams = {
            //     deviceType: deviceType, // 设备类型
            //     deviceId: deviceId, // 设备ID
            //     samplingSite: samplingSite, // 取样部位
            //     samplingNum: samplingNum, // 取样编号
            //     inputSearchText: inputSearchText // 搜索文本
            // }
        },
        // 删除
        deleteInfo () {
        },
        // 录入信息表单提交
        submitForm () {
            this.$refs.addInfoForm.validate((valid) => {
                if (valid) {
                    alert('submit!')
                    this.dialogFormVisible = false
                } else {
                   alert('请填写完整的信息')
                }
            })
        },
        cancelSubmit () {
            this.$refs.addInfoForm.resetFields()
            this.dialogFormVisible = false
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
