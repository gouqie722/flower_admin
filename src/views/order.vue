<template>
  <el-card class="order-container">
    <template #header>
      <div class="header">
        <el-input
          style="width: 200px; margin-right: 10px"
          placeholder="请输入订单号"
          v-model="state.orderNo"
          @change="handleOption"
          clearable
        />
        <el-select @change="handleOption" v-model="state.orderStatus" style="width: 200px; margin-right: 10px">
          <el-option
            v-for="item in state.options"
            :key="item.type"
            :label="item.v"
            :value="item.type"
          />
        </el-select>
        <!-- <el-button type="primary" size="small" icon="el-icon-edit">修改订单</el-button> -->
        <el-button type="primary" :icon="HomeFilled" @click="handleConfig()">配货完成</el-button>
        <el-button type="primary" :icon="HomeFilled" @click="handleSend()">出库</el-button>
        <el-button type="danger" :icon="Delete" @click="handleClose()">关闭订单</el-button>
      </div>
    </template>
    <el-table
      :load="state.loading"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="orderNo"
        label="订单号"
      >
      </el-table-column>
      <el-table-column
        prop="total"
        label="订单总价"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
      >
        <template #default="scope">
          <span>{{ statusMap[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="payType"
        label="支付方式"
      >
        <template #default='scope'>
          <span v-if="scope.row.payType == 1">微信支付</span>
          <span v-else-if="scope.row.payType == 2">支付宝支付</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <el-popconfirm
            v-if="scope.row.orderStatus == 1"
            title="确定配货完成吗？"
            @confirm="handleConfig(scope.row.orderId)"
            confirm-button-text="确定"
            cancel-button-text="取消"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">配货完成</a>
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.orderStatus == 2"
            title="确定出库吗？"
            @confirm="handleSend(scope.row.orderId)"
            confirm-button-text="确定"
            cancel-button-text="取消"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">出库</a>
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="!(scope.row.orderStatus == 4 || scope.row.orderStatus < 0)"
            title="确定关闭订单吗？"
            @confirm="handleClose(scope.row._id)"
            confirm-button-text="确定"
            cancel-button-text="取消"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">关闭订单</a>
            </template>
          </el-popconfirm>
          <router-link :to="{ path: '/order_detail', query: { id: scope.row._id }}">订单详情</router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    />
  </el-card>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { HomeFilled, Delete } from '@element-plus/icons-vue';
import { getOrderList, getAllStatus, cancelOrder } from '../api/order';


const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  orderNo: '', // 订单号
  orderStatus: '', // 订单状态
  // 订单状态筛选项默认值
  options: [],
});

const statusMap = ref({});

async function getList() {
  state.loading = true;
  const res = await getOrderList();
  state.loading = false;
  console.log('订单列表', res);
  state.tableData = res.list;
}

async function allStatus() {
  const res = await getAllStatus();
  const { list } = res;
  list.forEach(item => {
    statusMap.value[item.type] = item.v;
  });
  console.log('订单状态', res, statusMap);
  state.options = list;
}

async function handleClose(id) {
  const res = await cancelOrder({ id });
  console.log('取消成功', res);
  console.log(id);
}

// 初始化获取订单列表
onMounted(() => {
  allStatus();
  getList();
})
</script>

<style>
a {
  color: #409eff;
}
</style>