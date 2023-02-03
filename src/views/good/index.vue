<template>
  <ElCard class="good-container">
    <template #header>
      <div class="header">
        <ElButton type="primary" icon="Plus" @click="handleAdd">新增商品</ElButton>
      </div>
    </template>
    <ElTable
      :load="loading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <ElTableColumn
        prop="number"
        label="商品编号"
      >
      </ElTableColumn>
      <ElTableColumn
        prop="name"
        label="商品名"
      >
      </ElTableColumn>
      <ElTableColumn
        prop="describe"
        label="商品简介"
      >
      </ElTableColumn>
      <ElTableColumn
        label="商品图片"
        width="150px"
      >
        <template #default="scope">
          <!-- {{ scope.row.coverImg }} -->
          <img style="width: 100px; height: 100px;" :key="scope.row._id" :src="scope.row.coverImg" alt="商品主图">
        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="stockNum"
        label="商品库存"
      >
      </ElTableColumn>
      <ElTableColumn
        prop="price"
        label="商品售价"
      >
      </ElTableColumn>
      <ElTableColumn
        label="上架状态"
      >
        <template #default="scope">
          <span style="color: green;" v-if="scope.row.lower == '01'">销售中</span>
          <span style="color: red;" v-else>已下架</span>
        </template>
      </ElTableColumn>

      <ElTableColumn
        label="操作"
        width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row._id)">修改</a>
          <a style="cursor: pointer; margin-right: 10px" v-if="scope.row.lower === '01'" @click="handleStatus(scope.row._id, 1)">下架</a>
          <a style="cursor: pointer; margin-right: 10px" v-else @click="handleStatus(scope.row._id, 0)">上架</a>
        </template>
      </ElTableColumn>
    </ElTable>
    <!--总数超过一页，再展示分页器-->
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    /> -->
  </ElCard>
</template>

<script>
import { ElButton, ElCard, ElTable } from 'element-plus';
import { onMounted, ref } from 'vue'
import { getList } from '../../api/flower';

export default {
    setup() {
        const list = ref([]);
        const loading = ref(false);
        async function requestList() {
            loading.value = true;
            const res = await getList({});
            loading.value = false;
            console.log(res, "列表");
            list.value = res.list || [];
        }
        onMounted(() => {
            requestList();
        });
        return { loading, list };
    },
    components: { ElCard, ElButton, ElTable }
}
</script>

<style>
.good-container {
  min-height: 100%;
}
.el-card.is-always-shadow {
  min-height: 100%!important;
}
a {
  color: #409eff;
}
</style>
