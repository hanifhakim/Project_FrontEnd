import { ADD_PRODUCT, GET_PRODUCT } from "../actions/actionTypes";

const initialState = {
    products:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {...state, products: action.payload.data}
        case GET_PRODUCT:
            return {...state, products: action.payload.data}
        default:
        return state
    }
}