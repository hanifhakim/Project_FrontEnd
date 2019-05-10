import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom'
import AccountInfo from '../components/AccountInfo'
import Address from '../components/Address'
import Cookies from 'universal-cookie'
import {connect} from "react-redux"
import { getUsers} from "../actions"

import '../css/manageaccount.css'


const cookie = new Cookies()
class ManageAccount extends Component{

    
    componentDidMount = () => {
        this.props.getUsers()
    }
    checkInfo = () => {
        const path = this.props.match.url
       console.log(path);
       if(path === '/manageaccount/info'){
           return <AccountInfo/>
       } else if (path === '/manageaccount/address'){
            return <Address/>
       }
       
    }
    render(){
        console.log(cookie.get('userLogin'));
        
        if(cookie.get('idLogin') !== undefined || this.props.user !== ''){
            return(
                <div>
                    <div className="container-fluid row mt-3">
                        <div className="col-3">
                            <ul className="list-group">
                                <li className="list-group-item sidebarAccount">
                                <Link to={'/manageaccount/info'}><div>Account Info</div></Link>
                                </li>
                                <li className="list-group-item sidebarAccount">
                                <Link to={'/manageaccount/address'}><div>Address</div></Link>
                                </li>
                                <li className="list-group-item sidebarAccount">
                                <Link to={'/manageaccount/wishlist'}><div>Wishlist</div></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-7">
                            <div>
                                {this.checkInfo()}
                            </div>
                        </div>
                    </div>
                </div>
            )
    
        }
        else {
            return <Redirect to='/'/>
        }
    }
}


const mapStateToProps = (state) => {
    return {user: state.auth.username}
  }
export default connect(mapStateToProps, {getUsers})(ManageAccount)
