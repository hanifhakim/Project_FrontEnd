import React, { Component } from 'react';
// import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteCart, changeToWishlist, changeToCart, counterChange, getCartOnly } from '../../actions/cart'
import {  getUsers  } from '../../actions/users'
import cookies from 'universal-cookie'
import swal from 'sweetalert'
import'../../css/cart.css'
import axios from '../../config/axios';
import Footer from '../Footer';
const cookie = new cookies ()

class Cart extends Component{
    state={
        qty:0,
        wishlist:[]
    }

    onDeleteHandler = async (product_id) => {

        const confirm = window.confirm('Mau hapus?')

        if(confirm){
            var user_id = cookie.get('idLogin')
            await this.props.deleteCart(user_id, product_id)
            swal({
                title: "Delete Succedeed!",
                text: "You clicked the button!",
                icon: "success",
                button: "Ok!",
                });
            this.wishList()
            this.onlyCart()
        }
    }

    onChangeToWishlist = async (product_id) => {
        var user_id = cookie.get('idLogin')
        await this.props.changeToWishlist(user_id, product_id)
        this.wishList()
        this.onlyCart()
    }

    onChangeToCart = async (product_id) => {
        var user_id = cookie.get('idLogin')
        await this.props.changeToCart(user_id, product_id)
        this.wishList()
        this.onlyCart()
    }
    
    //plus minus qty
    handleCounterChange = async (newQty, product_id) => {
        var user_id = cookie.get('idLogin')
        await this.props.counterChange(user_id, product_id, newQty)
        this.wishList()
        this.onlyCart()
    }
    
    //minus qty, setstate
    onMinQtyHandler = (qtyProd, product_id) => {
        if(qtyProd === 0){
            return null
        }
        this.setState({qty: qtyProd - 1 },
            ()=>{
                this.handleCounterChange(this.state.qty, product_id)
            })
    }

    //plus qty, setstate
    onPlusQtyHandler = (qtyProd, product_id, stock) => {
        if(qtyProd >= stock){
            return swal({
                title: "Stock unavaiable",
                icon: "error"
              });
        }
        this.setState({qty: qtyProd + 1 },
            ()=>{
                this.handleCounterChange(this.state.qty, product_id)
            })
    }

    componentDidMount = () => {
       this.wishList()
       this.onlyCart()
    }

    //gak ke state, langsung redux
    onlyCart = async () => {
        var user_id = cookie.get('idLogin')
        this.props.getCartOnly(user_id)       
    }

    //setState dulu
    wishList = async () => {
        var user_id = cookie.get('idLogin')
        const res = await axios.get(`/shop/wishlist/${user_id}`)
        // console.log(res.data);
        return this.setState({wishlist: res.data})
    }

    renderCart = () => {
        return this.props.cartOnly.map((item, i) => {
            return (
                <div className='row m-2 border-info border p-4' key={i}>
                    <div className='col-3'>
                        <img className="" src={`http://localhost:2010/manageproduct/list/${item.image}`} 
                        style={{ width: '100%' }} alt="Cardcap" />
                    </div>
                    <div className='col-5'>
                        <div>
                            <h5>{item.name}</h5>
                        </div>
                        <div>
                            <p>Rp. {item.price.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='d-flex justify-content-center'> Qty: 
                            <button onClick={()=> {this.onMinQtyHandler(item.qty, item.id)}}
                                className='border-0 bg-white'><i className="fas fa-minus"></i>
                            </button>
                            <input type='text' className='text-center'
                                onChange={()=>{return null}}
                                value={ item.qty } style={{maxWidth: '50px'}}>                                    
                            </input>
                            <button onClick={() => {this.onPlusQtyHandler(item.qty, item.id, item.stock)}}
                                className='border-0 bg-white'><i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div className='d-flex justify-content-center mt-2'>
                            Total: Rp. {(item.price*item.qty).toLocaleString()}
                        </div>
                        <div className='d-inline-flex'>
                            <button onClick={() => {this.onChangeToWishlist(item.id)}} 
                                className='btnMovewishlistCart'>Move to Wishlist
                            </button>
                            <button onClick={() => {this.onDeleteHandler(item.id)}} 
                                className='btnDeleteCart'>Delete
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderWishlist = () => {
        return this.state.wishlist.map((item, i) => {
            return (
                <div className='row m-2 border-info border p-4' key={i}>
                    <div className='col-3'>
                        <img className="" src={`http://localhost:2010/manageproduct/list/${item.image}`} 
                            style={{ width: '100%' }} alt="Cardcap"/>
                    </div>
                    <div className='col-5'>
                        <div>
                            <h5>{item.name}</h5>
                        </div>
                        <div>
                            <p>Rp. {item.price.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='d-flex justify-content-center'> Qty:
                            <button onClick={() => { this.onMinQtyHandler(item.qty, item.id) }}
                                className='border-0 bg-white'><i className="fas fa-minus"></i>
                            </button>
                            <input type='text' className='text-center'
                                onChange={() => { return null }}
                                value={item.qty} style={{ maxWidth: '50px' }} ></input>
                            <button onClick={() => { this.onPlusQtyHandler(item.qty, item.id, item.stock) }}
                                className='border-0 bg-white'><i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div className='d-inline-flex'>
                            <button onClick={() => {this.onChangeToCart(item.id)}} 
                                className='btnMovewishlistCart'>Add to Cart
                            </button>
                            <button onClick={() => {this.onDeleteHandler(item.id)}} 
                                className='btnDeleteCart'>Delete
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
    }

    orderSummary = () => {
        
        const newCart = this.props.cartOnly
        var totalQty = 0
        for(let i =0; i<newCart.length; i++){
            totalQty += newCart[i].qty
        }
      
        var totalBuy = 0
        for(let i =0; i<newCart.length; i++){
            totalBuy += newCart[i].qty*newCart[i].price
        }
        totalBuy = parseInt(totalBuy).toLocaleString()
        // console.log(typeof(totalBuy));
        

        return(
            <div className='border border-info p-3 m-2'>
                <h5>Subtotal: {totalQty} items</h5>
                <h5>Total Payment: Rp. {totalBuy}</h5>
                <div className='d-flex justify-content-center'>
                    <Link to={{
                        pathname: '/checkout'
                        }} >
                         {totalBuy !== '0' ? (
                            <button className='btn btn-danger'>Proceed to Checkout</button>
                         ): null}   
                        
                    </Link>
                </div>
            </div>
        )
    }

    render(){
        // console.log(this.state.wishlist);
        // console.log(this.props.cartOnly);
        var a = cookie.get('cartUser')
        console.log(a);
        
        return(
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-8'>
                            {this.props.cartOnly.length > 0 ? (
                                <div>
                                    <h4 className='text-center'>
                                        <span className='border-bottom border-dark'>Shopping Cart</span>
                                    </h4>
                                    <div>
                                        {this.renderCart()}
                                    </div>
                                </div>
                                ): (
                                <div>
                                    <h3 className='text-center'>Cart Anda Kosong, <Link to='/product/all'>Click me!</Link></h3>
                                </div>
                            )}
                            {this.state.wishlist.length > 0 ? (
                                <div>
                                    <h4 className='text-center'>
                                        <span className='border-bottom border-dark'>Wishlist</span>
                                    </h4>
                                    <div>
                                        {this.renderWishlist()}
                                    </div>
                                </div>
                                ): null}
                        </div>
                        <div className='col-4'>
                            <h4 className='border border-info p-3 m-2 text-center'>Order Summary</h4>
                            <div>
                                {this.orderSummary()}
                            </div>
                        </div>
                    </div>
                </div>
                    <div className='fixed-bottom'>
                        <Footer/>
                    </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return { 
            cartOnly: state.cart.cartOnly 
        }
  }
  
  export default connect(mapStateToProps, { getUsers, deleteCart, changeToCart, changeToWishlist, counterChange, getCartOnly })(Cart)
  
