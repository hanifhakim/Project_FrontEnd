import React, { Component } from 'react';
import axios from '../../config/axios'


class ManageUsers extends Component {
    
    state={
        users:[],
        defaultAva: require("../../img/user.svg")
    }

    deleteUser = async (user_id) => {
        await axios.delete(`/users/${user_id}`)
        this.getAllUsers()
    }
    
    deleteAva = async (user_id) => {
        await axios.delete(`/users/deleteAva/${user_id}`)
        this.getAllUsers()
    }

    getAllUsers = async () => {
        const res = await axios.get(`/allusers`)
        this.setState({
            users: res.data
        })
        // console.log(res.data);
        
    }

    renderList = () => {
        return this.state.users.map((item, i)=>{
            return (
                <tr className='text-center' key={item.id}>
                    <td>{i+1}</td>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>
                        <img className='w2' src={ 
                            item.avatar === null ? this.state.defaultAva 
                            :`http://localhost:2010/editprofile/${item.id}/${item.avatar}`} alt="img"></img>
                    </td>
                    <td className='d-flex flex-column'>
                        <button onClick={()=>{this.deleteUser(item.id)}} className='btn btn-dark m-2 btn-sm'>Delete Users</button>
                        <button onClick={()=>{this.deleteAva(item.id)}} className='btn btn-danger m-2 btn-sm'>Delete Avatar</button>
                    </td>
                </tr>
            )
    
        })
        
    }

    componentDidMount = () => {
        this.getAllUsers()
    }

    render(){
        // console.log(this.state.users);
        
        return(
            <div className="container">
                <h1 className="text-center">List Users</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">NO</th>
                            <th scope="col">ID</th>
                            <th scope="col">USERNAME</th>
                            <th scope="col">FIRST_NAME</th>
                            <th scope="col">LAST_NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">AVATAR</th>
                            <th scope="col" style={{ width: '200px' }} className='border-bottom-0'>OPTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ManageUsers