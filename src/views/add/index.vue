<template>
  <div class="add">
    <ElCard class="add-container">
      <el-form :model="state.goodForm" :rules="state.rules" ref="goodRef" label-width="100px" class="goodForm">
        <el-form-item required label="商品分类">
          <!-- <el-cascader :placeholder="state.defaultCate" style="width: 300px" :props="state.category" @change="handleChangeCate"></el-cascader> -->
          <ElSelect v-model="state.goodForm.type" class="m-2" placeholder="请选择" size="large" style="width: 300px;">
            <ElOption
              v-for="item in state.options"
              :key="item.type"
              :label="item.v"
              :value="item.type"
            />
          </ElSelect>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input style="width: 300px" v-model="state.goodForm.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品简介" prop="describe">
          <el-input style="width: 300px" type="textarea" v-model="state.goodForm.describe" placeholder="请输入商品简介(100字)"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input type="number" min="0" style="width: 300px" v-model="state.goodForm.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品售卖价" prop="sellingPrice">
          <el-input type="number" min="0" style="width: 300px" v-model="state.goodForm.sellingPrice" placeholder="请输入商品售价"></el-input>
        </el-form-item> -->
        <ElFormItem label="热卖程度" prop="hot">
          <ElRate v-model="state.goodForm.hot" />
        </ElFormItem>
        <el-form-item label="商品库存" prop="stockNum">
          <el-input type="number" min="0" style="width: 300px" v-model="state.goodForm.stockNum" placeholder="请输入商品库存"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品标签" prop="tag">
          <el-input style="width: 300px" v-model="state.goodForm.tag" placeholder="请输入商品小标签"></el-input>
        </el-form-item> -->
        <el-form-item label="上架状态" prop="sell_status">
          <el-radio-group v-model="state.goodForm.sell_status">
            <el-radio label="00">上架</el-radio>
            <el-radio label="01">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item required label="商品主图" prop="coverImg">
          <el-upload
            class="avatar-uploader"
            :action="state.uploadImgServer"
            accept="jpg,jpeg,png"
            :headers="{
              token: state.token
            }"
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
            :on-success="handleUrlSuccess"
          >
            <img style="width: 100px; height: 100px; border: 1px solid #e9e9e9;" v-if="state.goodForm.coverImg" :src="state.goodForm.coverImg" class="avatar">
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="详情内容">
          <el-input style="width: 300px" type="textarea" v-model="state.goodForm.describe" placeholder="请输入商品简介(100字)"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitAdd()">{{ state.id ? '立即修改' : '立即创建' }}</el-button>
        </el-form-item>
      </el-form>
    </ElCard>
  </div>
</template>

<script>
import { ElCard, ElOption, ElRate, ElSelect, ElMessage } from 'element-plus';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getFlowerTypes, addFlower } from '../../api/folwer';
import { getToken } from '../../utils/auth';

export default {
    setup() {
        const state = reactive({
            goodForm: {
              name: "",
              describe: "",
              price: "",
              stockNum: "",
              sell_status: "00",
              coverImg: "",
              tag: "",
              type: '',
              hot: 2,
            },
            uploadImgServer: 'http://39.108.186.101:3000/api/upload',
            options: [],
            token: getToken(),
            rules: [

            ],
        });
        const router = useRouter();
        async function init() {
            const res = await getFlowerTypes();
            const { list } = res;
            state.options = list;
            // state.goodForm.type = list[0].type;
            console.log(res, "类型");
        }
        function handleBeforeUpload(e) {
          console.log('上传', e);
          return true;
        }
        function handleUrlSuccess(e) {
          console.log('上传成功', e);
          const { filepath } = e.data;
          state.goodForm.coverImg = filepath;
        }
        async function submitAdd() {
          console.log(state.goodForm);
          const res = await addFlower({ ...state.goodForm, stockNum: Number(state.goodForm.stockNum) });
          ElMessage({
            message: '添加成功',
            type: 'success',
          })
          router.replace('/good');
          console.log('添加成功', res);
        }
        onMounted(() => {
          console.log(state);
            init();
        });
        return {
          state,
          handleUrlSuccess,
          handleBeforeUpload,
          submitAdd,
        };
    },
    components: { ElCard, ElSelect, ElOption, ElRate }
}
</script>

<style lang="less" scoped>
.add {
  display: flex;
}
.add-container {
  flex: 1;
  height: 100%;
}
.avatar-uploader {
  width: 100px;
  height: 100px;
  color: #ddd;
  font-size: 30px;
}
.avatar-uploader-icon {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  padding: 32px 17px;
}
</style>