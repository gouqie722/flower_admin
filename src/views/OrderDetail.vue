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
import { useRoute } from 'vue-router'
import { getOrderDetail, getAllStatus } from '../api/order.js';
import { getBatch } from '../api/flower.js';

const route = useRoute();
const { id } = route.query;
const DateFormat = inject('$DateFormat');
const statusMap = ref({});

const state = reactive({
  data: {},
  tableData: []
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
  state.tableData = list.map((item, index)=> ({ ...item, num: flowers[index].num, sellingPrice: flowers[index].num * item.price }));
  console.log(res, flowerIds, list);
}
onMounted(() => {
  requestDetail();
  allStatus();
  console.log(id, 'id');
});
</script>

<style scoped>
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