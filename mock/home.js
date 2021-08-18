const Mock = require('mockjs')

const data = Mock.mock({
    'items|5': [{
        deviceType:'@ctitle(5)'
    }],
    'samItems|6': [{
        samType:'@ctitle(5)'
    }]
})
module.exports = [
    {
      url: '/oilSystemManage/home/selectDevice',
      type: 'get',
      response: config => {
        const items = data.items
        return {
          code: 20000,
          data: {
            data: items
          }
        }
      }
    },
    {
        url: '/oilSystemManage/home/selectSam',
        type: 'get',
        response: config => {
          const samItems = data.samItems
          return {
            code: 20000,
            data: {
              data: samItems
            }
          }
        }
      }
  ]