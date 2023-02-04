<template>
  <ElCart class="index-container">
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
        prop="configName"
        label="商品名称"
      >
      </ElTableColumn>
      <ElTableColumn
        label="跳转链接"
        >
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="configRank"
        label="排序值"
        width="120"
      >
      </ElTableColumn>
      <ElTableColumn
        prop="goodsId"
        label="商品编号"
        width="200"
      >
      </ElTableColumn>
      <ElTableColumn
        prop="createTime"
        label="添加时间"
        width="200"
      >
      </ElTableColumn>
      <ElTableColumn
        label="操作"
        width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.configId)">修改</a>
          <ElPopconfirm
            title="确定删除吗？"
            confirmButtonText='确定'
            cancelButtonText='取消'
            @confirm="handleDeleteOne(scope.row.configId)"
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
  </ElCart>
  <!-- <DialogAddGood ref='addGood' :reload="getIndexConfig" :type="state.type" :configType="state.configType" /> -->
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { getCartList } from '../api/cart.js';

const router = useRouter()
const route = useRoute()
const multipleTable = ref(null)
const addGood = ref(null)
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
  state.tableData = list.map(item => ({ addTime: item.addTime, num: item.num, ...item._doc }));
  console.log('购物车列表', state.tableData);
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
</style>