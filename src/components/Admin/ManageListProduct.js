import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import {getManageProducts, onDeleteProduct} from '../../actions/product'
import {connect} from 'react-redux'
import '../../css/listproduct.css'

class ManageListProduct extends Component {

    componentDidMount = () => {
        this.props.getManageProducts()
    }

    onButtonDelete = async(id) => {
       await this.props.onDeleteProduct(id)
        this.props.getManageProducts()
    }
    renderList = () => {
        return this.props.products.map((item, i)=>{
            return (
                <tr key={item.id} className='text-center'>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td><img className='w' src={item.image === undefined ? null: `http://localhost:2010/manageproduct/list/${item.image}`} alt="img"></img></td>
                    <td>{item.stock}</td>
                    <td>
                        <Link to={`/editproduct/${item.id}`}>
                            <button className='d-inline-block btn btn-dark mx-2'>Edit</button>
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
                            <th scope="col" style={{ width: '200px' }}>OPTION</th>
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
        products: state.product.products
    }

}

export default connect (mapStateToProps,{ getManageProducts, onDeleteProduct})(ManageListProduct)