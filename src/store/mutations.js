import { ADD_CART } from './mutation-types'

export default {
  // 加入购物车
  [ADD_CART] (state, {
    shopID,
    categoryID,
    itemID,
    foodID,
    name,
    price
  }) {
    let cart = state.cartList
    let shop = cart[shopID] = (cart[shopID] || {})
    let category = shop[categoryID] = (shop[categoryID] || {})
    let item = category[itemID] = (category[itemID] || {})
    if (item[foodID]) {
      item[foodID]['num']++
    } else {
      item[foodID] = {
        'num': 1,
        'id': foodID,
        'name': name,
        'price': price
      }
    }

    state.cartList = {...cart}
  }
}
