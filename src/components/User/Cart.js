import React, { Component } from 'react';
// import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCart, deleteCart, changeToWishlist, changeToCart, counterChange } from '../../actions/cart'
import {  getUsers  } from '../../actions/users'
import cookies from 'universal-cookie'
import swal from 'sweetalert'
import'../../css/cart.css'
const cookie = new cookies ()

class Cart extends Component{
    state={
        cart:[],
        qty:0,
        cartOnly:[]
    }

    onDeleteHandler = async (product_id) => {
        var user_id = cookie.get('idLogin')
        await this.props.deleteCart(user_id, product_id)
        this.getCartUser()
    }

    onChangeToWishlist = async (product_id) => {
        var user_id = cookie.get('idLogin')
        await this.props.changeToWishlist(user_id, product_id)
        this.getCartUser()
    }

    onChangeToCart = async (product_id) => {
        var user_id = cookie.get('idLogin')
        await this.props.changeToCart(user_id, product_id)
        this.getCartUser()
    }

    handleCounterChange = async (newQty, product_id) => {
        var user_id = cookie.get('idLogin')
        await this.props.counterChange(user_id, product_id, newQty)
        this.getCartUser()
    }
    
    onMinQtyHandler = (qtyProd, product_id) => {
        if(qtyProd === 0){
            return null
        }
        this.setState({qty: qtyProd - 1 },
            ()=>{
                this.handleCounterChange(this.state.qty, product_id)
            })
    }

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

    getCartUser = async() => {
        var id = cookie.get('idLogin')
        const res= await this.props.getCart(id)
        // console.log(res.payload.data);
       await this.setState({cart: res.payload.data})
    //    console.log(this.state.cart);
       
        // this.setState({qty: res.payload.data.qty})
    }

    componentDidMount = () => {
        this.getCartUser()
    }

    renderCart = () => {
        const newCart = this.state.cart.filter((item) => {
            return item.cls === 'Cart'
        }) 
        // console.log(newCart);
        return newCart.map((item, i) => {
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
                                value={ item.qty } style={{maxWidth: '50px'}} ></input>
                                <button onClick={() => {this.onPlusQtyHandler(item.qty, item.id, item.stock)}}
                                className='border-0 bg-white'><i className="fas fa-plus"></i>
                                </button>
                        </div>
                        <div className='d-flex justify-content-center mt-2'>
                            Total: Rp. {(item.price*item.qty).toLocaleString()}
                        </div>
                        <div className='d-inline-flex'>
                            <button onClick={() => {this.onChangeToWishlist(item.id)}} className='btnMovewishlistCart'>Move to Wishlist</button>
                            <button onClick={() => {this.onDeleteHandler(item.id)}} className='btnDeleteCart'>Delete</button>
                        </div>
                    </div>
                </div>
            )
        })
        
    }

    wishList = () => {
        
        const newWishlist = this.state.cart.filter((item) => {
            return item.cls === 'Wishlist'
        })
        // console.log(newWishlist);

        return newWishlist.map((item, i) => {
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
                                value={item.qty} style={{maxWidth: '50px'}} ></input>
                                <button onClick={()=> {this.onPlusQtyHandler(item.qty, item.id, item.stock)}}
                                className='border-0 bg-white'><i className="fas fa-plus"></i>
                                </button>
                        </div>
                        <div className='d-inline-flex'>
                            <button onClick={() => {this.onChangeToCart(item.id)}} className='btnMovewishlistCart'>Add to Cart</button>
                            <button onClick={() => {this.onDeleteHandler(item.id)}} className='btnDeleteCart'>Delete</button>
                        </div>
                    </div>
                </div>
            )
        })
    }

    orderSummary = () => {
        
        const newCart = this.state.cart.filter((item) => {
            return item.cls === 'Cart'
        })

        var totalQty = 0
        for(let i =0; i<newCart.length; i++){
            totalQty += newCart[i].qty
        }
      
        var totalBuy = 0
        for(let i =0; i<newCart.length; i++){
            totalBuy += newCart[i].qty*newCart[i].price
        }
        totalBuy = totalBuy.toLocaleString()

        return(
            <div className='border border-info p-3 m-2'>
                <h5>Subtotal: {totalQty} items</h5>
                <h5>Total Payment: Rp. {totalBuy}</h5>
                <div className='d-flex justify-content-center'>
                    <Link to={{
                        pathname: '/checkout'
                    }} ><button className='btn btn-danger'>Proceed to Checkout</button></Link>
                </div>
            </div>
        )
    }

    render(){
        // console.log(this.state.qty);
        return(
            <div className='container'>
                <h4>Shopping Cart</h4>
                <div className='row'>
                    <div className='col-8'>
                        <div>
                            {this.renderCart()}
                        </div>
                        <h4>Wishlist</h4>
                        <div>
                            {this.wishList()}
                        </div>
                    </div>
                    <div className='col-4'>
                        <h4 className='border border-info p-3 m-2 text-center'>Order Summary</h4>
                        <div>
                            {this.orderSummary()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return { carts : state.cart.carts }
//   }
  
  export default connect(null, { getCart, getUsers, deleteCart, changeToCart, changeToWishlist, counterChange })(Cart)
  
