import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    name: "",
    email: "",
    userLocation: "",
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
        const user = await axios.post('/api/v1/auth/register', currentUser);
        console.log(user);
        if(user.data.err) {
            return clearAction(dispatch, {alertType: 'danger', alertMessage: user.data.err})
        };
        if(user.data.code && user.data.code === 11000) {
            return clearAction(dispatch, {alertType: 'danger', alertMessage: 'Email already Exists'})
        }
        if(user.data.errors && user.data.errors.password.kind === "minlength") {
            return clearAction(dispatch, {alertType: 'danger', alertMessage: 'Password length should be 6 letter long'})
        }

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
        
        return clearAction(dispatch, {...user.data, alertType:'success', alertMessage: 'Login successful redirecting...'})

    }

}

function clearAction(dispatch, value){
    dispatch(add(value))
    setTimeout(() => {
        dispatch(remove(false))
    }, 3000)
};

export {userFetch, userLogin}