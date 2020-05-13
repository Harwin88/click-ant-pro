import request from '@/utils/request';

export async function queryProduct(): Promise<any> {
  return request('/wp/v2/product');
}

export async function  Urlservice(): Promise<any> {
  return request('https://estrategicamyp.com/index.php?rest_route=/wp/v2/product');
}

export async function getAllProdu(): Promise<any> {
  return request('https://estrategicamyp.com/index.php?rest_route=/wp/v2/product');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}