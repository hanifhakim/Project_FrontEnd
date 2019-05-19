import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import {getProducts, onDeleteProduct} from '../actions/product'
import {connect} from 'react-redux'
import '../css/listproduct.css'

class ListProduct extends Component {

    componentDidMount = () => {
        this.props.getProducts()
    }

    onButtonDelete = (id) => {
        this.props.onDeleteProduct(id)
    }
    renderList = () => {
        return this.props.products.map((item, i)=>{
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td><img className='w' src={`http://localhost:2010/manageproduct/list/${item.image}`} alt="img"></img></td>
                    <td>{item.stock}</td>
                    <td>
                    <Link to={`/editproduct/${i}`}><button className='d-inline-block btn btn-dark mx-2'>Edit</button>
                    </Link>
                    <button className='d-inline-block btn btn-dark mx-2' onClick={()=>{this.onButtonDelete(item.id)}}>
                    Delete</button>
                    </td>
                    {/* <td>{`Rp.${item.price.toLocaleString("in")}`}</td>
                    <td>{`Rp.${(item.price*item.quantity).toLocaleString("in")}`}</td> */}
                </tr>
            )
    
        })
    }

    render(){
        return(
            <div className="container">
            <h1 className="text-center">List Product</h1>
            <table className="table table-hover mb-5">
                <thead>
                    <tr className='text-center'>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">CATEGORY</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">IMAGE</th>
                        <th scope="col">STOCK</th>
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

const mapStateToProps = (state) => {
    return{
        products: state.auth.products
    }

}

export default connect (mapStateToProps,{ getProducts, onDeleteProduct})(ListProduct)