import React, { Component } from 'react';
import axios from '../../config/axios'


class ManageUsers extends Component {
    
    state={
        users:[],
        defaultAva: require("../../img/user.svg")
    }

    deleteUser = async (user_id) => {

        const confirm = window.confirm('Mau hapus?')
        
        if(confirm){
            await axios.delete(`/users/${user_id}`)
            this.getAllUsers()
        }
       
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

    componentDidMount = () => {
        this.getAllUsers()
    }

    sortList = async () => {
        var fnsort = document.getElementById('manageSort').value
        console.log(fnsort);
        if(fnsort === 'Username'){                
            const res = await axios.get(`/sortusername`)
            this.setState({users: res.data})
        } else if (fnsort === 'First Name' ){
            const res = await axios.get(`/sortfirstname`)
            this.setState({users: res.data})
        } else if (fnsort === 'Last Name'){
            const res = await axios.get(`/sortlastname`)
            this.setState({users: res.data})
        } else if (fnsort === 'Avatar'){
            const res = await axios.get(`/sortavatar`)
            this.setState({users: res.data})
        } else if (fnsort === 'New-Old'){
            const res = await axios.get(`/sortuserdatedesc`)
            this.setState({users: res.data})
        } else if (fnsort === 'Old-New'){
            const res = await axios.get(`/sortuserrdateasc`)
            this.setState({users: res.data})
        } else {
            this.getAllUsers()
        }
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
                        <img className='w2' 
                            src={item.avatar === null ? this.state.defaultAva 
                            :`http://localhost:2010/editprofile/${item.id}/${item.avatar}`} alt="img">
                        </img>
                    </td>
                    <td className='d-flex flex-column'>
                        <button onClick={()=>{this.deleteUser(item.id)}} 
                            className='btn btn-dark m-2 btn-sm'>Delete Users
                        </button>
                        <button onClick={()=>{this.deleteAva(item.id)}} 
                            className='btn btn-danger m-2 btn-sm'>Delete Avatar
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        // console.log(this.state.users);
        return(
            <div className="container">
                <h1 className="text-center">List Users</h1>
                <div className=' d-inline'>
                    <div className="form-group ">
                        <select className="form-control bg-light text-black " id="manageSort" onChange={this.sortList}>
                            <option>Sort</option>
                            <option>Username</option>
                            <option>First Name</option>
                            <option>Last Name</option>
                            <option>Avatar</option>
                            <option>New-Old</option>
                            <option>Old-New</option>
                        </select>
                    </div>
                </div>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr className='text-center bg-dark text-light'>
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