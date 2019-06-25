import React, { Component } from 'react';
import axios from '../../config/axios'

import {Link} from 'react-router-dom'
import {getManageProducts, onDeleteProduct} from '../../actions/product'
import {connect} from 'react-redux'
import '../../css/listproduct.css'
import swal from 'sweetalert'

class ManageListProduct extends Component {

    state={
        products:[]
    }

    getProducts =  async () => {
        const res = await this.props.getManageProducts()
        this.setState({products: res.payload.data})
    }

    componentDidMount =  () => {
       this.getProducts()
    }

    onButtonDelete = async(id) => {
        const confirm = window.confirm('Mau hapus?')
        
        if(confirm){
            await this.props.onDeleteProduct(id)
            swal({
                title: "Delete Succedeed!",
                text: "You clicked the button!",
                icon: "success",
                button: "Ok!",
                });
            this.getProducts()
        }
    }

    renderList = () => {
        return this.state.products.map((item, i)=>{
            return (
                <tr key={item.id} className='text-center'>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>
                        <img className='w' 
                            src={item.image === undefined ? null: `http://localhost:2010/manageproduct/list/${item.image}`} alt="img">
                        </img>
                    </td>
                    <td>{item.stock}</td>
                    <td>
                        <Link to={`/editproduct/${item.id}`}>
                            <button className='d-inline-block btn btn-dark mx-2'>Edit</button>
                        </Link>
                        <button className='d-inline-block btn btn-dark mx-2' 
                            onClick={()=>{this.onButtonDelete(item.id)}}>Delete
                        </button>
                    </td>
                </tr>
            )    
        })
    }

    sortList = async () => {
        var fnsort = document.getElementById('manageSort').value
        // console.log(fnsort);
        if(fnsort === 'A-Z'){                
            const res = await axios.get(`/sortnameasc`)
            this.setState({products: res.data})
        } else if (fnsort === 'Z-A' ){
            const res = await axios.get(`/sortnamedesc`)
            this.setState({products: res.data})
        } else if (fnsort === 'High-Low'){
            const res = await axios.get(`/sortpricedesc`)
            this.setState({products: res.data})
        } else if (fnsort === 'Low-High'){
            const res = await axios.get(`/sortpriceasc`)
            this.setState({products: res.data})
        } else if (fnsort === 'New-Old'){
            const res = await axios.get(`/sortdatedesc`)
            this.setState({products: res.data})
        } else if (fnsort === 'Old-New'){
            const res = await axios.get(`/sortdateasc`)
            this.setState({products: res.data})
        } else {
            this.getProducts()
        } 
    }

    render(){
        return(
            <div className="container">
                <h1 className="text-center">List Product</h1>
                <div className=' d-inline'>
                    <div className="form-group ">
                        <select className="form-control bg-light text-black " id="manageSort" onChange={this.sortList}>
                            <option>Sort</option>
                            <option>A-Z</option>
                            <option>Z-A</option>
                            <option>Low-High</option>
                            <option>High-Low</option>
                            <option>New-Old</option>
                            <option>Old-New</option>
                        </select>
                    </div>
                </div>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr className='text-center bg-dark text-light'>
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