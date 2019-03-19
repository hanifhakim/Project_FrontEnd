import { combineReducers } from 'redux'

const init = {
    id: "",
    username: "",
    error:"",
    success:""
  };

  const AuthReducer = (state = init, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
      console.log("berhasil masuk");
      // window.location.pathname='/'
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username
      };
      case "LOGOUT_SUCCESS":
        // window.location.pathname="/"
        return (state = init); //atau {...state, ...init} property yg di state ditimpa dgn property init (kosong)
  
      case "AUTH_ERROR":
        return {
          ...state, error: action.payload, success:""};
      case "AUTH_SUCCESS":
        return {
          ...state,  error:"", success: action.payload};
      case "AUTH_OUT":
          return { ...state, error:'',success:''}
      default:
        return state;
    }
  };

  export default combineReducers({
    auth: AuthReducer
  });
  