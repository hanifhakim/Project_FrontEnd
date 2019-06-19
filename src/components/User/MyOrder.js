import React, { Component } from 'react';
import axios from '../../config/axios'
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom'

const cookie = new Cookies()


class MyOrder extends Component {

    state = {
        orders:[]
    }
    renderList = () => {
        return this.state.orders.map((item, i)=>{
            return (
                <tr key={item.id}>
                    <td>{i+1}</td>
                    <td>{item.id}</td>
                    <td>{item.order_status}</td>
                    <td>{item.name}</td>
                    <td>{item.order_quantity}</td>
                    <td>{item.shipment_methods}</td>
                    <td>{item.payment_methods}</td>
                    <td>{item.price_item}</td>
                    <td>
                    <Link to={`/payment/${item.id}`}><button className='d-inline-block btn btn-dark mx-2'>Confirm Payment</button>
                    </Link>
                    </td>
                </tr>
            )
    
        })
        
    }

    getOrder = async () => {
        var user_id = cookie.get(`idLogin`)
        const res = await axios.get(`/getorder/${user_id}`)
        return this.setState({orders: res.data})
        
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
                    <tr className='text-center'>
                        <th scope="col">NO</th>
                        <th scope="col">ORDER_ID</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">PRODUCT</th>
                        <th scope="col">QTY</th>
                        <th scope="col">SHIPMENT</th>
                        <th scope="col">PAYMENT</th>
                        <th scope="col">PRICE</th>
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