import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('https://estrategicamyp.com/index.php?rest_route=/');
}

export async function queryCurrent(): Promise<any> {
  return request('https://estrategicamyp.com/index.php?rest_route=/');
}

export async function queryNotices(): Promise<any> {
  return request('https://estrategicamyp.com/index.php?rest_route=/');
}