import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie'
import { connect } from "react-redux";
import AddProduct from './AddProduct';
import ManageListProduct from './ManageListProduct';
import ManageOrders from './ManageOrders';
import ManageUsers from './ManageUsers';

import '../../css/manageproduct.css'

const cookie = new Cookies()

class ManageProduct extends Component{

    checkInfo = () => {
        const path = this.props.match.url
        //    console.log(path);
           if(path === '/manageproduct/add'){
               return <AddProduct/>
           } else if (path === '/manageproduct/list'){
                return <ManageListProduct/>
           } else if (path === '/manageproduct/manageorders'){
            return <ManageOrders/>
           } else if (path === '/manageproduct/manageusers'){
            return <ManageUsers/>
           }
        }
    render(){
        // console.log(this.props.user);
        
        if(cookie.get('roleLogin') === 'admin'){
            return(
                    <div className="container-fluid row mt-3">
                            <div className="col-2">
                                <ul className="list-group-flush listItem">
                                    <li className="list-group-item sidebarAccount">
                                    <Link to={'/manageproduct/add' }className='text-decoration-none p'><div>Add Product</div></Link>
                                    </li>
                                    <li className="list-group-item sidebarAccount">
                                    <Link to={'/manageproduct/list'}className='text-decoration-none p'><div>List Product</div></Link>
                                    </li>
                                    <li className="list-group-item sidebarAccount">
                                    <Link to={'/manageproduct/manageorders'}className='text-decoration-none p'><div>Manage Orders</div></Link>
                                    </li>
                                    <li className="list-group-item sidebarAccount">
                                    <Link to={'/manageproduct/manageusers'}className='text-decoration-none p'><div>Manage Users</div></Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-9">
                                <div>
                                    {this.checkInfo()}
                                </div>
                            </div>
                        </div>
            )
        }
        return  <Redirect to="/" />
    }   
}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps) (ManageProduct)