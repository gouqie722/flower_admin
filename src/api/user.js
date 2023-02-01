import request from '../utils/request'

/**
 * 登录
 * @param {*} data
 * @returns
 */
export function user_login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

/**
 * 注册
 * @param {*} data 
 * @returns 
 */
export function user_register(data) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data
  })
}

/**
 * 登出
 * @param {*} params
 * @returns
 */
export function user_logout() {
  return request({
    url: '/api/user/loginOut',
    method: 'post'
  })
}

/**
 * 添加用户
 * @param {*} data
 * @returns
 */
export function add_user(data) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param {*} id
 * @returns
 */
export function get_user_info(id) {
  return request({
    url: `/api/user/info/${id}`,
    method: 'get'
  })
}

/**
 * 修改用户信息
 * @param {*} data
 * @returns
 */
export function update_user_info(data) {
  return request({
    url: `/api/user/update`,
    method: 'post',
    data
  })
}

/**
 * 删除用户信息
 * @param {*} id
 * @returns
 */
export function delete_user_info(data) {
  return request({
    url: `/api/user/delete`,
    method: 'post',
    data,
  })
}

/**
 * 获取用户列表
 * @param {*} params
 * @returns
 */
export function get_user_list(params) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params
  })
}

/**
 * 获取角色列表
 * @param {*} params
 * @returns
 */
export function get_roles(params) {
  return request({
    url: '/api/user/roles',
    method: 'get',
    params
  })
}
