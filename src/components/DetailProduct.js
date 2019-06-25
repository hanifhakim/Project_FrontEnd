import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {onAddToCart} from '../actions/cart'
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import axios from '../config/axios'
import cookies from 'universal-cookie'
import swal from 'sweetalert'

import '../css/detailproduct.css'

const cookie =  new cookies ()

class DetailProduct extends Component {

    state = {
        item : {},
        cek: false,
        modal: false
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
   

    toggle = () =>{
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }
 
    addToCart = async(prod_id) => {
        const user_id = cookie.get('idLogin')
        const product_id = prod_id
        const qty = parseInt(this.qty.value)
        const cls = 'Cart'
        // console.log(this.qty.value);
        // console.log(user_id);
        if (user_id ) {
            await this.props.onAddToCart(user_id, product_id, qty, cls)
            this.toggle()
        } else {
            //     console.log('tidak ada user');
            await this.setState({ cek: !this.state.cek })
            return swal({
                title: "You must login first",
                icon: "error"
            });
        }

    }

    addToWishlist = async (prod_id) => {
        const user_id = cookie.get('idLogin')
        const product_id = prod_id
        const qty = parseInt(this.qty.value)
        const cls = 'Wishlist'
        // console.log(this.qty);
      
        if(user_id){
            this.props.onAddToCart(user_id, product_id, qty, cls)
        } else {
            await this.setState({ cek: !this.state.cek })
            return swal({
                title: "You must login first",
                icon: "error"
            });
        }
    }

    render(){
        const {item} = this.state
        // console.log(this.state);
        
        return (
            <div className='row'>
                <div className="offset-2 col-9 container" style={{ width: "25rem" }}>
                    <h1 className='text-center border-bottom border-warning'>Product Details</h1>
                    <div className='row'>
                        <div className='col-4 mt-5'>
                            <img className="" src={item.image !== undefined ? `http://localhost:2010/manageproduct/list/${item.image}` : null} style={{ width: '100%' }} alt="Cardcap" />
                        </div>
                        <div className="col-8 mt-5">
                            <div className='container'>
                                <h3 className='d-inline display-5'>{item.name}</h3>
                                <span className='d-flex justify-content-end'>
                                    <button type='button'  onClick={() => { this.addToWishlist(item.id) }}
                                        className='btn btn-outline-dark border-0'>Add to Wishlist <i className="far fa-heart"></i>
                                    </button>
                                </span>
                            </div>
                            <div className='itemDet'>
                                <span className="priceDet">
                                    <i className="fas fa-tag"></i> Rp. {item.price === undefined ?  item.price : item.price.toLocaleString()}
                                </span>
                                <span className="pcsDet">Pieces: {item.pieces} Ekor</span>
                            </div>
                            <div style={{width:'100%'}}>
                                <h6>Product Description</h6>
                                <p className='lead'>{item.description}</p>
                            </div>
                            <div className='row'>
                                <span className='col-2 qtyDet'>Qty </span>
                                <input className='col-3 tagInputDet' type='number' ref={input => { this.qty = input; }}
                                    defaultValue='1' min='0' max={item.stock}>
                                </input>
                                <button onClick={() => { this.addToCart(item.id) }} 
                                    className="offset-2 col-4 btn btn-warning" >Add
                                    <i className="fas fa-shopping-basket"></i>
                                </button>
                                {this.state.cek === true ? <Redirect to ="/register"/>:null}
                            </div>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Cart & Wishlist</ModalHeader>
                                <ModalBody>
                                    Item berhasil ditambahkan, ingin belanja lagi ?
                            </ModalBody>
                                <ModalFooter>
                                    <Link to='/cart'>
                                        <Button color="secondary" onClick={this.toggle}>Tidak</Button>
                                    </Link>
                                    <Button color="primary" onClick={this.toggle}>Ya</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect (null,{onAddToCart })(DetailProduct)