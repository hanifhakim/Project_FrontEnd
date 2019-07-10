import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from '../../config/axios'
import Cookies from 'universal-cookie'

import swal from 'sweetalert'


const cookie = new Cookies()

class Payment extends Component {

    state={
        orders:[],
        orderID:'',
        amount:'',
        payment:'',
        previewImg:''
    }

    getOrder = async () => {
        var user_id = cookie.get(`idLogin`)
        // console.log(this.props.match.params.selected);
        // console.log(this.props.item[this.props.match.params.selected]);
        var order_id = this.props.match.params.selected
        const res = await axios.get(`/getorder/${user_id}/${order_id}`)
        // console.log(res.data);
        return this.setState({orders: res.data, orderID: order_id})
    }

    //GET PAYMENT, amount, payment methods
    orderSummary = async () => {
        const res = await axios.get(`/getpayment/${this.state.orderID}`)
        // console.log(res.data[0].payment_methods);
        var image = res.data[0].payment_img
        if(image){
            return this.setState({
                amount: res.data[0].amount,
                payment: res.data[0].payment_methods,
                previewImg: `http://localhost:2010/manageorders/${image}`})
        } else {
            return this.setState({
                amount: res.data[0].amount,
                payment: res.data[0].payment_methods})
        }
    }

    componentDidMount = async() => {
        await this.getOrder()
        this.orderSummary()
    }

    onButtonClick = async () => {
        const formData = new FormData()
        const payment_img = this.transaction.files[0]
        // console.log(payment_img);
        
        formData.append('payment_img', payment_img)
        const order_id = this.props.match.params.selected
        //Post Img
        const res = await axios.patch(`/orderpayment/${order_id}`, formData,  {headers:{
            'Content-Type': 'multipart/form-data'
            }
          })
        
        // console.log(res);
        if(res.data.affectedRows !== ''){
            return swal({
                title: "Upload Succedeed!",
                icon: "success",
                button: "Ok!",
              });
        } else {
            return swal({
                title: "Please retry",
                icon: "error",
                button: "Ok!",
              });
        }
          
    }

    imageChange = (event) => {
        // event.preventDefault()

        const imagePreview = URL.createObjectURL(event.target.files[0])
        // console.log(imagePreview);
        this.setState({previewImg: imagePreview})
    }
    
    render(){
        // console.log(this.state.amount);
        var user_id = cookie.get('idLogin')
        
            if(user_id){
                return(
                    <div>
                        <div className="container-fluid row mt-3">
                            <div className="col-3">
                                <ul className="list-group-flush">
                                    <li className="list-group-item sidebarAccountUser">
                                        <Link to={'/manageaccount/info'} className='list'>
                                            <div>Account Info</div>
                                        </Link>
                                    </li>
                                    <li className="list-group-item sidebarAccountUser">
                                        <Link to={'/manageaccount/address'} className='list'>
                                            <div>Address</div>
                                        </Link>
                                    </li>
                                    <li className="list-group-item sidebarAccountUser">
                                        <Link to={'/manageaccount/myorder'} className='list'>
                                            <div>My Order</div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-7 row border border-info p-3 m-2 ">
                                <div className='col 8'>
                                    <h5>Order ID: {this.state.orderID}</h5>
                                    <h5>Total Payment: Rp. {this.state.amount.toLocaleString()}</h5>
                                        {this.state.payment === 'transfer' ? (
                                        <div className='text-center' style={{ marginTop: '50px' }}>
                                            <img src=
                                                'https://2.bp.blogspot.com/-KOCuufNI34A/W25tZbmpJyI/AAAAAAAAZ-Y/jGugDeWGIIwksbqAzqHbTBXvQF1yWFZnQCLcBGAs/s1600/bank-bri.jpg'
                                                style={{ width: '300px' }} alt='bri'></img>
                                            <div>No. Rek: 1298361520932</div>
                                        </div>
                                        ): (
                                        <div>
                                            <h4>Cash on Delivery</h4>
                                        </div>
                                        )}
                                </div>
                                <div className='col-3 offset-1'>
                                    <div>
                                        <a href={this.state.previewImg.length === 0  ? 
                                                null: this.state.previewImg }>
                                            <img style={{ width:'100%', maxHeight:'320px' }} 
                                                onChange={this.imageChange} 
                                                src={this.state.previewImg.length > 0 ? 
                                                    this.state.previewImg: `https://www.26.org.uk/wp-content/uploads/2018/02/taking-the-pain-out-of-pay.jpg`} 
                                                alt=''>
                                            </img>
                                        </a>
                                    </div>
                                    <div className='d-flex justify-content-center' style={{marginTop:'5px'}}>
                                        <label className="btn btn-outline-dark m-0">
                                            <input multiple="multiple" ref={input => this.transaction = input} type="file" 
                                                className="d-none" onChange={this.imageChange}
                                            />
                                            Upload Payment
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button type="submit" className="btn btn-success m-2"
                                    onClick={this.onButtonClick}>Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )        
            } else {
                return <Redirect to='/'/>
            }
    }
}

export default Payment