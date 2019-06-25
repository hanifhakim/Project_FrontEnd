import axios from '../config/axios'
import Cookies from 'universal-cookie'

import { GET_CART, GET_CARTONLY } from "../actions/actionTypes";

const cookie = new Cookies ()

export const onAddToCart = (user_id, product_id, qty, cls) => {
    return async () => {

        try {
            await axios.post(`/addCart/${user_id}/${product_id}`, {qty, cls})
            // cookie.set('emailLogin', res.data[0].email, {path:'/'})
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const deleteCart = (user_id, product_id) => {
    return async () => {

        try {
            await axios.delete(`/cart/delete/${user_id}/${product_id}`)
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const changeToWishlist = (user_id, product_id) => {
    return async () => {

        try {
            await axios.patch(`cart/towishlist/${user_id}/${product_id}`)
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const changeToCart = (user_id, product_id) => {
    return async () => {

        try {
            await axios.patch(`cart/tocart/${user_id}/${product_id}`)
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const counterChange = (user_id, product_id, newQty) => {
    return async () => {

        try {
            await axios.patch(`cart/minqty/${user_id}/${product_id}`, {newQty})
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const getCart = (user_id) => {
    return async dispatch => {
        try {
            const res = await axios.get(`/shop/cart/${user_id}`)
            
            return dispatch({
                type: GET_CART,
                payload: res
            })
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const getCartOnly = (user_id) => {
    return async dispatch => {
        try {
            const res = await axios.get(`/shop/cartOnly/${user_id}`)
            if(res.data.length !== 0){
                cookie.set('cartUser', res.data.length, {path:'/'})
            } else {
                cookie.remove('cartUser', {path:'/'})
            }
            
            return dispatch({
                type: GET_CARTONLY,
                payload: res
            })
        } catch (e) {
            console.log(e);
            
        }
    }
}