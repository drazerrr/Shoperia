import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: [],
    total: 0,
    page: 0,
    loading: false,

}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action){
            return {...state, products: action.payload}
        },
        changePage(state, action) {
            return {...state, page: action.payload}
        },
        loadingState(state, action) {
            return {...state, loading: action.payload}
        },
        totalPages(state, action) {
            return {...state, totalPages: action.payload}
        }
    }
});

export const { changePage, loadingState, setProducts, totalPages } = productSlice.actions;
export default productSlice.reducer


export function fetchApi() {
    return async function products(dispatch, getState) {
        const page = getState().products.page;
        dispatch(loadingState(true))
        dispatch(setProducts([]))
        const api = await fetch(`https://dummyjson.com/products?limit=14&skip=${page}`);
        const data = await api.json();
        dispatch(setProducts(data.products));
        dispatch(totalPages(data.total));
        dispatch(loadingState(false));

    }
}
