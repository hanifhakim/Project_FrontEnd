import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import cookies from "universal-cookie"

import {keepLogin} from '../actions/users'
import Header from './Header'
import Home from './Home';
import Register from './User/Register';
import { connect } from 'react-redux';
// import Footer from './Footer';
import Product from './Product';
import Cart from './User/Cart';
import ManageAccount from '../components/User/ManageAccount';
import EditAddress from './User/EditAddress';
import ManageProduct from '../components/Admin/ManageProduct';
import EditProduct from './Admin/EditProduct';
import DetailProduct from './DetailProduct';
import Checkout from './User/Checkout';
import Payment from './User/Payment';
import HowToBuy from './HowToBuy';

const cookie = new cookies()
class App extends Component {

    componentDidMount(){
        var userCookie = cookie.get('userLogin')
        var idCookie = cookie.get('idLogin')
        var roleCookie = cookie.get('roleLogin')
        if(userCookie !== undefined){
            // console.log(userCookie);     
            this.props.keepLogin(idCookie,userCookie,roleCookie)
        }
    }

    render(){
        var roleInfo = this.props.roleInfo
        // console.log(roleInfo);
    
        if(roleInfo !== 'admin' ){
            return(
                <BrowserRouter>
                    <div>
                        <Header />
                            <div style={{ marginTop: '70px'}}>
                                <Route path="/" exact component={Home} />
                                <Route path="/register" component={Register} />
                                <Route path="/product/:category" component={Product} />
                                <Route path="/cart" component={Cart} />
                                <Route path="/checkout" component={Checkout} />
                                <Route path="/manageaccount/:info" component={ManageAccount} />
                                <Route path="/editaddress/:selected" component={EditAddress} />
                                <Route path="/payment/:selected" component={Payment} />
                                <Route path="/detailproduct/:selected" component={DetailProduct} />
                                <Route path="/howtobuy" component={HowToBuy} />
                                {/* <Route path="/manageproduct/:selected" component ={AddProduct}/> */}
                            </div>
                            <div style={{position: 'sticky'}}>
                                {/* <Footer /> */}
                            </div>
                    </div>
                </BrowserRouter>
            )
        } else {
            return(
                <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component ={Home}/>
                    <Route path="/register" component ={Register}/>
                    <Route path="/product/:category" component ={Product}/>
                    <Route path="/cart" component ={Cart}/>
                    <Route path="/checkout" component ={Checkout}/>
                    <Route path="/manageproduct/:list" component ={ManageProduct}/>
                    <Route path="/editproduct/:selected" component ={EditProduct}/>
                    <Route path="/payment/:selected" component ={Payment}/>
                    <Route path="/detailproduct/:selected" component ={DetailProduct}/>
                    {/* <Route path="/manageproduct/:selected" component ={AddProduct}/> */}
                    {/* <Footer/> */}
                </div>
                </BrowserRouter>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        roleInfo: state.auth.role
    }
}

export default connect(mapStateToProps, {keepLogin})(App)