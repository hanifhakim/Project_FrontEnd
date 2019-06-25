import { GET_CART,GET_CARTONLY } from "../actions/actionTypes";

const initialState = {
    carts:[],
    cartOnly: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CART:
            // console.log(action.payload.data);
            
            return {...state, carts: action.payload.data}
        case GET_CARTONLY:
                // console.log(action.payload.data);
            return {...state, cartOnly: action.payload.data}    
        default:
        return state
    }
}