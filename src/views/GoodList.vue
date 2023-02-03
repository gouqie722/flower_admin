<template>
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
          <span>Yummy hamburger</span>
          <div class="bottom">
            <time class="time">{{ format(item.putTime) }}</time>
            <ElButton text class="button">Operating</ElButton>
          </div>
        </div>
      </ElCard>
    </ElCol>
  </ElRow>
</template>
<script>
import { ElButton, ElCard, ElCol } from 'element-plus';
import { onMounted, ref } from 'vue';
import { getList } from '../api/flower.js';
import { format } from '../utils/date.js';
export default {
  setup() {
    const list = ref([]);
    onMounted(async () => {
      const res = await getList({});
      if (res) {
        list.value = res.list;
      }
      console.log(res, "列表");
    });

    const currentDate = ref(new Date())
    return {
      currentDate,
      list,
      format,
    }
  },
  components: { ElCol, ElCard, ElButton }
}
</script>
<style lang="less">
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>