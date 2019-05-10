import React, { Component } from 'react';
// import Cookies from 'universal-cookie'
import {onEditUser, getUsers} from "../actions/users"
import {connect} from "react-redux"

// const cookie = new Cookies()


class AccountInfo extends Component{

    onButtonClick = () => {
        const first_name = this.first_name.value
        const last_name = this.last_name.value
        const email = this.email.value
        const password = this.password.value
        this.props.onEditUser(first_name, last_name, email, password)
    }


    render(){
        console.log(this.props.edit);

        if(this.props.edit.length !== 0){
            var {first_name, last_name, email} = this.props.edit[0]
        }
        
        return(
            <div className="container">
                <form>
                    <h1>Account Details</h1>
                <div className="form-group">
                    <label for="name">First Name</label>
                    <input ref={input => this.first_name = input} type="text" className="form-control" id="name" defaultValue={first_name} />
                </div>
                <div className="form-group">
                    <label for="name">Last Name</label>
                    <input ref={input => this.last_name = input} type="text" className="form-control" id="name" defaultValue={last_name} />
                </div>
                <div className="form-group">
                    <label for="email">Email address</label>
                    <input ref={input => this.email = input} type="email" className="form-control" id="email" defaultValue={email}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input ref={input => this.password = input} type="password" className="form-control" id="password"/>
                </div>
                </form>
                <button type="submit" className="btn btn-primary" onClick={this.onButtonClick}>Submit</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {user: state.auth,
            edit: state.auth.user}
  }
export default connect(mapStateToProps, {onEditUser, getUsers})(AccountInfo)
