import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './categoriesSlice'
import productsReducer from './productsSlice'
import citiesReducer from './citiesSlice'
import currentCategoryReducer from './currentCategorySlice'
import currentProductReducer from './currentProductSlice'
import searchParamsReducer from './searchParamsSlice'

export default configureStore({
  reducer: {
    searchParams: searchParamsReducer,
    currentCategory: currentCategoryReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cities: citiesReducer,
    currentProduct: currentProductReducer
  }
})