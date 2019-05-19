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
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then( async (willDelete) => {
          if (willDelete) {
            const res = await axios.delete(`/address/delete/${user_id}/${address_id}`)
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
            return dispatch({
              type: 'GET_ADDRESS',
              payload: res
              
           })
          } else {
            return swal("Your imaginary file is safe!");
          }
        });
        
      } catch (e) {
        console.log(e);
        
      }
    }
  }

export const onEditAddress = (nama_depan, nama_belakang, provinsi, kabupaten_kota, kecamatan, kodepos,
  telepon, nama_jalan, address_id) => {
  return async dispatch => {
    try {
      const user_id = cookie.get('idLogin')
      const res = await axios.patch(`/editaddress/${user_id}/${address_id}`, {nama_depan, nama_belakang,
        provinsi, kabupaten_kota, kecamatan, kodepos, telepon, nama_jalan})
        swal({
            title: "Edit Succedeed!",
            text: "You clicked the button!",
            icon: "success",
            button: "Ok!",
          });
        console.log(res);
    } catch (e) {
      
    }
  }
}