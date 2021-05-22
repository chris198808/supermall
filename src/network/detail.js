import {
  request
} from './request'
export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
// es6 创建一个类
export class GoodsBaseInfos {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discountDesc = itemInfo.discountDesc
    this.salesNum = columns[0]
    this.collection = columns[1];
    this.fahuo = services[3]
  }
}
