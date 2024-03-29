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

export function deleteOrder(data) {
  return request({
    url: '/api/order/delete',
    method: 'POST',
    data,
  })
}

export function requestPay(data) {
  return request({
    url: '/api/order/pay',
    method: 'POST',
    data,
  })
}

export function getOrderDetail({ id }) {
  return request({
    url: '/api/order/detail/' + id,
  })
}

export function requestUpdate(data) {
  return request({
    url: '/api/order/update',
    data,
    method: 'POST'
  });
}

export function requestShipped(data) {
  return request({
    url: '/api/order/shipped',
    method: 'POST',
    data,
  });
}

export function requestSign(data) {
  return request({
    url: '/api/order/sign',
    method: 'POST',
    data
  })
}