import axios from '../config/axios'
import swal from 'sweetalert'

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
        formData.append('image', image)
            const res = await axios.post('/manageproduct/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return dispatch({
                type: 'ADDPRODUCT_SUCCESS',
                payload: res
            })
            
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const getProducts = () => {
    return async dispatch => {
        try {
            const res = await axios.get('/manageproduct/list')

            return dispatch({
                type: 'ADDPRODUCT_SUCCESS',
                payload: res
            })
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const onDeleteProduct = (id) => {
    return async dispatch => {
        try {
            const res = await axios.delete(`/manageproduct/list/delete/${id}`)

            return dispatch({
                type: 'ADDPRODUCT_SUCCESS',
                payload: res
            })
        } catch (e) {
            console.log(e);
            
        }
    }
}


export const onEditProduct = (name, price, description, stock, pieces, category, image, product_id) => {
    return async dispatch => {
        try {
        
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('stock', stock)
        formData.append('pieces', pieces)
        formData.append('category', category)
        formData.append('image', image)
        
        const res = await axios.patch(`/editproduct/${product_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    
            swal({
                title: "Edit Succedeed!",
                text: "You clicked the button!",
                icon: "success",
                button: "Ok!",
              });
            console.log(res); 
        } catch (e) {
            
        }
    }
}
