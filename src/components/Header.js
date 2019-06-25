import React, { Component } from 'react'
// import axios from '../config/axios'

import {getCartOnly} from '../actions/cart'

import { connect } from "react-redux";
import { onLogoutUser } from '../actions/users'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import '../css/header.css'

const cookie = new Cookies()

class Header extends Component {
  state = {
    cartOnly:[]
  }

  getCartUser = async() => {
    var user_id = cookie.get('idLogin')
    // const res= await axios.get(`/shop/cartOnly/${user_id}`)
   await this.props.getCartOnly(user_id)
   this.orderSummary()
    // await this.setState({cartOnly: res.data})
  }

  // async componentWillUpdate (prevProps, prevState) {
  //   // if(this.state.cartOnly.length !== prevState.length || this.state.cartOnly.length !== 0){
  //   //   await this.getCartUser();
  //   // }
  //   console.log(prevProps);
  //   console.log(prevState);
  //   // console.log(prevState.length);
  //   // console.log(this.state.cartOnly.length);
    
  // }

  orderSummary = () => {
    var newCart = this.props.cartuser
    var totalQty = 0
    for (let i = 0; i < newCart.length; i++) {
      totalQty += newCart[i].qty
    }
    return totalQty
  }

  componentDidMount = () => {
      this.getCartUser()
  }

  render() {
    // console.log(this.state.cartOnly);
    // console.log(this.props.cartuser);
    // console.log(this.props.cartnih);
    
    if (cookie.get('idLogin') !== undefined && cookie.get('roleLogin') === 'user') {
      return (
        <div>
          <nav className="navbar navbar-expand-sm bg-info  navbar-dark fixed-top" id="main-nav">
            <div className="container">
              <Link to="/" className="navbar-brand">NakamIkan <i className="fas fa-fish"></i></Link>
              <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon "></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link"><i className="fas fa-home"></i></Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/howtobuy" className="nav-link">Cara Pemesanan</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Shop
                  </a>
                    <ul className="dropdown-menu dropdownParent" aria-labelledby="navbarDropdownMenuLink">
                      <div className="dropdown-header">Products</div>
                      <li className="dropdown-submenu">
                        <Link to='/product/seafood' className="dropdown-item">SeaFood</Link>
                      </li>
                      <li className="dropdown-submenu">
                        <Link to='/product/freshwater'className="dropdown-item">FreshWater</Link>
                      </li>
                      <li className="dropdown-submenu">
                        <Link to="/product/all" className="dropdown-item">Shop All</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      My Account
                  </a>
                    <ul className="dropdown-menu dropdownParent" aria-labelledby="navbarDropdownMenuLink">
                      <li className="dropdown-submenu ">
                        <Link to="/manageaccount/info" className="dropdown-item text-dark">Manage Account</Link>
                      </li>
                      <li className="dropdown-submenu">
                        {/* <Link to="/" className="dropdown-item text-dark"> */}
                        <button
                          onClick={() => { this.props.onLogoutUser() }}
                          className="dropdown-item text-dark">Logout
                      </button>
                        {/* </Link> */}
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">Cart
                      <i className="fas fa-shopping-cart"></i> ({this.props.cartuser.length > 0 ? this.orderSummary() : 0})
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    } else if (cookie.get('roleLogin') === 'admin') {
      return (
        <div>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top" id="main-nav">
            <div className="container">
              <Link to="/" className="navbar-brand">NakamIkan <i className="fas fa-fish"></i></Link>
              <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon "></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link"><i className="fas fa-home"></i></Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Shop
                  </a>
                    <ul className="dropdown-menu dropdownParent" aria-labelledby="navbarDropdownMenuLink">
                      <div className="dropdown-header">Products</div>
                      <li className="dropdown-submenu">
                        <Link to='/product/seafood' className="dropdown-item">Seafood</Link>
                      </li>
                      <li className="dropdown-submenu">
                        <Link to='/product/freshwater' className="dropdown-item">Freshwater</Link>
                      </li>
                      <li className="dropdown-submenu">
                        <Link to="/product/all" className="dropdown-item">Shop All</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Administrator <i className="fas fa-tools"></i>
                    </a>
                    <ul className="dropdown-menu dropdownParent" aria-labelledby="navbarDropdownMenuLink">
                      <li className="dropdown-submenu ">
                        <Link to="/manageproduct/list" className="dropdown-item text-dark">Manage Products</Link>
                      </li>
                      <li className="dropdown-submenu">
                        {/* <Link to="/" className="dropdown-item text-dark"> */}
                        <button
                          onClick={() => { this.props.onLogoutUser() }}
                          className="dropdown-item text-dark">Logout
                      </button>
                        {/* </Link> */}
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    {/* <Link to="/register" className="nav-link">Cart <i className="fas fa-shopping-cart"></i></Link> */}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )
    }
    return (
      <nav className="navbar navbar-expand-sm bg-info  navbar-dark fixed-top" id="main-nav">
        <div className="container">
          <Link to="/" className="navbar-brand">NakamIkan <i className="fas fa-fish"></i></Link>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link"><i className="fas fa-home"></i></Link>
              </li>
              <li className="nav-item">
                <Link to="/howtobuy" className="nav-link">Cara Pemesanan</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Login/Register</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Shop
                </a>
                <ul className="dropdown-menu dropdownParent" aria-labelledby="navbarDropdownMenuLink">
                  <div className="dropdown-header">Products</div>
                    <li className="dropdown-submenu">
                      <Link to='/product/seafood' className="dropdown-item">Seafood</Link>
                    </li>
                    <li className="dropdown-submenu">
                      <Link to='/product/freshwater' className="dropdown-item">Freshwater</Link>
                    </li>
                    <li className="dropdown-submenu">
                      <Link to="/product/all" className="dropdown-item">Shop All</Link>
                    </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">Cart <i className="fas fa-shopping-cart"></i></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );

  }
}




const mapStateToProps = (state) => {
  return { user: state.auth.username,
          cartuser: state.cart.cartOnly,
          cartnih: state.cart.carts}
}

export default connect(mapStateToProps, { onLogoutUser, getCartOnly })(Header)
