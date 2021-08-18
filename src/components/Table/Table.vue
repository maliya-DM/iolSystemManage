<template>
  <div class="commonTable">
    <el-table
        :data="data"
        tooltip-effect="light"
        highlight-current-row
        :header-cell-style="tableHeaderColor"
        @current-change="handleSingleChange"
        @selection-change="handleSelectionChange">
        <el-table-column
            v-if="showCheckbox"
            type="selection"
            width="40">
        </el-table-column>
        <template v-for="(item, index) in columns">
            <el-table-column
                v-if="colData && colData[index].isShow"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :show-overflow-tooltip="true"
                align="center"
                :sortable="item.sortable"
                :resizable="true"
                :width="item.width"
                :min-width="item.minWidth ? item.minWidth : ''"
                :formatter="item.formatter ? item.formatter : DefaultFormatter">
            </el-table-column>
             <el-table-column
                v-else-if="!colData"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :show-overflow-tooltip="true"
                align="center"
                :sortable="item.sortable"
                :resizable="true"
                :width="item.width"
                :min-width="item.minWidth ? item.minWidth : ''"
                :formatter="item.formatter ? item.formatter : DefaultFormatter">
            </el-table-column>
        </template>
             <!-- 表格操作栏 -->
            <el-table-column
                v-if="showOperation"
                header-align="center"
                align="center"
                :width="handleWidth"
                :label="'操作'">
                <template slot-scope="scope" v-for="(item,index) in routerList">
                    <slot :row="scope.row" class="operationText">
                        <router-link
                            :to="{
                                path: item.path
                            }"
                                style="color: #4987C0"
                                :key="index">
                            进入
                        </router-link>
                    </slot>
                </template>
            </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
        background
        v-if="showPagination"
        :current-page="pager.PageNo"
        :page-size="pager.pageSize"
        :page-sizes="pager.pageSizesArray"
        :total="pager.total"
        layout="total,sizes,prev,pager,next,jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
    name: 'commonTable',
    data () {
        return {
            tableHeaderColor ({ rowIndex }) {
                if (rowIndex === 0) {
                    return 'background-color:#F5F5F5;text-align:center'
                }
            }
        }
    },
    props: {
        columns: Array, // 列集合
        // 数据集合
        data: Array,
        // 是否显示表格边框
        border: {
            type: Boolean,
            default: true
        },
        // 文本对齐方式
        align: {
            type: String,
            default: 'left'
        },
        // 是否显示多选框
        showCheckbox: {
            type: Boolean,
            default: false
        },
        // 是否显示表格的操作栏
        showOperation: {
            type: Boolean,
            default: false
        },
        // 是否显示分页
        showPagination: {
            type: Boolean,
            default: false
        },
        // 操作列的宽度设置
        handleWidth: {
            type: Number,
            default: 120
        },
        // pager: Object, //分页组件数据集合[pageNo:当前页码,pageSize:当前页数量,pageArray:[页面数据数组，展示的选择每页显示个数的选项],total:总数]
        pager: {
            hasPage: true, // 分页
            pageNo: 1, // 当前页
            pageSize: 10, // 每页数据量
            total: 0, // 总数据量
            pageArray: []
        },
        maxHeight: {
            type: Number,
            default: 800
        },
        routerList: Array, // 操作列路由的跳转
        colData: Array
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    },
    DefaultFormatter (row, column, cellValue) {
      return cellValue
    },
    handleSingleChange (val) {
      this.$emit('handleSingleChange', val)
    }
  }
}
</script>>
<style scoped lang="scss">
.operate-group {
    display: flex;
    align-items: center;
    justify-content: center;
    .opreateBtn {
        margin-left: 10px;
    }
}
//分页的位置以及样式调整
.el-pagination{
    margin-top: 20px;
    text-align: center;
}
</style>