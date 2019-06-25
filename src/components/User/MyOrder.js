import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from '../../config/axios'
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom'

const cookie = new Cookies()

class MyOrder extends Component {

    state = {
        orders:[],
        orderDetails:[],
        modal: false
    }

    renderList2 = () => {
        return this.state.orderDetails.map((item, i)=>{
            return (
                <tr className='text-center' key={Math.random()}>
                    <td>{i+1}</td>
                    <td>{item.id}</td>
                    <td>{item.order_status}</td>
                    <td>{item.name}</td>
                    <td>{item.order_quantity}</td>
                    <td>Rp. {item.price_item.toLocaleString()}</td>
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

    renderList = () => {
        return this.state.orders.map((item, i)=>{
            return (
                <tr className='text-center' key={Math.random()}>
                    <td>{i + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.order_status}</td>
                    <td>
                        <div className='d-flex flex-column'>
                            <div>
                                {item.shipment_methods}
                            </div>
                            Price: Rp. {item.shipment_price.toLocaleString()}
                        </div>
                    </td>
                    <td>{item.payment_methods}</td>
                    <td>Rp. {item.amount.toLocaleString()}</td>
                    <td className='d-flex flex-column'>
                        <button onClick={() => { this.detailOrders(item.id, item.user_id) }} 
                            className='btn btn-outline-success mb-2 btn-sm btn-block text-dark'>
                            Detail Orders
                        </button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-lg' >
                            <ModalHeader toggle={this.toggle}>Order Details</ModalHeader>
                            <ModalBody>
                                <table className="table table-hover mb-5">
                                    <thead>
                                        <tr className='text-center bg-info text-light'>
                                            <th scope="col">NO</th>
                                            <th scope="col">ORDER_ID</th>
                                            <th scope="col">STATUS</th>
                                            <th scope="col">PRODUCT</th>
                                            <th scope="col">QTY</th>
                                            <th scope="col">PRICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderList2()}
                                    </tbody>
                                </table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>OK</Button>{' '}
                            </ModalFooter>
                        </Modal>
                        <Link to={`/payment/${item.id}`}>
                            <button className='d-inline-block btn btn-outline-dark btn-sm btn-block text-success'>Confirm Payment</button>
                        </Link>
                    </td>
                </tr>
            )
        })
    }

    getOrder = async () => {
        var user_id = cookie.get(`idLogin`)
        const res = await axios.get(`/getallorderuser/${user_id}`)
        return this.setState({orders: res.data})
        // console.log(res);
    }

    componentDidMount = () => {
        this.getOrder()
    }

    render(){
        return(
            <div className="container">
            <h1 className="text-center">Order List</h1>
            <table className="table table-hover mb-5">
                <thead>
                    <tr className='text-center bg-info text-light'>
                        <th scope="col">NO</th>
                        <th scope="col">ID</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">SHIPMENT</th>
                        <th scope="col">PAYMENT</th>
                        <th scope="col">AMOUNT</th>
                        <th scope="col">OPTION</th>
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

export default MyOrder