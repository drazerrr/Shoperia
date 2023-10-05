import { createSlice } from "@reduxjs/toolkit";
import { addItemFromDB } from "./cart";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

let user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    name: user ? user.name : "",
    email: user ? user.email : "",
    userLocation: user ? user.location : "",
    alertType: "",
    alertMessage: "",
    isLoading: false,
}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add(state, action) {
            state.name = action.payload.name || "";
            state.email = action.payload.email || "";
            state.userLocation = action.payload.location || "";
            state.alertType = action.payload.alertType || "";
            state.alertMessage = action.payload.alertMessage || "";
        },
        remove(state, action) {
            state.isLoading = action.payload
            state.alertType = ""
            state.alertMessage = ""
        }
    }

});


export const { add, remove } = userSlice.actions;

export default userSlice.reducer;

// Thunks

 function userFetch(currentUser) {
    return async function userApi(dispatch, getState) {
        dispatch(remove(true))
        if(currentUser.password.length < 6) {
            return clearAction(dispatch, {alertType: 'danger', alertMessage: 'Password length should be 6 letter long'})
        }
        const user = await axios.post('/api/v1/auth/register', currentUser);
        if(user.data.err) {
            return clearAction(dispatch, {alertType: 'danger', alertMessage: user.data.err})
        };
        if(user.data.code && user.data.code === 11000) {
            return clearAction(dispatch, {alertType: 'danger', alertMessage: 'Email already Exists'})
        }
        localStorageData(user.data)
        dispatch(addItemFromDB(user.data.cart));
        
        return clearAction(dispatch, {...user.data, alertType:'success', alertMessage: 'Register successful redirecting...'})

    }

}

function userLogin(currentUser) {
    return async function userApif(dispatch, getState) {
        dispatch(remove(true))
        const user = await axios.post('/api/v1/auth/login', currentUser);
        console.log(user);
        if(user.data.err) {
            return clearAction(dispatch, {alertType: 'danger', alertMessage: user.data.err})
        };
        localStorageData(user.data)
        
        dispatch(addItemFromDB(user.data.cart));
        localStorage.setItem("cart", JSON.stringify(user.data.cart))
        
        return clearAction(dispatch, {...user.data, alertType:'success', alertMessage: 'Login successful redirecting...'})

    }

}

function clearAction(dispatch, value){
    dispatch(add(value))
    setTimeout(() => {
        dispatch(remove(false))
    }, 1000)
};

function localStorageData(user) {
    localStorage.setItem("user", JSON.stringify(user));

}
function localStorageDataRemove() {
    localStorage.removeItem("user");
    user = null;
}

export {userFetch, userLogin, localStorageDataRemove}