import React, { Component } from 'react';
// import {Link} from 'react-router-dom'
import axios from '../config/axios'

import '../css/detailproduct.css'
class DetailProduct extends Component {

    state = {
        item : {},
        cek: false
    }

    componentDidMount = async () => {
        try {
            const product_id = parseInt(this.props.match.params.selected)
            const res = await axios.get(`/detailproduct/${product_id}`)
            this.setState({item: res.data[0]})
        } catch (e) {
            console.log(e);
            
        }
    }

    render(){
        const {item} = this.state
        console.log(this.state);
        
        return (
            <div className='row'>
                <div className='col-3'>
                </div>
                <div className="col-9 container" style={{ width: "25rem" }}>
                    <h1>DetailProduct</h1>
                    <div className='row'>
                        <div className='col-4 mt-5'>
                            <img className="" src={`http://localhost:2010/manageproduct/list/${item.image}`} style={{ width: '100%' }} alt="Cardcap" />
                        </div>
                        <div className="col-8 mt-5">
                            <div className='container'>
                                <h3 className='d-inline display-5'>{item.name}</h3>
                                <span className='wishlist'>
                                    <button type='button' className='btn btn-outline-dark border-0'>Add to Wishlist <i class="far fa-heart"></i></button>
                                </span>
                            </div>
                            <div className='itemDet'>
                                <span className="priceDet"><i className="fas fa-tag"></i> Rp. {item.price === undefined ?  item.price : item.price.toLocaleString()}</span>
                                <span className="pcsDet">Pieces: {item.pieces} Ekor</span>
                            </div>
                            <div>
                                <h6>Product Description</h6>
                                <p className='lead'>{item.description}</p>
                            </div>
                            <div className='row'>
                                <span className='col-2 qtyDet'>Qty </span>
                                <input className='col-3 tagInputDet' type='number' defaultValue='1' min='0' max={item.stock}></input>
                                <button className="col-4 btn btn-warning addCart">Add <i class="fas fa-shopping-basket"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailProduct