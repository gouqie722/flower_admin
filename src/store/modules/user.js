import { ElMessage } from 'element-plus'
import { user_login, user_logout, get_user_info } from '@/api/user'
import {
  getToken,
  setToken,
  getRoles,
  setRoles,
  getName,
  setName,
  getAvatar,
  setAvatar
} from '@/utils/auth'

const state = {
  token: getToken(),
  roles: getRoles(),
  name: getName(),
  avatar: getAvatar(),
  introduction: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
    setRoles(roles)
  },
  SET_NAME: (state, name) => {
    state.name = name
    setName(name)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
    setAvatar(avatar)
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      user_login(userInfo)
        .then((res) => {
          const { _doc } = res;
          console.log('300 登录', res, _doc);
          if (res.token) {
            commit('SET_TOKEN', res.token)
            commit('SET_ROLES', _doc.role)
            commit('SET_NAME', _doc.username)
            commit('SET_AVATAR', _doc.headImg)
            commit('SET_INTRODUCTION', _doc.introduction)
            ElMessage({
              type: 'success',
              message: res.message
            })
          } else {
            ElMessage({
              type: 'error',
              message: res.message
            })
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      user_logout()
        .then((res) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', '')
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          dispatch('tagsView/delAllViews', null, { root: true })

          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      get_user_info(state.token)
        .then((res) => {
          if (!res) {
            reject('Verification failed, please Login again.')
          }

          const { roles, name, avatar, introduction } = res

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          commit('SET_NAME', name)
          commit('SET_ROLES', roles)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
