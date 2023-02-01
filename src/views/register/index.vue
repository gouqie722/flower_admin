<template>
  <div>
    <div class="item">
      <ElInput v-model="username" placeholder="用户名">
        <template #prepend>
          <i class="el-icon-s-custom" />
        </template>
      </ElInput>
    </div>
    <div class="item">
      <ElInput
        v-model="password"
        placeholder="密码"
        :type="passwordType"
        @keyup.enter="submitForm"
      >
        <template #prepend>
          <i v-show="passwordLock" class="el-icon-lock" @click="switchPass" />
          <i
            v-show="!passwordLock"
            class="el-icon-unlock"
            @click="switchPass"
          />
        </template>
      </ElInput>
    </div>
    <ElButton type="primary" @click="submitForm">登录</ElButton>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { user_register, update_user_info } from '../../api/user.js';

export default {
  setup() {
    const username = ref("admin");
    const password = ref("123");
    const passwordType = ref("password");
    const passwordLock = ref(true);
    const router = useRouter();
    function switchPass() {
      if (passwordLock.value) {
        passwordType.value = "text";
      } else {
        passwordType.value = "password";
      }
      passwordLock.value = !passwordLock.value;
    }
    async function submitForm() {
      const res = await user_register({ username: username.value, password: password.value, headImg: 'https://www.xueyueob.cn/cube/cube01.bmp' });
      console.log(res, '注册');
      router.replace('/login');
    }
    async function update() {
      const res = await update_user_info({ _id: '63da36ae131d15d90326f03a', role: 'admin' });
      console.log('更新成功', res);
    }
    onMounted(() => {
      update();
    });
    return { username, password, passwordType, passwordLock, switchPass, submitForm };
  },
};
</script>
<style lang="less" scoped>
</style>