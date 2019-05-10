import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import cookies from "universal-cookie"

import {keepLogin} from '../actions/users'
import Header from './Header'
import Home from './Home';
import Register from './Register';
import { connect } from 'react-redux';
import Footer from './Footer';
import Product from './Product';
import Cart from './Cart';
import ManageAccount from './ManageAccount';
import EditAddress from './EditAddress';
import ManageProduct from './ManageProduct';

const cookie = new cookies()
class App extends Component {

    componentDidMount(){
        var userCookie = cookie.get('userLogin')
        if(userCookie !== undefined){
            console.log(userCookie);
            
            this.props.keepLogin(userCookie)
        }
    }

    render(){
        return(
            <BrowserRouter>
            <div>
                <Header/>
                <Route path="/" exact component ={Home}/>
                <Route path="/register" component ={Register}/>
                <Route path="/product" component ={Product}/>
                <Route path="/cart" component ={Cart}/>
                <Route path="/manageaccount/:info" component ={ManageAccount}/>
                <Route path="/editaddress/:selected" component ={EditAddress}/>
                <Route path="/manageproduct" component ={ManageProduct}/>
                <Footer/>
            </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, {keepLogin})(App)