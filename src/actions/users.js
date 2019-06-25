import axios from '../config/axios'
import cookies from 'universal-cookie'
import swal from 'sweetalert'

import { GET_USER, LOGIN_SUCCESS, LOGOUT_SUCCESS, KEEP_LOGIN } from "../actions/actionTypes";

const cookie = new cookies()

export const onRegistClick = (username, first_name, last_name, email, password) => {
    return async () => {

      try {
      const res  = await  axios.post('/users', {
          username, first_name, last_name, email, password})  
          
          if(res.data.affectedRows) {
            return swal({
              title: "Registration Succedeed!",
              text: "You clicked the button!",
              icon: "success",
              button: "Ok!",
            });
          }
          else if(res.data.sqlMessage.includes('user')){
            // console.log(res.data.sqlMessage);
            return swal({
              title: "Username has been taken",
              text: "Please kindly try another username",
              icon: "error"
            });
          } else if (res.data.sqlMessage.includes('mail')) {
            return swal({
              title: "Email has been registered",
              text: "Please kindly try another email",
              icon: "error"
            });
          }
        //  return console.log(res.data);
          
      } catch (e) {
        return swal({
          title: "Email input is not valid",
          text: "Please kindly try another email",
          icon: "error"
        });;
      }
    }
}
export const onLoggedIn = (username, password) => {
    return async dispatch => {
        try {
            const res = await axios.post('/users/login', {username, password})
            // console.log(res);
            // console.log(username);
            // console.log(res.data);
            if(res.data[0].id){
            cookie.set('idLogin', res.data[0].id, {path:'/'})
            cookie.set('userLogin', res.data[0].username, {path:'/'})
            cookie.set('roleLogin', res.data[0].role, {path:'/'})
            cookie.set('first_nameLogin', res.data[0].first_name, {path:'/'})
            cookie.set('last_nameLogin', res.data[0].last_name, {path:'/'})
            cookie.set('emailLogin', res.data[0].email, {path:'/'})
            return dispatch({
                type: LOGIN_SUCCESS,
                payload: {id: res.data[0].id,
                  username: res.data[0].username,
                  role: res.data[0].role,
                  email: res.data[0].email,
                  password: res.data[0].password}
            })
            } else if (res.data === 'verified dulu'){
              return swal({
                title: "Email must be verified",
                text: "Please kindly check your email for verification link",
                icon: "error"
              });
            } else {               
              return swal({
              title: "Username and password dont match",
              text: "Please kindly check your username and password combination",
              icon: "error"
            })};
        } catch (e) {
            console.log(e);
            
        }
    }
    
}
export const keepLogin = (id, username, role) => {
  if (username === undefined) {
    return{
      type: KEEP_LOGIN,
      payload:{
        id:'',
        username:'',
        role:''
      }
    }
  }

  return {
    type: KEEP_LOGIN,
    payload:{
      id,
      username,
      role
    }
  }
 }


  export const onLogoutUser = () => {

    cookie.remove('idLogin', {path:'/'})
    cookie.remove('userLogin', {path:'/'})
    cookie.remove('roleLogin', {path:'/'})
    cookie.remove('first_nameLogin', {path:'/'})
    cookie.remove('last_nameLogin', {path:'/'})
    cookie.remove('emailLogin', {path:'/'})

    console.log('berhasil logout');
    
    return {
      type: LOGOUT_SUCCESS
    };
  };
  
  export const onEditUser = (first_name, last_name, email, password, avatar) => {
    return async () => {
      try {
        // console.log(last_name);
        const formData = new FormData()
        if(first_name && last_name && email){
          
          formData.append('first_name', first_name)
          formData.append('last_name', last_name)
          formData.append('email', email)
          formData.append('password', password)

        } else {
          return swal({
            title: "Can't update",
            text: "Check yout input",
            icon: "error"
          });
        }

        if(avatar){
          formData.append('avatar', avatar)
        }

        const user_id = cookie.get('idLogin')
        const res = await axios.patch(`/editprofile/${user_id}`,formData, {
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(res.data);
        if(res.data[0].id){
            swal({
              title: "Edit Succedeed!",
              text: "You clicked the button!",
              icon: "success",
              button: "Ok!",
            });
        }
      } catch (e) {
        console.log(e);
        
      }
    }
  }
  export const getUsers = () => {
    return async dispatch => {
      try {
        const username = cookie.get('userLogin')
        const res = await axios.get(`/users/${username}`)

        // console.log(res);
        
        return dispatch({
          type: GET_USER,
          payload: res
      })
      } catch (e) {
        
      }
    }
  }

  export const onDeleteAvatar = (user_id) => {
    return async dispatch => {
      try {
          await axios.delete(`/users/deleteAva/${user_id}`)
          // cookie.remove('avaLogin' , {path:'/'})
      //     return dispatch({
      //     type: 'EDIT_SUCCESS',
      //     payload: res
      // })
          
      } catch (e) {
        
      }
    }
  }