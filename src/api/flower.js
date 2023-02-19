import request from '../utils/request';


/**
 * 商品类型
 * @returns 
 */
export function getFlowerTypes() {
  return request({
    url: '/api/flower/flower_types',
    method: 'GET',
  });
}

/**
 * 添加
 */
export function addFlower(data) {
  return request({
    url: '/api/flower/add',
    method: 'POST',
    data
  })
}

/**
 * 列表
 */
export function getList(data) {
  return request({
    url: '/api/flower/list',
    method: 'GET',
    data
  })
}

/**
 * 详情
 */
export function getDetail(id) {
  return request({
    url: '/api/flower/detail/' + id,
    method: 'GET',
  })
}

/**
 * 删除
 */
export function deleteFlower(data) {
  return request({
    url: '/api/flower/delete',
    method: 'POST',
    data,
  });
}

/**
 * 更新
 * @param {*} data 
 * @returns 
 */
export function updateFlower(data) {
  return request({
    url: '/api/flower/update',
    method: 'POST',
    data,
  });
}

/**
 * 更改状态
 */
export function changeFlowerStatus(data) {
  return request({
    url: '/api/flower/upper_or_lower',
    method: 'POST',
    data,
  });
}