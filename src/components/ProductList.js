import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import {getProducts} from '../actions/product'
import {onAddToCart} from '../actions/cart'
import { connect } from 'react-redux'
import cookies from 'universal-cookie'
import swal from 'sweetalert'


const cookie = new cookies ()
class ProductList extends Component {

    state = {
        modal: false,
        cek: false
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
            // console.log('ada user');
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
        const qty = this.qty.value
        const cls = 'Wishlist'
        console.log(this.qty);
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
        const item = this.props.item
        return (
            <div className="card col-3 border-0 m-0.5" style={{ width: "25rem" }}>
                <div className='imgHov productListImage'>
                    <img className="pb-3 imgProd card-img-top" src={`http://localhost:2010/manageproduct/list/${item.image}`} style={{ width: '100%' }} alt="Cardcap" />
                    <span className='wishlist'><button type='button' className='btn btn-outline-dark border-0'
                        onClick={() => { this.addToWishlist(item.id) }}>Add to Wishlist <i className="far fa-heart"></i></button></span>
                </div>
                <div className="card-body bodyProd">
                    <Link to={`/detailproduct/${item.id}`} className='text-decoration-none text-dark'><h5>{item.name}</h5></Link>
                    <div className='item'>
                        <span className="price"><i className="fas fa-tag"></i> Rp. {item.price.toLocaleString()}</span>
                        <span className="pcs">Pieces: {item.pieces} Ekor</span>
                    </div>
                    <div className='card-text row rowAdd'>
                        <span className='col-3 qty'>Qty </span>
                        <input className='col-3 tagInput'
                            type="number" ref={input => { this.qty = input; }}
                            defaultValue={1} min='0'
                            max={item.stock}
                        />
                        <button className="offset-2 col-4 btn btn-warning buttonCart"
                            onClick={() => { this.addToCart(item.id) }}
                        >Add <i className="fas fa-shopping-basket"></i>
                        </button>
                        {this.state.cek === true ? <Redirect to ="/register"/>:null}
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Cart</ModalHeader>
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
        )
    }
}

export default connect (null,{onAddToCart })(ProductList)