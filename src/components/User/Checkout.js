import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import { getCartOnly } from '../../actions/cart'
import { getAddress } from '../../actions/address'
import axios from '../../config/axios'
import swal from 'sweetalert'

import Cookies from 'universal-cookie'

const cookie = new Cookies()
class Checkout extends Component {
    
    state = {
        cartOnly:[],
        shipment:'',
        payment:'',
        amount:'',
        oneItemBuy:[],
        address:'',
        dropdownShipment: false,
        shipmentCost: 0
    }

    getCartWithoutWishlist = async () => {
        var id = cookie.get('idLogin')
        const res= await this.props.getCartOnly(id)
        // console.log(res.payload.data);
        this.setState({cartOnly: res.payload.data})
    }

    createOrder = async () => {
        if(this.state.shipment === '' || this.state.payment ==='' || this.state.address === ''){
            return swal({
                title: "Can't create order",
                text: "Please kindly check your input",
                icon: "error"
              });
        }
        
        var id = cookie.get('idLogin')
        var shipment_methods = this.state.shipment
        var payment_methods = this.state.payment
        var amount = this.state.amount
        var one_item = this.state.oneItemBuy
        var shipment_address_id = this.state.address
        var shipment_price = this.state.shipmentCost
        // var ord_id = 1
        var myOrder = []
        const {cartOnly} = this.state

        const res = await axios.post(`/order/${id}`)
        var order_id = res.data.insertId
        if(order_id !== 0){
            for(let i =0; i<cartOnly.length; i++){
                const qty = cartOnly[i].qty
                const oneItem = one_item[i]
                const res = await axios.post(`/orderdetails/${cartOnly[i].id}`, {qty, order_id, oneItem})
                // var res = res.data
                var newOrder = myOrder.concat(res.data)
            }
            await axios.post(`/ordershipment`, {shipment_methods, shipment_address_id, shipment_price, order_id })
            await axios.post(`/orderpayment`, {payment_methods, amount, order_id })
            for(let i =0; i<cartOnly.length; i++){
                await axios.delete(`/cart/delete/${id}/${cartOnly[i].id}`)
            }
            return swal({
                title: "Orders Succedeed!",
                text: "You clicked the button!",
                icon: "success",
                button: "Ok!",
              });
        }
        console.log(newOrder);
    }

    componentDidMount = async () => {
        await this.getCartWithoutWishlist()
        this.orderSummary()
        this.props.getAddress()
    }
    
    renderCart = () => {
        const item = this.state.cartOnly
        return item.map((item, i)=>{
            return (
                <div className='row m-2 border-info border p-1' key={i}>
                <div className='col-5'>
                    <div className='d-inline-flex'>
                        <h5 className='mr-3'>{i+1}. {item.name}</h5>
                        <p>qty: {item.qty} @ Rp. {item.price.toLocaleString()}</p>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='col-4'>
                    
                </div>
            </div>
            )
        })
    }

    orderSummary = () => {
        var newCart = this.state.cartOnly
        var totalBuy = 0
        var oneItemBuy= []
        for(let i =0; i<newCart.length; i++){
            oneItemBuy = oneItemBuy.concat(newCart[i].qty*newCart[i].price)
            totalBuy += newCart[i].qty*newCart[i].price
        }
        // console.log(oneItemBuy);
        if(this.state.shipmentCost !== 0){
            return this.setState({amount: totalBuy + parseInt(this.state.shipmentCost), oneItemBuy: oneItemBuy})
        }
        return this.setState({amount: totalBuy , oneItemBuy: oneItemBuy})
    }

    renderAddress = () => {
        return this.props.address.map((item, i) => {
            return(
                <div key={i}>
                    <div className="radio">
                        <label className="radio-inline d-inline-flex"><input
                        onClick={() => { this.setState({ address: item.id }, ()=>{console.log(this.state.address);
                        }) }}
                        type="radio" name="optradio3" />
                            <div key={i} className="card border-0 mx-1">
                                <div className="card-body text-left p-0 row">
                                    <div className='col-10'>
                                        <p className="card-text lead">
                                            <strong>Nama Penerima: {item.nama_depan} {item.nama_belakang}</strong>
                                        </p>
                                        <p className="card-text lead">
                                            Alamat: {item.nama_jalan}, Kec. {item.kecamatan},
                                                    Kab/Kot. {item.kabupaten_kota}, {item.provinsi},
                                                    {item.kodepos}, Telepon:{item.telepon}
                                        </p>
                                    </div>
                                    <div className='col-2'>
                                        <div className='d-flex justify-content-end'>
                                            <Link to={`/editaddress/${item.id}`}>
                                                <button className='btn btn-outline-dark border-0'>Edit</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            )
        })
    }

    toggle = () => {
        this.setState(prevState => ({
          dropdownShipment: !prevState.dropdownShipment
        }));
      }

      dropdownValue = async (e) => {
          if(e.target.innerText === 'nakamikan'){
             await this.setState({
                shipment: e.target.innerText,
                shipmentCost: 0   
             }) 
          } else {
              await this.setState({
                   shipment: e.target.innerText,
                   shipmentCost: 10000
               })
          }
           return this.orderSummary()
      }

    render(){
        // console.log(this.state.oneItemBuy);
        
        return(
            <div className='container'>
                <h5>Your Cart</h5>
                {this.renderCart()}
                <div className='border border-info p-3 m-2'>
                    <h5>Total Payment: Rp. {this.state.amount.toLocaleString()}</h5>
                </div>
                <div>
                    <h5>Select Address</h5>
                    {this.renderAddress()}
                    
                    <div className='d-flex justify-content-end'>
                        <Link to={'/manageaccount/address'} >
                            <button onClick={this.createAddress} className='btn btn-primary my-4'>Manage Address</button>
                        </Link>
                    </div>
                    
                </div>
                <Dropdown  direction="right"  className='mb-5' isOpen={this.state.dropdownShipment} toggle={this.toggle}>
                    <DropdownToggle caret color='bg-white' className='border-dark'>
                        Shipment Method
                    </DropdownToggle>
                    <DropdownMenu onClick = {this.dropdownValue}>
                        <DropdownItem>GO-SEND</DropdownItem>
                        <DropdownItem>nakamikan</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                {/* <div className="radio">
                    <label>Select Shipment Method</label>
                </div>
                <div className="radio mb-3">
                    <label className="radio-inline mx-2"><input onClick={() => { this.setState({ shipment: 'go-send' }, this.pluShipment) }}
                        type="radio" name="optradio1" />GO-SEND</label>
                    <label className="radio-inline mx-2"><input onClick={() => { this.setState({ shipment: 'nakamikan' }, this.minShipment) }}
                        type="radio" name="optradio1" />Nakamikan</label>
                </div> */}
                <div className="radio mt-4"> 
                    <label>Select Payment Method</label>
                </div>
                <div className="radio mb-3">
                    <label className="radio-inline mx-2"><input onClick={() => { this.setState({ payment: 'transfer' }) }}
                        type="radio" name="optradio2" />Transfer Bank</label>
                    <label className="radio-inline mx-2"><input onClick={() => { this.setState({ payment: 'cod' }) }}
                        type="radio" name="optradio2" />Cash on Delivery</label>
                </div>
                <button onClick={this.createOrder} className='btn btn-danger'>Proceed Orders</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {address: state.auth.address}
  }

export default connect(mapStateToProps, { getCartOnly,getAddress })(Checkout)