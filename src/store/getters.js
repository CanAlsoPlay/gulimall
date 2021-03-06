/*
包含多个基于state的getter计算属性的对象
 */
export default {
  totalCount (state) {
    return state.cartFoods.reduce(
      (total, food) => total + food.count, 0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce(
      (total, food) => total + food.count * food.price, 0)
  },
  positiveRatingCount (state) {
    return state.ratings.reduce(
      (pre, rating) => pre + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
