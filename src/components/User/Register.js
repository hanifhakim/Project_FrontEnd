import React, { Component } from "react";

import {onRegistClick, onLoggedIn} from "../../actions/users"
import { Redirect } from "react-router-dom";
import {connect} from "react-redux"
import Cookies from 'universal-cookie'

const cookie = new Cookies()

class Register extends Component{
    
    state={
        submit: true,
        regist: true
    }

    registUser = async () => {
        const user = this.usernameRegist.value
        const first_name = this.first_name.value
        const last_name = this.last_name.value
        const email = this.emailRegist.value
        const password = this.passwordRegist.value
      
        var res = await this.props.onRegistClick(user, first_name, last_name, email, password)

        this.usernameRegist.value = ''
        this.first_name.value = ''
        this.last_name.value = ''
        this.emailRegist.value = ''
        this.passwordRegist.value = ''

        if(res.payload){
            return null
        } else {
            await this.setState({
                regist: !this.state.regist
            })
        }
    }

    onRegistClick = async () => {
           
        await this.setState({
            regist: !this.state.regist
        })

        setTimeout(() => {
            this.registUser()
          }, 2000);
  
       
    }

    loginUser = async () => {
        const user = this.username.value
        const pass = this.password.value

        var res = await this.props.onLoggedIn(user, pass)
        if(res.payload){
            return null
        } else {
            // await this.setState({
            //     submit: !this.state.submit
            // })
        }
        
    }
    onLoginClick = async () =>{
            
        // await this.setState({
        //     submit: !this.state.submit
        // })
      
        setTimeout(() => {
          this.loginUser()
        }, 2000);

        
    }
    // errorLogin = () => {
    //     if(this.props.user.errorLogin !== ""){
    //         this.username.value = ""
    //         this.password.value = ""
    //         return (
    //             <div className="alert alert-danger mt-2" role="alert">
    //                 {this.props.user.errorLogin}
    //             </div>
    //           )
    //     } else {
    //           return null
    //     }
    // }

    // onErrorRegist = () => {
    //     if(this.props.user.errorRegist !== ""){
    //         this.usernameRegist.value = ""
    //         this.emailRegist.value = ""
    //         this.passwordRegist.value = ""
    //         return (
    //             <div className="alert alert-danger mt-2" role="alert">
    //                 {this.props.user.errorRegist}
    //             </div>
    //           )
    //     } else if (this.props.user.errorRegist === "" && this.props.user.successRegist !== ""){
    //     this.usernameRegist.value = ""
    //     this.emailRegist.value = ""
    //     this.passwordRegist.value = ""
    //         return (
    //             <div className="alert alert-success mt-2" role="alert">
    //                 {this.props.user.successRegist}
    //             </div>
    //           )
    //     } else {
    //         return
    //     }
    // }


    render() {
        if(cookie.get('idLogin') === undefined){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 mt-5 border border-info p-5">
                            <form>
                                <h2 className="display-5">Sign in</h2>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" ref={input => { this.username = input; }}
                                        className="form-control" placeholder="type your username" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" ref={input => { this.password = input; }}
                                        className="form-control" placeholder="type your password" />
                                </div>
                            </form>
                            {/* {this.errorLogin()} */}
                            <button onClick={()=>{this.onLoginClick()}}
                                className="btn btn-dark btn-block">Submit
                            </button>
                            <div hidden={this.state.submit} className='mt-1'>
                                <span className="spinner-grow text-dark"></span>
                                <span className="spinner-grow text-dark"></span>
                                <span className="spinner-grow text-dark"></span>
                                <span className="spinner-grow text-dark"></span>
                            </div>
                        </div>
                        <div className="col-sm-6 mt-5 border border-info p-5 ml-auto">
                            <form>
                                <h2 className="display-5 mb-5">Create account</h2>
                                <div className="text-center">
                                    <div className="d-inline-block">
                                        <i className="fas fa-shipping-fast"></i><p className="lead mx-2">Fast-shipping</p>
                                    </div>
                                    <div className="d-inline-block">
                                        <i className="fas fa-hand-holding-usd"></i><p className="lead mx-2">Save money</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text"
                                        ref={input => { this.usernameRegist = input; }}
                                        className="form-control" placeholder="type your username" />
                                </div>
                                <div className="form-group row">
                                    <div className="col-6">
                                        <div>First Name</div>
                                        <input type="text" ref={input => { this.first_name = input; }}
                                            className="form-control" placeholder="type your text" /></div>
                                    <div className="col-6">
                                        <div>Last Name</div>
                                        <input type="text" ref={input => { this.last_name = input; }}
                                            className="form-control" placeholder="type your text" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email"
                                        ref={input => { this.emailRegist = input; }}
                                        className="form-control" placeholder="name@example.com" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password"
                                        ref={input => { this.passwordRegist = input; }}
                                        className="form-control" placeholder="type your password" />
                                </div>
                            </form>
                            {/* {this.onErrorRegist()} */}
                            <button onClick={()=>{this.onRegistClick()}}
                                className="btn btn-dark btn-block">Create account
                            </button>
                            <div hidden={this.state.regist} className='mt-1 text-center'>
                                <span className="spinner-grow text-dark"></span>
                                <span className="spinner-grow text-dark"></span>
                                <span className="spinner-grow text-dark"></span>
                                <span className="spinner-grow text-dark"></span>
                            </div>
                        </div>
                    </div>
                </div>
            )
            
        }
        
        return <Redirect to='/'/>
        
    }
}

const mapStateToProps = (state) => {
    return {user: state.auth}
  }
export default connect(mapStateToProps, {onLoggedIn,onRegistClick})(Register)