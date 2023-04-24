<template>
  <ElCard class="order-container">
    <div class="data">
      <ElCard class="data-item" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>订单状态</span>
          </div>
        </template>
        <div>
          {{ statusMap[state.data.status] }}
        </div>
      </ElCard>
      <ElCard class="data-item" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>创建时间</span>
          </div>
        </template>
        <div>
          {{ DateFormat(state.data.createTime) }}
        </div>
      </ElCard>
      <ElCard class="data-item" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>订单号</span>
          </div>
        </template>
        <div>
          {{ state.data.orderNo }}
        </div>
      </ElCard>
    </div>
    <div class="address">
      <div class="t">
        配送地址: 
        <template v-if="state.data.status !== '00'">
          {{ state.address }}
        </template>
      </div>
      <ElInput v-if="state.data.status === '00'" placeholder="请输入" class="input" v-model="state.address" />
      <div style="flex-grow: 1;"></div>
      <ElButton type="success" v-if="state.data.status === '00'" plain @click="handleSubmit">去支付</ElButton>
      <div v-else>支付成功 => 待配送</div>
    </div>
    <ElTable
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <ElTableColumn
        label="商品图片"
      >
        <template #default="scope">
          <img style="width: 100px" :key="scope.row._id" :src="scope.row.coverImg" alt="商品主图">
        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="number"
        label="商品编号"
      >
      </ElTableColumn>
      <ElTableColumn
        prop="name"
        label="商品名"
      ></ElTableColumn>
      <ElTableColumn
        prop="num"
        label="商品数量"
      >
      </ElTableColumn>
      <ElTableColumn
        prop="sellingPrice"
        label="价格"
      >
      </ElTableColumn>
    </ElTable>
  </ElCard>
</template>

<script setup>
import { onMounted, reactive, inject, ref } from 'vue'
import { useRoute } from 'vue-router';
import { ElMessage, ElLoading } from 'element-plus';
import { getOrderDetail, getAllStatus, requestUpdate, requestPay } from '../api/order.js';
import { getBatch } from '../api/flower.js';

const route = useRoute();
const { id } = route.query;
const DateFormat = inject('$DateFormat');
const statusMap = ref({});
let loadingInstance = null;

const state = reactive({
  data: {},
  address: '',
  tableData: [],
});

async function allStatus() {
  const res = await getAllStatus();
  const { list } = res;
  const map = {};
  list.forEach(item => {
    map[item.type] = item.v;
  });
  statusMap.value = map;
}

async function requestDetail() {
  const res = await getOrderDetail({ id });
  const { flowers } = res;
  const flowerIds = flowers.map(item => item.id);
  const batchRes = await getBatch({ list: JSON.stringify(flowerIds) });
  const { list } = batchRes;
  state.data = res;
  state.address = res.address;
  state.tableData = list.map((item, index)=> ({ ...item, num: flowers[index].num, sellingPrice: flowers[index].num * item.price }));
  console.log(res, flowerIds, list);
}
async function handleSubmit() {
  if (!state.address) {
    ElMessage.error({ message: '请输入配送地址' });
    return;
  }
  loadingInstance = ElLoading.service({ fullscreen: true, })
  const res = await requestUpdate({ address: state.address, id: state.data._id });
  console.log(res, 'res');
  handlePay();
}
async function handlePay() {
  const { _id } = state.data;
  const result = await requestPay({ id: _id });
  loadingInstance?.close();
  if (result.code === 100001) {
    ElMessage({
      type: 'error',
      message: result.msg,
    });
    return;
  }
  ElMessage({
    type: 'success',
    message: '支付成功',
  });
  requestDetail();
  console.log(result, '支付');
}
onMounted(() => {
  requestDetail();
  allStatus();
  console.log(id, 'id');
});
</script>

<style scoped lang="less">
  .address {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .input {
      width: 500px;
    }
  }
  .data {
    display: flex;
    margin-bottom: 50px;
  }
  .data .data-item {
    flex: 1;
    margin: 0 10px;
  }
  .el-table {
    border: 1px solid #EBEEF5;
    border-bottom: none;
  }
  .has-gutter th {
    border-right: 1px solid #EBEEF5;
  }

  .has-gutter th:last-child {
    border-right: none;
  }
  .el-table__row td {
    border-right: 1px solid #EBEEF5;
  }
  .el-table__row td:last-child {
    border-right: none;
  }
</style>