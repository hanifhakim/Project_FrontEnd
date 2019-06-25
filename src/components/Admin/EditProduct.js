import React, { Component } from 'react';
import { onEditProduct, getManageProducts } from "../../actions/product";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import '../../css/editproduct.css'

class EditProduct extends Component {

    state={
        radio: '',
        productSelected:[],
        imagePreview:''
    }

    onButtonClick = async() => {
        const name = this.name.value
        const price = this.price.value
        const description = this.description.value
        const stock = this.stock.value
        const pieces = this.pieces.value
        const category = this.state.radio
               
        const image = this.image.files[0] 
        const product_id = this.props.match.params.selected
        
        await this.props.onEditProduct(name, price, description, stock, pieces, category, image, product_id)
        await this.props.getManageProducts()
        this.image.value=null        
    }
    
    imageChange = (event) => {
        event.preventDefault()
        const imagePreview = URL.createObjectURL(event.target.files[0])
        // console.log(imagePreview);
        this.setState({imagePreview: imagePreview})
    }

    checkEdit = () => {
        // console.log(this.props.match.params.selected);
        var arrNew = this.props.editProduct.filter((item)=>{
            return item.id === parseInt(this.props.match.params.selected)
        }) 

        return this.setState({
            productSelected: arrNew,
            radio: arrNew[0].category
        })
    }

    manageProducts = async () => {
        await this.props.getManageProducts()
       
        var arrNew = this.props.editProduct.filter((item)=>{
            return item.id === parseInt(this.props.match.params.selected)
        }) 

        const image = arrNew[0].image
        if(image){
            await this.setState({
                imagePreview:`http://localhost:2010/manageproduct/list/${image}`
            })
        }

    }

    componentDidMount = async () => {
        await this.manageProducts()
        this.checkEdit()
    }

    render() {
        // console.log(this.state.productSelected);
        // console.log(this.props.item[this.props.match.params.selected]);
        if(this.state.productSelected.length !== 0){
            var {name, price, description, stock, pieces} = this.state.productSelected[0]
        }
        
        return (
            <div>
                <div className="container-fluid row mt-3">
                    <div className="col-3">
                        <ul className="list-group-flush listItem">
                            <li className="list-group-item sidebarAccount">
                                <Link to={'/manageproduct/add'} className='list'>
                                    <div>Add Product</div>
                                </Link>
                            </li>
                            <li className="list-group-item sidebarAccount">
                                <Link to={'/manageproduct/list'} className='list'>
                                    <div>List Product</div>
                                </Link>
                            </li>
                            <li className="list-group-item sidebarAccount">
                                <Link to={'/manageproduct/manageorders'}className='list'>
                                    <div>Manage Orders</div>
                                </Link>
                            </li>
                            <li className="list-group-item sidebarAccount">
                                <Link to={'/manageproduct/manageusers'} className='list'>
                                    <div>Manage Users</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-7">
                        <div>
                            <div className="form-group">
                                <form>
                                    <h1 className='text-center'>Edit Product</h1>
                                    <div className="form-group row">
                                        <div className="col-3">
                                            <label>Product Name</label>
                                        </div>
                                        <div className="col-9">
                                        <input type="text" ref={input => { this.name = input; }}
                                            defaultValue={name}
                                            className="form-control" placeholder="type your text" 
                                        />
                                        </div>
                                        <div className="col-3">
                                            <label>Product Price</label>
                                        </div>
                                        <div className="col-9">
                                            <input type="number" ref={input => { this.price = input; }}
                                                defaultValue={price}
                                                className="form-control" placeholder="type your text" 
                                            />
                                        </div>
                                        <div className="col-3">
                                            <label>Product Stock</label>
                                        </div>
                                        <div className="col-9">
                                            <input type="number" ref={input => { this.stock = input; }}
                                                defaultValue={stock}
                                                className="form-control" placeholder="type your text" 
                                            />
                                        </div>
                                        <div className="col-3">
                                            <label>Pieces per kg</label>
                                        </div>
                                        <div className="col-9">
                                            <input type="text" ref={input => { this.pieces = input; }}
                                                defaultValue={pieces}
                                                className="form-control" placeholder="type your text" 
                                            />
                                        </div>
                                        <div className="col-3">
                                             <label>Product Description</label>
                                        </div>
                                        <div className="col-9">
                                            <input type="Text" rows="5" ref={input => { this.description = input; }}
                                                defaultValue={description}
                                                className="form-control" placeholder="type your text" 
                                            />
                                        </div>
                                        <div className="radio col-3">
                                             <label>Select Category</label>
                                        </div>
                                        <div className="col-9">
                                            <label className="radio-inline mx-2">
                                                <input onClick={() => { this.setState({ radio: 'seafood' }) }}
                                                    type="radio" name="optradio"
                                                />Seafood
                                            </label>
                                            <label className="radio-inline mx-2">
                                                <input onClick={() => { this.setState({ radio: 'freshwater' }) }}
                                                    type="radio" name="optradio"
                                                />Freshwater
                                            </label>
                                        </div>
                                        <div className="col-3">
                                             <label>Current Image</label>
                                        </div>
                                        <div className="col-9">
                                             <img className='w-50' 
                                                src={this.state.imagePreview.length !== 0 ? 
                                                    this.state.imagePreview 
                                                    :null} alt="img">
                                             </img>
                                        </div>
                                        <div className="custom-file col-3">
                                             <label>Update Image</label>
                                        </div>
                                        <div className="col-9">
                                            <label className="btn btn-outline-dark m-0">
                                                <input multiple="multiple" 
                                                    ref={input => this.image = input} type="file" className="d-none" 
                                                    onChange={this.imageChange} 
                                                />Update
                                            </label>
                                        </div>
                                    </div>
                                </form>
                                <button type="submit" className="btn btn-primary mx-2" 
                                    onClick={this.onButtonClick}>Submit
                                </button>
                                <Link to='/manageproduct/list'>
                                    <button type="submit" className="btn btn-secondary" >Back</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        editProduct: state.product.products
    }
}

export default connect(mapStateToProps, {onEditProduct, getManageProducts})(EditProduct)