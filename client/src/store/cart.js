import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addItem(state, action) {
            
            let prodId = action.payload.id;
            let prodExists = false;
            state.cart.forEach((product) => {
                 if (product.id === prodId) {
                        product.qty += 1;
                        prodExists = true;
                        return;
                    }
                    return null;
                });
                if (!prodExists) {
                    const data = {...action.payload, qty: 1};
                    state.cart.push(data)
                }
        },

        removeItem(state, action) {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },

        incItem(state, action) {
            state.cart.forEach((product) => {
                if(product.id === action.payload) {
                    product.qty += 1;
                    return
                }
                return null;
            })
        },
        decItem(state, action) {
            let tog = false;
            state.cart.forEach((product) => {
                if(product.id === action.payload && product.qty > 1) {
                    product.qty -= 1;
                    tog = true;
                    return;
                }
            })
            if(!tog) {
                state.cart = state.cart.filter((item) => item.id !== action.payload)
            }
        }
    }
});


export const {addItem, removeItem, incItem, decItem} = cartSlice.actions;

export default cartSlice.reducer;