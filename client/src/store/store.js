import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import cartReducer from './cart'
import productReducer from './products'


const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        products: productReducer
    }
})



export default store