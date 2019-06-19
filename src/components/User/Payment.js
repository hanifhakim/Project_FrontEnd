import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from '../../config/axios'
import Cookies from 'universal-cookie'


const cookie = new Cookies()

class Payment extends Component {

    state={
        orders:[],
        orderID:'',
        amount:'',
        oneItemBuy: [],
        previewImg:[]
    }

    getOrder = async () => {
        var user_id = cookie.get(`idLogin`)
        // console.log(this.props.match.params.selected);
        
        // console.log(this.props.item[this.props.match.params.selected]);
        var order_id = this.props.match.params.selected
        const res = await axios.get(`/getorder/${user_id}/${order_id}`)
        console.log(res.data);
        
        return this.setState({orders: res.data, orderID: order_id})
        
    }

    componentDidMount = async() => {
        await this.getOrder()
        await this.orderSummary()
    }

    orderSummary = async () => {
        const res = await axios.get(`/getpayment/${this.state.orderID}`)
        console.log(res);
        var image = res.data[0].payment_img
        if(image){
            return this.setState({amount: res.data[0].amount,
            previewImg: [`http://localhost:2010/manageorders/${image}`]})
        } else {
            return this.setState({amount: res.data[0].amount})
        }
        // var newCart = this.state.orders
        // var totalBuy = 0
        // var oneItemBuy= []
        // for(let i =0; i<newCart.length; i++){
        //     oneItemBuy = oneItemBuy.concat(newCart[i].qty*newCart[i].price)
        //     totalBuy += newCart[i].price_item
        // }
        // // console.log(oneItemBuy);
        
        
        // return this.setState({amount: totalBuy, oneItemBuy: oneItemBuy})
        
    }

    onButtonClick = async () => {
        const formData = new FormData()
        const payment_img = this.transaction.files[0]
        console.log(payment_img);
        
        formData.append('payment_img', payment_img)
        const order_id = this.props.match.params.selected
        const res = await axios.patch(`/orderpayment/${order_id}`, formData,  {headers:{
            'Content-Type': 'multipart/form-data'
            }
          })
        
        console.log(res);
          
    }

    imageChange = (event) => {
        event.preventDefault()

        const imagePreview = URL.createObjectURL(event.target.files[0])
        // console.log(imagePreview);

        this.setState({previewImg: [imagePreview]})
    }
    

    render(){
        // console.log(this.state.amount);
        
        return(
            <div>
                <div className="container-fluid row mt-3">
                    <div className="col-3">
                        <ul className="list-group">
                            <li className="list-group-item sidebarAccount">
                                <Link to={'/manageaccount/info'}><div>Account Info</div></Link>
                            </li>
                            <li className="list-group-item sidebarAccount">
                                <Link to={'/manageaccount/address'}><div>Address</div></Link>
                            </li>
                            <li className="list-group-item sidebarAccount">
                                <Link to={'/manageaccount/myorder'}><div>My Order</div></Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-7 row border border-info p-3 m-2 ">
                        <div className='col 8'>
                            <h5>Order ID: {this.state.orderID}</h5>
                            <h5>Total Payment: Rp. {this.state.amount.toLocaleString()}</h5>
                            <div className=''>
                                <label className="btn btn-outline-dark m-0">
                                    <input multiple="multiple" ref={input => this.transaction = input} type="file" className="d-none" onChange={this.imageChange} />
                                    Upload Payment
                                    </label>
                            </div>
                            {/* <div>
                                    <input className='ml-3' type="file" id="myfile" multiple="multiple" ref={input => this.transaction = input} />
                                </div>  */}
                        </div>
                        <div className='col-3 offset-1'>
                            <img style={{ height: '200px' }} 
                            onChange={this.imageChange} 
                            src={this.state.previewImg.length > 0 ? this.state.previewImg: `https://www.26.org.uk/wp-content/uploads/2018/02/taking-the-pain-out-of-pay.jpg`} alt=''></img>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type="submit" className="btn btn-primary m-2" onClick={this.onButtonClick}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment