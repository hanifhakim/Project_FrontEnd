import React, { Component } from "react";

import {onRegistClick} from "../actions"
import {connect} from "react-redux"

class Register extends Component{

    onRegistertClick = () => {
        const user = this.username.value
        const email = this.email.value
        const password = this.password.value

        this.props.onRegistClick(user, email, password)

       
    }

    render() {
        return (
            <div>
                <div>
                    <div className="mt-5 row">
                        <div className="col-sm-3 mx-auto card bg-info">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1 className="display-3 text-white">Register</h1>
                                </div>
                                <div className="card-title mt-1 text-white">
                                    <h4>Username</h4>
                                </div>
                                <form className="input-group">
                                    <input ref={input => { this.username = input }} className="form-control" type="text" />
                                </form>
                                <div className="card-title mt-1 text-white">
                                    <h4>Email</h4>
                                </div>
                                <form className="input-group">
                                    <input ref={input => { this.email = input }} className="form-control" type="email" />
                                </form>
                                <div className="card-title mt-1 text-white">
                                    <h4>Password</h4>
                                </div>
                                <form className="input-group">
                                    <input ref={input => { this.password = input }} className="form-control" type="password" />
                                </form>
                                <button className="btn btn-light btn-block mt-5"
                                    onClick={this.onRegistertClick}>Register</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {onRegistClick})(Register)