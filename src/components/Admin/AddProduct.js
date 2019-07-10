import React, { Component } from 'react';

import {onAddProduct} from '../../actions/product'
import { connect } from "react-redux";

import '../../css/addproduct.css'

class AddProduct extends Component {

    state={
        radio:''
    }

    onButtonClick = async () => {
        
        const name = this.name.value
        const price = this.price.value
        const description = this.description.value
        const stock = this.stock.value
        const pieces = this.pieces.value
        const category = this.state.radio
        const image = this.image.files[0]

        await this.props.onAddProduct(name, price, description, stock, pieces, category, image)
        
        this.name.value = ''
        this.price.value = ''
        this.description.value = ''
        this.stock.value = ''
        this.pieces.value = ''
        this.image.value = null
    }
    
    render(){
        // console.log(this.state.radio);        
        return(
            <div>
                <div className="form-group">
                    <form>
                        <h1 className='text-center'>Add Product</h1>
                        <div className="form-group">
                            <div>
                                <p className='addProdInput'>Product Name</p>
                                <input type="text" ref={input => { this.name = input; }}
                                    className="form-control inputAdd" placeholder="type your text" 
                                />
                            </div>
                            <div>
                                <p className='addProdInput'>Product Price</p>
                                <input type="number" ref={input => { this.price = input; }}
                                    className="form-control inputAdd" placeholder="type your text" 
                                />
                            </div>
                            <div>
                                <p className='addProdInput'>Product Stock</p>
                                <input type="number" ref={input => { this.stock = input; }}
                                    className="form-control inputAdd" placeholder="type your text" 
                                />
                            </div>
                            <div>
                                <p className='addProdInput'>Pieces per kg</p>
                                <input type="text" ref={input => { this.pieces = input; }}
                                    className="form-control inputAdd" placeholder="type your text" 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <p className='addProdInput'>Product Description</p>
                            <textarea className="form-control inputAdd" rows="5" 
                                id="comment" ref={input => { this.description = input; }}>                            
                            </textarea>
                        </div>
                        <div className="radio form-group">
                            <p className='addProdInput'>Select Category</p>
                            <label className="radio-inline mx-2">
                                <input onClick={() => { this.setState({ radio: 'seafood' }) }}
                                type="radio" name="optradio" />Seafood
                            </label>
                            <label className="radio-inline mx-2">
                                <input onClick={() => { this.setState({ radio: 'freshwater' }) }}
                                type="radio" name="optradio" />Freshwater
                            </label>
                        </div>
                        <div className="custom-file">
                            <input type="file" id="myfile" multiple="multiple" ref={input => this.image = input}
                            />
                        </div>
                    </form>
                    <button type="submit" className="btn btn-outline-dark" 
                        onClick={this.onButtonClick}>Submit
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(null, {onAddProduct}) (AddProduct)