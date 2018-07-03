import fetch from '../config/fetch'

/**
 * 获取首页热门城市
 */

export const hotCity = () => fetch('/v1/cities', {
  type: 'hot'
})

/**
 * 获取首页所有城市
 */

export const groupCity = () => fetch('/v1/cities', {
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
