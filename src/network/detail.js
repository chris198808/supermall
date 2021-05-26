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
// 热门推荐
export function getRecommend() {
  return request({
    url: "/recommend"
  })
}
// es6 创建一个类
export class GoodsBaseInfos {
  constructor(itemInfo, columns, services) {
    // 标题
    this.title = itemInfo.title
    // 价格
    this.price = itemInfo.price
    // 原价格
    this.oldPrice = itemInfo.oldPrice
    // 折扣说明 可能不存在 （记得判断）
    this.discountDesc = itemInfo.discountDesc
    // 销量 收藏 退货说明 
    // 对应下标 0 1 services[3]
    this.columns = columns;
    // 延误必赔 退货补运费 全国包邮 7天无理由退货（可能不存在 记得判断）
    // 对应 下标 0 1 2 3
    this.services = services;
  }
}
