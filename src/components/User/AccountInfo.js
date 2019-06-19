import React, { Component } from 'react';
import Cookies from 'universal-cookie'
import {onEditUser, getUsers, onDeleteAvatar} from "../../actions/users"
import {connect} from "react-redux"

const cookie = new Cookies()


class AccountInfo extends Component{
    
    state={
       ava: true,
       defaultAva: require("../../img/user.svg"),
       imagePreview:[] 
    }
    onButtonEdit = async() => {
        const first_name = this.first_name.value
        const last_name = this.last_name.value
        const email = this.email.value
        const password = this.password.value
        const avatar = this.avatar.files[0]
        await this.props.onEditUser(first_name, last_name, email, password, avatar)
        this.props.getUsers()
    }

    onDeleteAva = async(id) => {
        // this.avatar.value = null
        await this.props.onDeleteAvatar(id)
        await this.setState({
            imagePreview:[]
        })
        this.props.getUsers()
    }

    getUser = async () => {
        const user_id = cookie.get('idLogin')
        const res = await this.props.getUsers()
        console.log(res);
        
        const avatar = res.payload.data[0].avatar
        if(avatar){
            await this.setState({
                imagePreview:[ `http://localhost:2010/editprofile/${user_id}/${avatar}`]
            })
        }
    }
    componentDidMount = async () => {
       await this.getUser()
    }
    
    imageChange = (event) => {
        event.preventDefault()

        const imagePreview = URL.createObjectURL(event.target.files[0])
        console.log(imagePreview);

        this.setState({imagePreview: [imagePreview]})
        
    }

    render(){
        // console.log(this.props.edit);

        if(this.props.edit.length !== 0){
            var {first_name, last_name, email, id} = this.props.edit[0]
        }
        
        // console.log(avatar);
        
        return(
            <div className="container">
                <h1>Account Details</h1>
                <div className="form-group">
                    <p>Avatar</p>
                    <div className="card mx-auto" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={this.state.imagePreview.length !== 0  ?
                         this.state.imagePreview[0] :
                         this.state.defaultAva }
                            alt='avatar' />
                    </div>
                    <div className="text-center my-2">
                        <button className='btn btn-outline-dark'
                            onClick={() => { this.setState({ ava: !this.state.ava }) }}>Edit
                        </button>
                    </div>
                    <div hidden={this.state.ava} className=''>
                        <p className='text-center'>Option</p>
                        <div className="text-center">
                            <button className='btn btn-outline-dark mr-3' onClick={()=>{this.onDeleteAva(id)}}>Delete</button>
                            <label className="btn btn-outline-dark m-0">
                                <input multiple="multiple" ref={input => this.avatar = input} type="file" className="d-none" onChange={this.imageChange}/>
                                    Upload Avatar
                            </label>
                            {/* <input className='ml-3' type="file" id="myfile" multiple="multiple" ref={input => this.avatar = input} /> */}
                        </div>
                    </div>
                </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input ref={input => this.first_name = input} type="text" className="form-control" id="name" defaultValue={first_name} />
                    </div>
                    <div className="form-group">
                        <label >Last Name</label>
                        <input ref={input => this.last_name = input} type="text" className="form-control" id="name" defaultValue={last_name} />
                    </div>
                    <div className="form-group">
                        <label >Email address</label>
                        <input ref={input => this.email = input} type="email" className="form-control" id="email" defaultValue={email} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input ref={input => this.password = input} type="password" className="form-control" id="password" />
                    </div>
                <button type="submit" className="btn btn-primary" onClick={this.onButtonEdit}>Submit</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {user: state.auth,
            edit: state.auth.user}
  }
export default connect(mapStateToProps, {onEditUser, getUsers, onDeleteAvatar})(AccountInfo)
