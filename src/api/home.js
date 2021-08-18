import request from '@/utils/request'

export function selectDeviceType (params) {
  return request({
    url: '/oilSystemManage/home/selectDevice',
    method: 'get',
    params
  })
}
export function selectSamSite (params) {
    return request({
      url: '/oilSystemManage/home/selectSam',
      method: 'get',
      params
    })
  }