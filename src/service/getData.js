import fetch from '../config/fetch'

/**
 * 获取首页热门城市
 */

export const hotCity = () => fetch('/api/v1/cities', {
  type: 'hot'
})

/**
 * 获取首页所有城市
 */

export const groupCity = () => fetch('/api/v1/cities', {
  type: 'group'
})

/**
 * 根据id获取当前城市名字
 */

export const currentCity = cityId => fetch('/api/v1/cities/' + cityId)

/**
 * 搜索地址
 */

export const searchPlace = (cityId, value) => fetch('/api/v1/pois', {
  type: 'search',
  city_id: cityId,
  keyword: value
})

/**
 * 获取site页面地址信息
 */

export const getSiteAddress = geohash => fetch('/api/v2/pois/' + geohash)

/**
 * 获取site页banner食品分类
 */

export const siteFoodTypes = geohash => fetch('/api/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
})

/**
 * 获取商铺列表
 */

export const shopList = (latitude, longitude, sortByType) => {
  let data = {
    latitude, // 纬度
    longitude, // 经度
    order_by: sortByType // 分类排序
  }
  return fetch('/api/shopping/restaurants', data)
}

/**
 * 获取shop页商品分类
 * @param {*} restId
 */
export const foodMenu = restId => fetch('/api/shopping/v2/menu', {
  restaurant_id: restId
})
