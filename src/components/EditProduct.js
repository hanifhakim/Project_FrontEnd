import React, { Component } from 'react';
import { onEditProduct } from "../actions/product";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


import '../css/editproduct.css'


class EditProduct extends Component {

    state={
        radio: this.props.item[this.props.match.params.selected].category
    }

    onButtonClick = () => {
        
        
        const name = this.name.value
        const price = this.price.value
        const description = this.description.value
        const stock = this.stock.value
        const pieces = this.pieces.value
        const category = this.state.radio
        const image = this.image.files[0] 
        const product_id = this.props.item[this.props.match.params.selected].id
        
        this.props.onEditProduct(name, price, description, stock, pieces, category, image, product_id)
        
    }
    render() {
        console.log(this.props);
        console.log(this.props.item[this.props.match.params.selected]);
        const {name, price, description, stock, pieces, image} = this.props.item[this.props.match.params.selected]
        
        return (
            <div>
                <div className="container-fluid row mt-3">
                    <div className="col-3">
                        <ul className="list-group-flush listItem">
                            <li className="list-group-item sidebarAccount">
                                <Link to={'/manageproduct/add'} className='text-decoration-none p'><div>Add Product</div></Link>
                            </li>
                            <li className="list-group-item sidebarAccount">
                                <Link to={'/manageproduct/list'} className='text-decoration-none p'><div>List Product</div></Link>
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
                                                className="form-control" placeholder="type your text" />
                                        </div>
                                        <div className="col-3">
                                            <label>Product Price</label>
                                        </div>
                                        <div className="col-9">
                                        <input type="number" ref={input => { this.price = input; }}
                                                defaultValue={price}
                                                className="form-control" placeholder="type your text" />
                                        </div>
                                        <div className="col-3">
                                            <label>Product Stock</label>
                                        </div>
                                        <div className="col-9">
                                        <input type="number" ref={input => { this.stock = input; }}
                                                defaultValue={stock}
                                                className="form-control" placeholder="type your text" />
                                        </div>
                                        <div className="col-3">
                                            <label>Pieces per kg</label>
                                        </div>
                                        <div className="col-9">
                                        <input type="text" ref={input => { this.pieces = input; }}
                                                defaultValue={pieces}
                                                className="form-control" placeholder="type your text" />
                                        </div>
                                        <div className="col-3">
                                             <label>Product Description</label>
                                        </div>
                                        <div className="col-9">
                                        <input type="Text" rows="5" ref={input => { this.description = input; }}
                                                defaultValue={description}
                                                className="form-control" placeholder="type your text" />
                                        </div>
                                        <div className="radio col-3">
                                             <label>Select Category</label>
                                        </div>
                                        <div className="col-9">
                                        <label className="radio-inline mx-2"><input onClick={() => { this.setState({ radio: 'seafood' }) }}
                                            type="radio" name="optradio" />Seafood</label>
                                        <label className="radio-inline mx-2"><input onClick={() => { this.setState({ radio: 'freshwater' }) }}
                                            type="radio" name="optradio" />Freshwater</label>
                                        </div>
                                        <div className="col-3">
                                             <label>Current Image</label>
                                        </div>
                                        <div className="col-9">
                                             <img className='w-50' src={`http://localhost:2010/manageproduct/list/${image}`} alt="img"></img>
                                        </div>
                                        <div className="custom-file col-3">
                                             <label>Update Image</label>
                                        </div>
                                        <div className="col-9">
                                            <input type="file" id="myfile" multiple="multiple" ref={input => this.image = input} />
                                        </div>
                                    </div>
                                    {/* <div className="radio">
                                        <label className='d-block'>Select Category</label>
                                        <label className="radio-inline mx-2"><input onClick={() => { this.setState({ radio: 'seafood' }) }}
                                            type="radio" name="optradio" />Seafood</label>
                                        <label className="radio-inline mx-2"><input onClick={() => { this.setState({ radio: 'freshwater' }) }}
                                            type="radio" name="optradio" />Freshwater</label>
                                    </div> */}
                                </form>
                                <button type="submit" className="btn btn-primary mx-2" onClick={this.onButtonClick}>Submit</button>
                                <Link to='/manageproduct/list'><button type="submit" className="btn btn-secondary" >Back</button></Link>
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
        item: state.auth.products
    }
}

export default connect(mapStateToProps, {onEditProduct})(EditProduct)