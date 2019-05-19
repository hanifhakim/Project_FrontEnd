import React, { Component } from 'react';
// import Cookies from 'universal-cookie'
import {onEditUser, getUsers, onDeleteAvatar} from "../actions/users"
import {connect} from "react-redux"

// const cookie = new Cookies()


class AccountInfo extends Component{
    
    state={
       ava: 'https://www.marketingmuses.com/wp-content/uploads/2018/01/invis-user.png'
    }
    onButtonClick = (ava) => {
        const first_name = this.first_name.value
        const last_name = this.last_name.value
        const email = this.email.value
        const password = this.password.value
        const avatar = this.avatar.files[0] || ava
        this.props.onEditUser(first_name, last_name, email, password, avatar)
    }

    onDeleteAva = (id) => {
        this.props.onDeleteAvatar(id)
    }


    render(){
        console.log(this.props.edit);

        if(this.props.edit.length !== 0){
            var {first_name, last_name, email, avatar, id} = this.props.edit[0]
        }
        
        return(
            <div className="container">
                <h1>Account Details</h1>
                <div className="form-group">
                    <p>Avatar</p>
                    <div class="card mx-auto" style={{ width: "18rem" }}>
                        <img class="card-img-top" src={avatar ? `http://localhost:2010/editprofile/${id}/${avatar}` : this.state.ava }
                            alt='avatar' />
                        <div class="card-body mx-auto"><button className='btn btn-outline-dark'
                            onClick={() => { this.setState({ ava: !this.state.ava }) }}>Edit</button></div>
                    </div>
                    <div hidden={this.state.ava} className=''>
                        <p className='text-center'>Option</p>
                        <div className="text-center">
                            <button className='btn btn-outline-dark mr-3' onClick={()=>{this.onDeleteAva(id)}}>Delete</button>
                            <input className='ml-3' type="file" id="myfile" multiple="multiple" ref={input => this.avatar = input} />
                        </div>
                    </div>
                </div>
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
                        <input ref={input => this.email = input} type="email" className="form-control" id="email" defaultValue={email} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input ref={input => this.password = input} type="password" className="form-control" id="password" />
                    </div>
                <button type="submit" className="btn btn-primary" onClick={()=>{this.onButtonClick(avatar)}}>Submit</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {user: state.auth,
            edit: state.auth.user}
  }
export default connect(mapStateToProps, {onEditUser, getUsers, onDeleteAvatar})(AccountInfo)
