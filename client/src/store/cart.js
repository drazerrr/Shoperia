import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
let cartItem = JSON.parse(localStorage.getItem("cart"));

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: cartItem ? [...cartItem] : [],
    },
    reducers: {
        addItemFromDB(state, action) {
            state.cart = [...action.payload];
        },
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
                localStorageCart(state.cart);
        },

        removeItem(state, action) {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
            localStorageCart(state.cart);
        },

        incItem(state, action) {
            state.cart.forEach((product) => {
                if(product.id === action.payload) {
                    product.qty += 1;
                    return
                }
                return null;
            })
            localStorageCart(state.cart);
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
            localStorageCart(state.cart);
        }
        
    }
});


export const {addItem, removeItem, incItem, decItem, addItemFromDB} = cartSlice.actions;

export default cartSlice.reducer;


// Thunk

function addItemDB(cartItem) {
    return async function addAPI(dispatch, getState) {
        dispatch(addItem(cartItem));
        const userDetail = getState().user;
        const newItem = {
            email: userDetail.email,
            item: {...cartItem, qty: 1}
        }
         await axios.put('/api/v1/cart/addcart', newItem)
    }
};

function removeItemDB(cartItem) {
    return async function removeAPI(dispatch, getState) {
        dispatch(removeItem(cartItem));
        const userDetail = getState().user;
        const newItem = {
            email: userDetail.email,
            itemId: cartItem
        }
         await axios.put('/api/v1/cart/removecart', newItem)
    }
};

function incItemQtyDB(cartItem) {
    return async function incAPI(dispatch, getState) {
        dispatch(incItem(cartItem));
        const userDetail = getState().user;
        const newItem = {
            email: userDetail.email,
            itemId: cartItem
        }
         await axios.put('/api/v1/cart/increaseqty', newItem)
    }
};

function decItemDB(cartItem) {
    return async function decAPI(dispatch, getState) {
        dispatch(decItem(cartItem));
        const userDetail = getState().user;
        const newItem = {
            email: userDetail.email,
            itemId: cartItem
        }
         await axios.put('/api/v1/cart/decreaseqty', newItem)
    }
}

function localStorageCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}
function localStorageCartRemove() {
    localStorage.removeItem("cart");
}

export {addItemDB, removeItemDB, incItemQtyDB, decItemDB, localStorageCartRemove}