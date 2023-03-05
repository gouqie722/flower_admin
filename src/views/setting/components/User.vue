<template>
  <div class="user-manage-view">
    <div class="header-box">
      <ElButton type="primary" icon="Plus" @click="showDialog">添加用户</ElButton>
    </div>
    <el-table v-loading="tabelLoading" border :data="tableList">
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          {{ getRoleName(row.role) }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" min-width="120" />
      <el-table-column prop="introduce" label="介绍" />
      <el-table-column prop="headImg" label="头像">
        <template #default="{ row }">
          <img v-show="row.headImg" :src="row.headImg" width="40" height="40" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="160">
        <template #default="{ row }">
          {{ DateFormat(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <ElButton type="primary" size="small" icon="Edit" @click="showDialog(2, row)">修改</ElButton>
          <ElButton type="danger" size="small" icon="Delete" @click="deleteUser(row)">删除</ElButton>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="dialogFlag === 2 ? '修改' : '添加'">
      <el-form ref="userFormRef" v-loading="formLoading" :model="userForm" label-width="80px">
        <el-form-item prop="username" label="账号">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-select v-model="userForm.role" placeholder="请选择" class="w-full" @focus="getRoles">
            <el-option v-for="item in roleList" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="introduce" label="介绍">
          <el-input v-model="userForm.introduce"></el-input>
        </el-form-item>
        <el-form-item prop="headImg" label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/api/upload"
            :headers="{
              token: token,
            }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
          <img v-if="userForm.headImg" :src="userForm.headImg" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="dialogVisible = false">取 消</ElButton>
          <ElButton type="primary" :disabled="formLoading" @click="addOrUpdateUser">确 定</ElButton>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onBeforeMount } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { get_user_list, add_user, get_roles, update_user_info, delete_user_info } from '@/api/user'
import { getToken } from '../../../utils/auth'

const DateFormat = inject('$DateFormat')
const dialogFlag = ref(1)
const dialogVisible = ref(false)
const tabelLoading = ref(false)
const formLoading = ref(false)
const userFormRef = ref(null)
const roleList = reactive([])
const tableList = reactive([])
const token = getToken();
const userForm = reactive({
  username: '',
  password: '',
  role: '',
  phone: '',
  introduce: '',
  headImg: '',
})

onBeforeMount(() => {
  getTableList()
  getRoles()
})


function handleAvatarSuccess(e) {
  console.log('上传成功', e);
  const { filepath } = e.data;
  userForm.headImg = filepath;
}

/**
 * 获取表格列表
 */
const getTableList = () => {
  tabelLoading.value = true
  get_user_list()
    .then((res) => {
      tableList.length = 0;
      const list = res.list;
      tableList.push(...list);
      console.log('用户列表', list);

    })
    .finally(() => {
      tabelLoading.value = false
    })
}

/**
 * 获取角色列表
 */
const getRoles = () => {
  if (roleList.length) return
  get_roles().then((res) => {
    roleList.push(...res.list)
  })
}

/**
 * 获取角色名
 */
const getRoleName = (id) => {
  let name = id
  roleList.forEach((group) => {
    if (group.id === id) {
      name = group.name
    }
  })
  return name
}

/**
 * 展开弹窗
 */
const showDialog = (flag, row) => {
  dialogVisible.value = true
  dialogFlag.value = flag
  if (flag === 2) {
    for (const key in row) {
      userForm[key] = row[key]
    }
  } else {
    for (const key in userForm) {
      userForm[key] = ''
    }
  }
  console.log(userForm);
}

/**
 * 添加或更新用户
 */
const addOrUpdateUser = () => {
  formLoading.value = true
  if (dialogFlag.value === 2) {
    console.log(userForm);
    update_user_info({ ...userForm })
      .then((res) => {
        console.log('更新成功', res);
        getTableList()
        dialogVisible.value = false
      })
      .finally(() => {
        formLoading.value = false
      })
  } else {
    
    add_user({
      username: userForm.username,
      password: userForm.password,
      phone: userForm.phone,
      role: userForm.role,
      introduce: userForm.introduce,
      headImg: userForm.headImg,
    })
      .then(() => {
        getTableList()
        dialogVisible.value = false
      })
      .finally(() => {
        formLoading.value = false
      })
  }
}

/**
 * 删除用户
 */
const deleteUser = (row) => {
  ElMessageBox.confirm(`确定删除 ${row.username} ？`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delete_user_info({ _id: row._id }).then(() => {
        const index = tableList.findIndex((o) => o._id === row._id)
        tableList.splice(index, 1)
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
    })
    .catch(() => {})
}
</script>

<style lang="less">
.header-box {
  margin-bottom: 10px;
}
.avatar-uploader {
  width: 100px;
  height: 100px;
  color: #ddd;
  font-size: 30px;
}
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
