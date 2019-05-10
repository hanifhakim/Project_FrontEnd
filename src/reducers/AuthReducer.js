const init = {
    id: '',
    username: '',
    email:'',
    address:[],
    user:[]
}

export default (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, 
                id: action.payload.data.id, 
                username: action.payload.data.username,
                email: action.payload.data.email,
            user: action.payload.data}
        case "KEEP_LOGIN":
            return {
              ...state,
              username: action.payload.username,
            };
         case "LOGOUT_SUCCESS":
            return {...state, ...init}; 
        case 'GET_ADDRESS':
            return {...state, address: action.payload.data};
        case 'EDIT_SUCCESS':
            return {...state, user: action.payload.data}
        case 'ADD_ADDRESS':
            return {...state, address: action.payload.data}
            default:
            return state
    }
}