import request from '../utils/request';

export function addCart(data) {
  return request({
    url: '/api/cart/add',
    data,
    method: 'POST'
  });
}


export function getCartList(data) {
  return request({
    url: '/api/cart/list',
    data,
    method: 'GET'
  });
}