import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom'
import AccountInfo from './AccountInfo'
import Address from './Address'
import MyOrder from './MyOrder'
import Cookies from 'universal-cookie'
import {connect} from "react-redux"
import { getUsers} from "../../actions/users"

import '../../css/manageaccount.css'
import Footer from '../Footer';

const cookie = new Cookies()

class ManageAccount extends Component{
    
    componentDidMount = () => {
        this.props.getUsers()
    }
    checkInfo = () => {
        const path = this.props.match.url
    //    console.log(path);
       if(path === '/manageaccount/info'){
            return <AccountInfo/>
       } else if (path === '/manageaccount/address'){
            return <Address/>
       } else if (path === '/manageaccount/myorder'){
            return <MyOrder/>
       }
       
    }
    render(){
        // console.log(cookie.get('userLogin'));
        
        if(cookie.get('idLogin') !== undefined){
            return(
                <div>
                    <div className="container-fluid row mt-3"  style={{marginBottom:'300px'}}>
                        <div className="col-3">
                            <ul className="list-group-flush">
                                <li className="list-group-item sidebarAccountUser">
                                    <Link to={'/manageaccount/info'} className='list'>
                                        <div>Account Info</div>
                                    </Link>
                                </li>
                                <li className="list-group-item sidebarAccountUser">
                                    <Link to={'/manageaccount/address'} className='list'>
                                        <div>Address</div>
                                    </Link>
                                </li>
                                <li className="list-group-item sidebarAccountUser">
                                    <Link to={'/manageaccount/myorder'} className='list'>
                                        <div>My Order</div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-7">
                            <div>
                                {this.checkInfo()}
                            </div>
                        </div>
                    </div>
                    <div className='fixed-bottom'>
                        <Footer/>
                    </div>
                </div>
            )
        }
        else {
            return <Redirect to='/'/>
        }
    }
}



export default connect(null, {getUsers})(ManageAccount)
