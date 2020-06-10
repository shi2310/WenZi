<template>
  <div>
    <div class="head">
      <el-form
        :inline="true"
        :model="searchForm"
      >
        <el-form-item>
          <el-date-picker
            v-model="searchForm.time"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.type"
            placeholder="下拉选择"
          >
            <el-option
              label="选项一"
              value="选项一"
            ></el-option>
            <el-option
              label="选项二"
              value="选项二"
            ></el-option>
            <el-option
              label="选项三"
              value="选项三"
            ></el-option>
            <el-option
              label="选项四"
              value="选项四"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchForm.text"
            placeholder="请输入查询条件"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="search"
            icon="el-icon-search"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button
          type="primary"
          icon="el-icon-plus"
        >新增</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="ID"
        label="编号"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="LastDate"
        label="截至日期"
      >
      </el-table-column>
      <el-table-column
        prop="Total"
        label="累计结算金额"
      >
      </el-table-column>
      <el-table-column
        prop="HasPay"
        label="已支付金额"
      >
      </el-table-column>
      <el-table-column
        prop="NeedPay"
        label="应付账款"
      >
      </el-table-column>
      <el-table-column
        prop="InPay"
        label="累计入资金池金额"
      >
      </el-table-column>
      <el-table-column
        prop="PayCome"
        label="付费来源"
      >
      </el-table-column>
      <el-table-column
        prop="Balance"
        label="资金池余额"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            icon="el-icon-view"
          >查看</el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'home',
  data() {
    return {
      searchForm: {
        time: '',
        type: '',
        text: ''
      },
      tableData: [],
    }
  },
  created() {
    this.$myaxios.get(`/api/list`).then((response) => {
      const data = response.data
      if (data && data.Success) {
        const list = data.Data && data.Data.List
        _.each(list, item => {
          this.tableData.push(item)
        })
      } else {
        this.$message.error(data.Msg);
      }
    })
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    search() {
      console.log(`欲提交的数据   日期:${this.searchForm.time}  下拉条件:${this.searchForm.type}  文本: ${this.searchForm.text}`)
    }
  },
}
</script>

<style scoped lang="less">
.head {
  display: flex;
  justify-content: space-between;
}
</style>