import axios from '../config/axios'
import cookies from 'universal-cookie'
import swal from 'sweetalert'

const cookie = new cookies()

// export const onRegistClick = (username, first_name, last_name, email, password) => {
//     return async dispatch => {

//       try {
//       const res  = await  axios.post('/users', {
//           username, first_name, last_name, email, password})  
          
//           if(res.data && !res.data.affectedRows){
//             return console.log(res.data);
//           } else if (res.data.affectedRows){
//             return swal({
//             title: "Registration Succedeed!",
//             text: "You clicked the button!",
//             icon: "success",
//             button: "Ok!",
//           });
//           }
//           console.log('diantara');
//       } catch (e) {
//           console.log(e);
//       }
//     }
// }
// export const onLoggedIn = (username, password) => {
//     return async dispatch => {
//         try {
//             const res = await axios.post('/users/login', {username, password})
//             console.log(res);
//             console.log(username);
//             // console.log(res.data);
//             if(res.data[0].id){
//             cookie.set('idLogin', res.data[0].id, {path:'/'})
//             cookie.set('userLogin', res.data[0].username, {path:'/'})
//             cookie.set('first_nameLogin', res.data[0].first_name, {path:'/'})
//             cookie.set('last_nameLogin', res.data[0].last_name, {path:'/'})
//             cookie.set('emailLogin', res.data[0].email, {path:'/'})
//             return dispatch({
//                 type: 'LOGIN_SUCCESS',
//                 payload: res
//             })
//             } else if (res.data === 'verified dulu'){
//               return swal({
//                 title: "Email must be verified",
//                 text: "Please kindly check your email for verification link",
//                 icon: "error"
//               });
//             } else {               
//               return swal({
//               title: "Username and password is'nt match",
//               text: "Please kindly check your username and password combination",
//               icon: "error"
//             })};
//         } catch (e) {
//             console.log(e);
            
//         }
//     }
    
// }
// export const keepLogin = (username) => {
//    if (username === undefined) {
//      return{
//        type: "KEEP_LOGIN",
//        payload:{
//         //  id:'',
//          username:'',
//         //  email:''
//        }
//      }
//    }

//    return {
//      type: "KEEP_LOGIN",
//      payload:{
//       //  id,
//        username,
//       //  email
//      }
//    }
//   }

//   export const onLogoutUser = () => {

//     cookie.remove('idLogin', {path:'/'})
//     cookie.remove('userLogin', {path:'/'})
//     cookie.remove('first_nameLogin', {path:'/'})
//     cookie.remove('last_nameLogin', {path:'/'})
//     cookie.remove('emailLogin', {path:'/'})
//     console.log('berhasil logout');
    
//     return {
//       type: "LOGOUT_SUCCESS"
//     };
//   };
  
//   export const onEditUser = (first_name, last_name, email, password) => {
//     return async dispatch => {
//       try {
//         // const formData = new FormData()
//         // formData.append('first_name', first_name)
//         // formData.append('last_name', last_name)
//         // formData.append('email', email)
//         // formData.append('password', password)

//         const user_id = cookie.get('idLogin')
//         const res = await axios.post(`/editprofile/${user_id}`,{first_name, last_name, email, password})
//         console.log(res.data);
//         if(res.data[0].id){
//             // cookie.set('idLogin', res.data[0].id, {path:'/'})
//             // cookie.set('userLogin', res.data[0].username, {path:'/'})
//             // cookie.set('first_nameLogin', res.data[0].first_name, {path:'/'})
//             // cookie.set('last_nameLogin', res.data[0].last_name, {path:'/'})
//             // cookie.set('emailLogin', res.data[0].email, {path:'/'})
            
//             swal({
//               title: "Edit Succedeed!",
//               text: "You clicked the button!",
//               icon: "success",
//               button: "Ok!",
//             });
//             return dispatch({
//               type: 'EDIT_SUCCESS',
//               payload: res
//           })

//         }
//       } catch (e) {
//         console.log(e);
        
//       }
//     }
//   }



  export const onAddressAdd = (nama_depan, nama_belakang, provinsi, kabupaten_kota, kecamatan, kodepos, telepon, nama_jalan) => {
    return async dispatch => {
      try {
        // const formData = new FormData()
        // formData.append('nama_depan', nama_depan)
        // formData.append('nama_belakang', nama_belakang)
        // formData.append('provinsi', provinsi)
        // formData.append('kabupaten_kota', kabupaten_kota)
        // formData.append('kecamatan', kecamatan)
        // formData.append('kodepos', kodepos)
        // formData.append('nama_jalan', alamat)

        const user_id = cookie.get('idLogin')
        const res = await axios.post(`/address/${user_id}`,{nama_depan,
        nama_belakang, provinsi, kabupaten_kota, kecamatan, kodepos, telepon, nama_jalan}
        )
        console.log(res.data);
        if(res.data.sqlMessage){
          
          swal({
            title: `${res.data.sqlMessage}`,
            text: "Please kindly check your input",
            icon: "error"})
        }
        return dispatch({
          type: 'ADD_ADDRESS',
          payload: res
      })
      } catch (e) {
        console.log(e);
        
      }
    }
  }

  export const getAddress = () => {
    return async dispatch => {
      try {
        const user_id = cookie.get('idLogin')
        const res = await axios.get(`/address/${user_id}`)
        
        console.log(res.data);
        // const data = res.data
        return dispatch({
          type: 'GET_ADDRESS',
          payload: res
          
       })

        
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

        console.log(res);
        
        return dispatch({
          type: 'EDIT_SUCCESS',
          payload: res
      })
      } catch (e) {
        
      }
    }
  }

  export const deleteAddress = (address_id) => {
    return async dispatch => {
      try {
        const user_id = cookie.get('idLogin')
        console.log(user_id);
        
        console.log(address_id);
        
        const res = await axios.delete(`/address/delete/${user_id}/${address_id}`)
        console.log(res);
        
        return dispatch({
          type: 'GET_ADDRESS',
          payload: res
          
       })
      } catch (e) {
        
      }
    }
  }