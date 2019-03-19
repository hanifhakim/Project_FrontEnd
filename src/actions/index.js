// import React from 'react'
import axios from 'axios';
import cookies from 'universal-cookie'
const cookie = new cookies()

export const onLoggedIn = (user, pass) => {
    return dispatch => {
        axios.get("http://localhost:1996/users",{
            params:{
                username: user,
                password: pass
            }
        }).then(res => {
            if(res.data.length > 0){
                const {id, username} = res.data[0]
                console.log(res.data);
                
                dispatch({
                type: "LOGIN_SUCCESS",
                payload: {id, username}
            
               })
               cookie.set('stayLogin', username, {path:'/'})
            } else {
                dispatch({
                    type: "AUTH_ERROR",
                    payload: "Username and password don't match"
                })

                setTimeout(() => {
                    dispatch ({
                        type:"AUTH_OUT"
                    })
                }, 2000);
            }
           
               
        }).catch(err => {
            console.log('error');
        })
    }
}

export const keepLogin = (user) => {
    return dispatch => {
        axios.get("http://localhost:1996/users", {
            params:{username:user}
        }).then((res)=>{
            if(res.data.length > 0){
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {username:user}
                })
            }
        })
    }
}

export const logoutUser = () => {
    cookie.remove('stayLogin')
    return({
        type:"LOGOUT_SUCCESS"
    })
}

export const onRegistClick = (user, email, pass) => {
    return (dispatch) =>{
        axios.post("http://localhost:1996/users",{
            username: user,
            email: email,
            password: pass
        }).then(res =>{
            console.log(res.data);
            dispatch({
                type: "AUTH_SUCCESS"
            })
        })
    }
   
}