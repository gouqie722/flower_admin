<template>
  <div class="cart">
    <el-button icon="ShoppingCart" size="large" circle :type="total ? 'primary' : ''" class="shopping_cart" />
    <div class="total">{{ total }}</div>
  </div>
  <ElRow>
    <ElCol
      v-for="(item, index) in list"
      :key="item._id"
      :span="5"
      :offset="index % 4 !== 0 ? 1 : 0"
    >
      <ElCard :body-style="{ padding: '0px' }">
        <img
          :src="item.coverImg"
          class="image"
        />
        <div style="padding: 14px">
          <span class="name">{{ item.name }}</span>
          <div class="hot">热门程度：<ElRate disabled v-model="item.hot"></ElRate></div>
          <div class="bottom">
            <time class="time">{{ format(item.putTime) }}</time>
          </div>
        </div>
        <ElInputNumber v-model="item.num" :min="0" :max="10" @change="handleChange" />
        <ElButton type="primary" icon="Plus" class="button" @click="handleAddShoppingCart(index)">添加到购物车</ElButton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>
<script>
import { ElButton, ElCard, ElCol, ElInputNumber, ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { getList } from '../api/flower.js';
import { addCart } from '../api/cart.js';
import { format } from '../utils/date.js';
export default {
  setup() {
    const list = ref([]);
    const total = ref(0);
    onMounted(async () => {
      const res = await getList({});
      if (res) {
        list.value = res.list.map(item => ({ ...item, num: 0 }));
      }
      console.log(res, "列表");
    });
    function handleChange(num) {
      // console.log(num);
    }
    async function handleAddShoppingCart(index) {
      const item = list.value[index];
      if (!item.num) {
        return;
      }
      console.log(item.num, item._id);
      const res = await addCart({
        num: item.num,
        flowerId: item._id,
      });
      ElMessage.success('已添加到购物车');
      console.log('添加成功', res);
    }
    const currentDate = ref(new Date())
    return {
      currentDate,
      list,
      total,
      format,
      handleChange,
      handleAddShoppingCart,
    }
  },
  components: { ElCol, ElCard, ElButton, ElInputNumber }
}
</script>
<style lang="less">
.time {
  font-size: 12px;
  color: #999;
}

.total {
  position: absolute;
  top: 2px;
  right: 6px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  // padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
.hot {
  font-size: 16px;
}
.name {
  font-size: 20px;
  font-weight: bold;
}
.cart {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
.el-button--large.is-circle.shopping_cart {
  padding: 24px;
}
</style>