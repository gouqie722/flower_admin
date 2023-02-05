<template>
  <ElCard class="index-container">
    <template #header>
      <div class="header">
        <ElButton type="primary" :icon="Plus" @click="handleAdd">增加</ElButton>
        <ElPopconfirm
          title="确定删除吗？"
          confirmButtonText='确定'
          cancelButtonText='取消'
          @confirm="handleDelete"
        >
          <template #reference>
            <ElButton type="danger" :icon="Delete">批量删除</ElButton>
          </template>
        </ElPopconfirm>
        <div style="flex-grow: 1;"></div>
        <ElButton type="success" :disabled="!selectList.length" :icon="Plus" @click="handleAdd">结算</ElButton>
      </div>
    </template>
    <ElTable
      :load="state.loading"
      ref="multipleTable"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <ElTableColumn
        type="selection"
        width="55">
      </ElTableColumn>
      <ElTableColumn
        prop="number"
        label="商品编号"
        width="90"
      >
      </ElTableColumn>
      <ElTableColumn
        prop="name"
        label="商品名称"
      >
      </ElTableColumn>
      <ElTableColumn
        label="主图"
      >
        <template #default="scope">
          <img width="50" height="50" :src="scope.row.coverImg || scope.row.imgUrl" />
        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="describe"
        label="详细信息"
        >
      </ElTableColumn>
      <ElTableColumn
        label="数量"
        width="140"
      >
        <template #default="scope">
          <ElInputNumber size="small" v-model="scope.row.num" :min="1" :max="10" @change="handleChange(scope)" />
        </template>
      </ElTableColumn>
      <ElTableColumn
        label="价格"
        width="0"
      >
        <template  #default="scope">
          ￥{{ scope.row.price * scope.row.num }}
        </template>
      </ElTableColumn>
      <ElTableColumn
        label="添加时间"
        width="160"
      >
        <template #default="scope">
          {{ format(scope.row.addTime) }}
        </template>
      </ElTableColumn>
      <ElTableColumn
        label="操作"
        width="100"
      >
        <template #default="scope">
          <!-- <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.configId)">修改</a> -->
          <ElPopconfirm
            title="确定删除吗？"
            confirmButtonText='确定'
            cancelButtonText='取消'
            @confirm="handleDeleteOne(scope.row.cartItemId)"
          >
            <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </ElPopconfirm>
        </template>
      </ElTableColumn>
    </ElTable>
    <!--总数超过一页，再展示分页器-->
    <ElPagination
      background
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    />
  </ElCard>
  <!-- <DialogAddGood ref='addGood' :reload="getIndexConfig" :type="state.type" :configType="state.configType" /> -->
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { getCartList, requestChangeNum, deleteCartItem } from '../api/cart.js';
import { format } from '../utils/date.js';

const router = useRouter()
const route = useRoute()
const multipleTable = ref(null)
const addGood = ref(null)
const selectList = ref([]);
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  multipleSelection: [], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  type: 'add', // 操作类型
})

async function getList() {
  state.loading = true;
  const res = await getCartList();
  state.loading = false;
  if (!res) {
    return;
  }
  const { list } = res;
  state.tableData = list.map(item => ({ addTime: item.addTime, num: item.num, ...item._doc, cartItemId: item.cartItemId, flowerId: item.flowerId }));
  console.log('购物车列表', state.tableData);
}

function handleSelectionChange(e) {
  console.log(e);
  selectList.value = e;
}

async function handleChange(e) {
  const { num, cartItemId } = e.row;
  console.log(num, cartItemId);
  const res = await requestChangeNum({ num, _id: cartItemId });
  console.log('修改成功', res);
}

async function handleDeleteOne(_id) {
  const res = await deleteCartItem({ _id });
  getList();
  console.log('删除成功', res);
}
// 初始化
onMounted(() => {
  getList();
})

</script>

<style scoped>
.index-container {
  min-height: 100%;
}
.el-card.is-always-shadow {
  min-height: 100%!important;
}
a {
  color: #409eff;
}
.header {
  display: flex;
}
.el-button {
  line-height: normal;
}
</style>