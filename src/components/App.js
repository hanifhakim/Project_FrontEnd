import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import cookies from "universal-cookie"

import {keepLogin} from '../actions'
import Header from './Header'
import Home from './Home';
import Register from './Register';
import { connect } from 'react-redux';
// import { connect } from 'http2';
const cookie = new cookies()
class App extends Component {

    componentDidMount(){
        var userCookie = cookie.get('stayLogin')
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
            </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, {keepLogin})(App)