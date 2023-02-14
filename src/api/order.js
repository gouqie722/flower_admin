import request from '../utils/request.js';

export function createOrder(data) {
  return request({
    url: '/api/order/create',
    method: 'POST',
    data
  });
}


export function getOrderList(data) {
  return request({
    url: '/api/order/list',
    method: 'GET',
    data
  });
}

export function getAllStatus() {
  return request({
    url: '/api/order/all_status',
    method: 'GET',
  });
}

export function cancelOrder(data) {
  return request({
    url: '/api/order/cancel',
    method: 'POST',
    data
  });
}