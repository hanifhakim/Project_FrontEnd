import { GET_USER, LOGIN_SUCCESS, LOGOUT_SUCCESS, KEEP_LOGIN, GET_ADDRESS, ADD_ADDRESS } from "../actions/actionTypes";

const init = {
    id: '',
    username: '',
    role:'',
    email:'',
    address:[],
    user:[]
}

export default (state = init, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state,
                id: action.payload.id,
                username: action.payload.username,
                role: action.payload.role,
                email: action.payload.email,
                password: action.payload.password,}
        case KEEP_LOGIN:
            return {
              ...state,
              id: action.payload.id,
              username: action.payload.username,
              role: action.payload.role
            };
         case LOGOUT_SUCCESS:
            return {...state, ...init}; 
        case GET_ADDRESS:
            return {...state, address: action.payload.data};
        case GET_USER:
            return {...state, user: action.payload.data}
        case ADD_ADDRESS:
            return {...state, address: action.payload.data}
        default:
        return state
    }
}