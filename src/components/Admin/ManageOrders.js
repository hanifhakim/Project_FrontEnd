import React, { Component } from 'react';
import axios from '../../config/axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import Cookies from 'universal-cookie'
// import {Link} from 'react-router-dom'
import '../../css/listorder.css'

// const cookie = new Cookies()


class ManageOrders extends Component {

    state = {
        orders:[],
        orderDetails:[],
        modal: false
    }

    confirmPayment = async (order_id) => {
        await axios.patch(`/confirmpayment/${order_id}`)
        this.getOrder()
    }

    cancelPayment = async (order_id) => {
        await axios.patch(`/cancelpayment/${order_id}`)
        await axios.patch(`/deletepaymentimg/${order_id}`)
        this.getOrder()
    }

    confirmShipment = async (order_id, product_id) => {
        await axios.patch(`/confirmshipment/${order_id}`)
        
        const res = await axios.get(`/getorderdetails/${order_id}`)
        const data = res.data
        // Supaya ngeloop sesuai banyaknya order details
        
        for(let i=0; i<data.length; i++){
            var qtyOrder = data[i].order_quantity
            var prod_id = data[i].product_id
            // dapetin stock awal
            const res2 = await axios.get(`/getstock/${prod_id}`)
            var qtyOld = res2.data[0].stock
            
             await axios.patch(`/minusstock/${prod_id}`,{qtyOrder, qtyOld})       
        }
        this.getOrder()
    }

    orderDetailsList = () => {
        return this.state.orderDetails.map((item, i)=>{
            return (
                <tr key={Math.random()}>
                    <td>{i+1}</td>
                    <td>{item.id}</td>
                    <td>{item.order_status}</td>
                    <td>{item.name}</td>
                    <td>{item.order_quantity}</td>
                    <td>{item.shipment_methods}</td>
                    <td>{item.payment_methods}</td>
                    <td>{item.price_item}</td>
                </tr>
            )
        })  
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

    detailOrders = async (order_id, user_id) => {
        this.toggle()
        const res = await axios.get(`/getorder/${user_id}/${order_id}`)
        this.setState({orderDetails: res.data})
    }

    getOrder = async () => {
        const res = await axios.get(`/getallorder`)
        return this.setState({orders: res.data})
    }

    componentDidMount = () => {
        this.getOrder()
    }

    renderList = () => {
        return this.state.orders.map((item, i) => {
            return (
                <tr className='text-center text-capitalize' key={Math.random()}>
                    <td>{i + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.order_status}</td>
                    <td>
                        <div className='d-flex flex-column'>
                            <div>
                                {item.shipment_methods}
                            </div>
                            Price: Rp. {item.shipment_price.toLocaleString()}
                            <button onClick={() => { this.confirmShipment(item.id, item.product_id) }}
                                className='mt-2 btn bg-none' style={{ color: 'red' }}>Is Deliver
                            </button>
                        </div>
                    </td>
                    <td>{item.payment_methods}</td>
                    <td>Rp. {item.amount.toLocaleString()}</td>
                    <td>
                        <a href={item.payment_img === null ?
                                    null
                                    : `http://localhost:2010/manageorders/${item.payment_img}`}>
                            <img className='w2' 
                                src={item.payment_img === null ?
                                    `https://4.bp.blogspot.com/-7Hxbfa7Le5E/UC4-_-rxhrI/AAAAAAAAB_w/_kO7NHqmb-c/s1600/default+no+image.png`
                                    : `http://localhost:2010/manageorders/${item.payment_img}`} alt="img">                                
                            </img>
                        </a>
                    </td>
                    <td className='d-flex flex-column'>
                        <button onClick={() => { this.detailOrders(item.id, item.user_id) }}
                            className='btn btn-success m-2 btn-sm'>Detail Orders
                        </button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-lg' >
                            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                <table className="table table-hover mb-5">
                                    <thead>
                                        <tr className='text-center bg-dark text-light'>
                                            <th scope="col">NO</th>
                                            <th scope="col">ORDER_ID</th>
                                            <th scope="col">STATUS</th>
                                            <th scope="col">PRODUCT</th>
                                            <th scope="col">QTY</th>
                                            <th scope="col">SHIPMENT</th>
                                            <th scope="col">PAYMENT</th>
                                            <th scope="col">PRICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.orderDetailsList()}
                                    </tbody>
                                </table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Ok</Button>{' '}
                            </ModalFooter>
                        </Modal>
                        <button onClick={() => { this.confirmPayment(item.id) }} 
                            className='btn btn-light m-2 btn-sm'>Confirm Payment
                        </button>
                        <button onClick={() => { this.cancelPayment(item.id) }} 
                            className='btn btn-danger m-2 btn-sm'>Cancel Payment
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    sortList = async () => {
        var fnsort = document.getElementById('manageSort').value
        console.log(fnsort);
        if(fnsort === 'Status'){                
            const res = await axios.get(`/sortorderstatus`)
            this.setState({orders: res.data})
        } else if (fnsort === 'Payment Image' ){
            const res = await axios.get(`/sortorderpayment`)
            this.setState({orders: res.data})
        } else if (fnsort === 'Shipment'){
            const res = await axios.get(`/sortordershipment`)
            this.setState({orders: res.data})
        } else if (fnsort === 'New-Old'){
            const res = await axios.get(`/sortorderdatedesc`)
            this.setState({orders: res.data})
        } else if (fnsort === 'Old-New'){
            const res = await axios.get(`/sortorderdateasc`)
            this.setState({orders: res.data})
        } else {
            this.getOrder()
        }
    }
   
    render(){
        // console.log(this.state.orders);
        return(
            <div className="container">
            <h1 className="text-center">Order List</h1>
                <div className=' d-inline'>
                    <div className="form-group ">
                        <select className="form-control bg-light text-black " id="manageSort" onChange={this.sortList}>
                            <option>Sort</option>
                            <option>Status</option>
                            <option>Payment Image</option>
                            <option>Shipment</option>
                            <option>New-Old</option>
                            <option>Old-New</option>
                        </select>
                    </div>
                </div>
            <table className="table table-hover mb-5">
                <thead>
                     <tr className='text-center  bg-dark text-light'>
                        <th scope="col">NO</th>
                        <th scope="col">ID</th>
                        <th scope="col">USERNAME</th>
                        <th scope="col">STATUS</th>
                        <th scope="col" style={{width: '200px'}}>SHIPMENT</th>
                        <th scope="col">PAYMENT</th>
                        <th scope="col" style={{width: '200px'}}>AMOUNT</th>
                        <th scope="col">IMG</th>
                        <th scope="col" className='border-bottom-0'>OPTION</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderList()}
                </tbody>
            </table>
        </div>
        )
    }
}

export default ManageOrders