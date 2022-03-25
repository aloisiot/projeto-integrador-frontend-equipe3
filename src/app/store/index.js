import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './categoriesSlice'
import productsReducer from './productsSlice'
import citiesReducer from './citiesSlice'
import currentCategoryReducer from './currentCategorySlice'
import currentProductReducer from './currentProductSlice'

export default configureStore({
  reducer: {
    currentCategory: currentCategoryReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cities: citiesReducer,
    currentProduct: currentProductReducer
  }
})