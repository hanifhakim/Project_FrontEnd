import axios from '../config/axios'
import cookies from 'universal-cookie'
import swal from 'sweetalert'

const cookie = new cookies()

export const onAddressAdd = (nama_depan, nama_belakang, provinsi, kabupaten_kota, kecamatan, kodepos, telepon, nama_jalan) => {
    return async dispatch => {
      try {
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
        console.log(e);
        
      }
    }
  }