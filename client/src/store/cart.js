import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let cartItem = JSON.parse(localStorage.getItem("cart"));
console.log(cartItem)

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
        const cartSave = await axios.put('/api/v1/cart/addcart', newItem)
        if(cartSave.err) {
            console.log(cartSave.err);
        }
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
        const cartSave = await axios.put('/api/v1/cart/removecart', newItem)
        console.log(cartSave)
        console.log(newItem)
        if(cartSave.err) {
            console.log(cartSave.err);
        }
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
        const cartSave = await axios.put('/api/v1/cart/increaseqty', newItem)
        console.log(cartSave)
        console.log(newItem)
        if(cartSave.err) {
            console.log(cartSave.err);
        }
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
        const cartSave = await axios.put('/api/v1/cart/decreaseqty', newItem)
        console.log(cartSave)
        console.log(newItem)
        if(cartSave.err) {
            console.log(cartSave.err);
        }
    }
}

function localStorageCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}
function localStorageCartRemove() {
    localStorage.removeItem("cart");
}

export {addItemDB, removeItemDB, incItemQtyDB, decItemDB, localStorageCartRemove}