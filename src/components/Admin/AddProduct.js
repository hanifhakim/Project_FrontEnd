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

        // console.log(price);
        
        await this.props.onAddProduct(name, price, description, stock, pieces, category, image)
        
        // return this.setState({radio:''})
        this.name.value = ''
        this.price.value = ''
        this.description.value = ''
        this.stock.value = ''
        this.pieces.value = ''
        // this.state.value = undefined
        this.image.value = null
    }
    render(){
        // console.log(this.state.radio);
        
        return(
            <div className="form-group">
                <form>
                    <h1 className='text-center'>Add Product</h1>
                    <div className="form-group">
                        <div className="">
                            <p>Product Name</p>
                            <input type="text" ref={input => { this.name = input; }}
                                className="form-control inputAdd" placeholder="type your text" />
                        </div>
                        <div className="">
                            <p>Product Price</p>
                            <input type="number" ref={input => { this.price = input; }}
                                className="form-control inputAdd" placeholder="type your text" />
                        </div>
                        <div className="">
                            <p>Product Stock</p>
                            <input type="number" ref={input => { this.stock = input; }}
                                className="form-control inputAdd" placeholder="type your text" />
                        </div>
                        <div className="">
                            <p>Pieces per kg</p>
                            <input type="text" ref={input => { this.pieces = input; }}
                                className="form-control inputAdd" placeholder="type your text" />
                        </div>
                    </div>
                    <div className="form-group">
                        <p>Product Description</p>
                        <textarea className="form-control inputAdd" rows="5" id="comment" ref={input => { this.description = input; }}></textarea>
                    </div>
                    <div className="radio form-group">
                        <p>Select Category</p>
                        <label className="radio-inline mx-2"><input onClick={() => { this.setState({ radio: 'seafood' }) }}
                        type="radio" name="optradio" />Seafood</label>
                        <label className="radio-inline mx-2"><input onClick={() => { this.setState({ radio: 'freshwater' }) }}
                        type="radio" name="optradio" />Freshwater</label>
                    </div>
                    <div className="custom-file">
                        <input type="file" id="myfile" multiple="multiple"  ref={input => this.image = input}/>
                    </div>
                </form>
                <button type="submit" className="btn btn-primary" onClick={this.onButtonClick}>Submit</button>
            </div>
        )
    }
}

export default connect(null, {onAddProduct}) (AddProduct)