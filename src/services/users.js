import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page })  {
  // 调用request(url)并且传入url地址获取数据
   return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  })
}