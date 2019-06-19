import { GET_CART } from "../actions/actionTypes";

const initialState = {
    carts:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CART:
            return {...state, carts: action.payload.data}
        default:
        return state
    }
}