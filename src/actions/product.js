import axios from '../config/axios'
import swal from 'sweetalert'

import { ADD_PRODUCT, GET_PRODUCT } from "../actions/actionTypes";

export const onAddProduct = (name, price, description, stock, pieces, category, image) => {
    return async dispatch => {
        try {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('stock', stock)
        formData.append('pieces', pieces)
        formData.append('category', category)
       
        if(image){
            formData.append('image', image)
        }
            const res = await axios.post('/manageproduct/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const response = res.data
            
            if(response.length){
                swal({
                    title: "Add Product Succedeed!",
                    text: "You clicked the button!",
                    icon: "success",
                    button: "Ok!",
                    });
                return dispatch({
                    type: ADD_PRODUCT,
                    payload: res
                })           
                     
            
            } else {
                return swal({
                    title: "Can't add product",
                    text: "check yout input",
                    icon: "error",
                    })
            
            }
            
        } catch (e) {
            console.log(e);
            
        }
    }
}

//display
export const getProducts = (cat) => {
    return async dispatch => {
        try {
            if(cat === 'all'){
                const res = await axios.get(`/manageproduct/list`)
                return dispatch({
                    type: GET_PRODUCT,
                    payload: res
                })
            }

            const res = await axios.get(`/product/${cat}`)
            // console.log(res);
            return dispatch({
                type: GET_PRODUCT,
                payload: res
            })
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const getManageProducts = () => {
    return async dispatch => {
        try {
            const res = await axios.get(`/manageproduct/list`)
            return dispatch({
                type: GET_PRODUCT,
                payload: res
            })
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const onDeleteProduct = (id) => {
    return async () => {
        try {
            await axios.delete(`/manageproduct/list/delete/${id}`)

        } catch (e) {
            console.log(e);
            
        }
    }
}


export const onEditProduct = (name, price, description, stock, pieces, category, image, product_id) => {
    return async () => {
        try {
        
        const formData = new FormData()
        if(name !=='' && price !=='' && description !=='' && stock !=='' && pieces !=='' && category !=='' && image !=='' && product_id !==''){
            formData.append('name', name)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('stock', stock)
            formData.append('pieces', pieces)
            formData.append('category', category)
            if(image){
                formData.append('image', image)
            }
            
            await axios.patch(`/editproduct/${product_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            // console.log(res.data);
            // console.log(res.description);
               return swal({
                    title: "Edit Succedeed!",
                    text: "You clicked the button!",
                    icon: "success",
                    button: "Ok!",
                  });
                // console.log(res); 
            
        } else {
            return swal({
                title: "Can't update",
                text: "Check yout input",
                icon: "error"
              });
        }
        } catch (e) {
            console.log(e);
            
        }
    }
}
