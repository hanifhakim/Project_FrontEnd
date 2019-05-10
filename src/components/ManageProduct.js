import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie'
import { connect } from "react-redux";

const cookie = new Cookies()

class ManageProduct extends Component{

    render(){
        console.log(this.props.user);
        
        if(cookie.get('roleLogin') === 'admin'){
            return(
                <div>
                    <div className="container-fluid row mt-3">
                            <div className="col-3">
                                <ul className="list-group">
                                    <li className="list-group-item sidebarAccount">
                                    <Link to={'/manageaccount/info'}><div>Add Product</div></Link>
                                    </li>
                                    <li className="list-group-item sidebarAccount">
                                    <Link to={'/manageaccount/address'}><div>List Product</div></Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-7">
                                <div>
                                    {/* {this.checkInfo()} */}
                                </div>
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