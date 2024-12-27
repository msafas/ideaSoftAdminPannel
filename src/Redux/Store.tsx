
import { configureStore } from '@reduxjs/toolkit'
import productSlice from './Slice/productSlice'







const store = configureStore({
    reducer: {
        selectedProduct: productSlice,
    }
})

export default store