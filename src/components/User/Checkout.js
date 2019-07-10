import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {connect} from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import { getCartOnly } from '../../actions/cart'
import { getAddress } from '../../actions/address'
import axios from '../../config/axios'
import swal from 'sweetalert'

import Cookies from 'universal-cookie'
import '../../css/checkout.css'
import Footer from '../Footer';

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
        shipmentCost: 0,
        cek: false
    }
    
    toggle = () => {
        this.setState(prevState => ({
          dropdownShipment: !prevState.dropdownShipment
        }));
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
        var username = cookie.get('userLogin')
        var shipment_methods = this.state.shipment
        var payment_methods = this.state.payment
        var amount = this.state.amount
        var one_item = this.state.oneItemBuy
        var shipment_address_id = this.state.address
        var shipment_price = this.state.shipmentCost
        var {cartOnly} = this.state

        //POST tabel Order
        var res = await axios.post(`/order/${id}`)
        var order_id = res.data.insertId
        if(order_id !== 0){
            for(let i =0; i<cartOnly.length; i++){
                var qty = cartOnly[i].qty
                var oneItem = one_item[i]
                var product_id = cartOnly[i].id
                //POST ORDER DETAILS (prod_id)
                await axios.post(`/orderdetails/${product_id}`, {qty, order_id, oneItem})
            }

            //POST SHIPMENT
            await axios.post(`/ordershipment`, {shipment_methods, shipment_address_id, shipment_price, order_id })
            //POST PAYMENT
            await axios.post(`/orderpayment`, {payment_methods, amount, order_id })
            //POST CREATE INVOICE
            var invoice = await axios.post(`/invoice/${username}/${order_id}`)
            console.log('invoice', invoice);
            
            //DELETE di CART
            for(let i =0; i<cartOnly.length; i++){
                var productId = cartOnly[i].id
                await axios.delete(`/cart/delete/${id}/${productId}`)
            }
              swal({
                title: "Orders Succedeed!",
                text: "You clicked the button!",
                icon: "success",
                button: "Ok!",
              });
            return this.setState({
                cek: !this.state.cek
            })
        }
        // console.log(newOrder);
    }

    getCartWithoutWishlist = async () => {
        var id = cookie.get('idLogin')
        const res= await this.props.getCartOnly(id)
        // console.log(res.payload.data);
        this.setState({cartOnly: res.payload.data})
    }

    orderSummary = () => {
        var newCart = this.state.cartOnly
        var totalBuy = 0
        var oneItemBuy= []

        for(let i =0; i<newCart.length; i++){
            oneItemBuy = oneItemBuy.concat(newCart[i].qty*newCart[i].price)
            totalBuy += newCart[i].qty*newCart[i].price
        }
        console.log(oneItemBuy);
        if(this.state.shipmentCost !== 0){
            return this.setState({amount: totalBuy + parseInt(this.state.shipmentCost), oneItemBuy: oneItemBuy})
        }
        return this.setState({amount: totalBuy , oneItemBuy: oneItemBuy})
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
                <div className='d-flex ml-3' key={i}>
                    <div className=''>
                        <div className=''>
                            <h5 className=''>{i + 1}. {item.name}</h5>
                            <p>qty: {item.qty} @ Rp. {item.price.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }
    
    renderAddress = () => {
        return this.props.address.map((item, i) => {
            return(
                <div key={i}>
                    <div className="radio addressRadio">
                        <label>
                            <input id='345'
                                onClick={() => {
                                    this.setState({ address: item.id }, () => {
                                        console.log(this.state.address);
                                    })
                                }}
                                type="radio" name="optradio3" className='buttonInline' 
                            />
                            <div key={i} className="border-0 ml-2">
                                <div className="text-left p-0 row">
                                    <div className='col-10'>
                                        <p className="lead">
                                            <strong>Nama Penerima: {item.nama_depan} {item.nama_belakang}</strong>
                                        </p>
                                        <p className="lead">
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
        var cartCookie = cookie.get('cartUser')
        var user_id = cookie.get('idLogin')

        if(cartCookie && user_id){
            return(
                <div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-7'>
                                <h5>Select Address</h5>
                                {this.renderAddress()}
                                <div className='d-flex justify-content-end'>
                                    <Link to={'/manageaccount/address'} >
                                        <button className='btn btn-primary my-4'>Manage Address</button>
                                    </Link>
                                </div>
                            </div>
                            <div className='border-dark border p-5 col-5'>
                                <h5>
                                    <span className='border-bottom border-dark'>Your Cart</span>
                                </h5>
                                <div>
                                    {this.renderCart()}
                                </div>
                                <div style={{marginTop: '50px'}}>
                                    <h5>
                                        <span className='border-bottom border-dark m-2'>Shipment:</span> 
                                        Rp. {this.state.shipmentCost.toLocaleString()}
                                        <span className='ml-3'><strong>{this.state.shipment}</strong></span>
                                    </h5>
                                </div>
                                <div style={{marginTop: '50px'}}>
                                    <h5><span className='border-bottom border-dark m-2'>Total Payment:</span>
                                    Rp. {this.state.amount.toLocaleString()}</h5>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <Dropdown direction="down" className='' isOpen={this.state.dropdownShipment} toggle={this.toggle}>
                                    <span className='border border-dark p-2 pb-3' style={{borderRadius:'5px'}}>
                                        <DropdownToggle caret color='bg-white'>
                                            <span style={{fontWeight:'bold'}}>
                                                {this.state.shipment === 'GO-SEND' ? <span>GO-SEND</span> :
                                                this.state.shipment === 'nakamikan' ? <span>nakamikan</span> : 
                                                <span>Shipment Method</span> }
                                            </span>
                                        </DropdownToggle>
                                    </span>
                                    <DropdownMenu onClick={this.dropdownValue}>
                                        <DropdownItem>GO-SEND</DropdownItem>
                                        <DropdownItem>nakamikan</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div className='col-3'>
                                <div className="radio">
                                    <label>Select Payment Method</label>
                                </div>
                                <div className="radio mb-3">
                                    <label className="radio-inline mx-2"><input onClick={() => { this.setState({ payment: 'transfer' }) }}
                                        type="radio" name="optradio2" />Transfer Bank
                                    </label>
                                    <label className="radio-inline mx-2"><input onClick={() => { this.setState({ payment: 'cod' }) }}
                                        type="radio" name="optradio2" />Cash on Delivery
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <button onClick={this.createOrder} className='btn btn-success btn-block' style={{borderRadius:'0'}} >Proceed Orders</button>
                            {this.state.cek === true ? <Redirect to='/manageaccount/myorder'/>: null}
                        </div>
                    </div>
                    <div className='fixed-bottom'>
                        <Footer/>
                    </div>
                </div>
            )
        } else {
            return <Redirect to='/cart'/>
        }
    } 
}

const mapStateToProps = (state) => {
    return {
        address: state.auth.address
    }
  }

export default connect(mapStateToProps, { getCartOnly,getAddress })(Checkout)