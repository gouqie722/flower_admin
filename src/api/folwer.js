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