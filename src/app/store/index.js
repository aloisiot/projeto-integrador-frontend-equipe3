import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './slices/categoriesSlice'
import productsReducer from './slices/productsSlice'
import citiesReducer from './slices/citiesSlice'
import currentCategoryReducer from './slices/currentCategorySlice'
import currentProductReducer from './slices/currentProductSlice'
import searchParamsReducer from './slices/searchParamsSlice'
import prossesReducer from './slices/prossesSlice'

export default configureStore({
  reducer: {
    searchParams: searchParamsReducer,
    currentCategory: currentCategoryReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cities: citiesReducer,
    currentProduct: currentProductReducer,
    prosses: prossesReducer
  }
})