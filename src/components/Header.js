import React, { Component } from 'react'
import axios from '../config/axios'

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
    const res= await axios.get(`/shop/cartOnly/${user_id}`)
    await this.setState({cartOnly: res.data})
  }

  async componentDidUpdate (prevProps, prevState) {
    if(this.state.cartOnly.length !== prevState.length || this.state.cartOnly.length !== 0){
      await this.getCartUser();
    }
    // console.log(prevProps);
    // console.log(prevState);
    
  }

  orderSummary = () => {
    var newCart = this.state.cartOnly
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
    
    
    if (cookie.get('idLogin') !== undefined && cookie.get('roleLogin') === 'user') {
      return (
        <div>
          <nav className="navbar navbar-expand-sm bg-info  navbar-dark sticky-top" id="main-nav">
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
                      <i className="fas fa-shopping-cart"></i> ({this.orderSummary()})
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
          <nav className="navbar navbar-expand-sm bg-info  navbar-dark sticky-top" id="main-nav">
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
                      <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="http://google.com">SeaFood</a>
                        <ul className="dropdown-menu dropdownChild">
                          <li><a className="dropdown-item" href="#home">Pelagic Fish</a></li>
                          <li><a className="dropdown-item" href="#home">Demersal Fish</a></li>
                        </ul>
                      </li>
                      <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="http://google.com">FreshWater</a>
                        <ul className="dropdown-menu dropdownChild">
                          <li><a className="dropdown-item" href="#home">Aquaculture</a></li>
                          <li><a className="dropdown-item" href="#home">Submenu0</a></li>
                        </ul>
                      </li>
                      <li className="dropdown-submenu"><Link to="/product/all" className="dropdown-item">Shop All</Link>
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
                    <Link to="/register" className="nav-link">Cart <i className="fas fa-shopping-cart"></i></Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )
    }
    return (
      <nav className="navbar navbar-expand-sm bg-info  navbar-dark sticky-top" id="main-nav">
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
                <Link to="/register" className="nav-link">Login/Register</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Shop
                </a>
                <ul className="dropdown-menu dropdownParent" aria-labelledby="navbarDropdownMenuLink">
                  <div className="dropdown-header">Products</div>
                  <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="http://google.com">SeaFood</a>
                    <ul className="dropdown-menu dropdownChild">
                      <li><a className="dropdown-item" href="#home">Pelagic Fish</a></li>
                      <li><a className="dropdown-item" href="#home">Demersal Fish</a></li>
                    </ul>
                  </li>
                  <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="http://google.com">FreshWater</a>
                    <ul className="dropdown-menu dropdownChild">
                      <li><a className="dropdown-item" href="#home">Aquaculture</a></li>
                      <li><a className="dropdown-item" href="#home">Submenu0</a></li>
                    </ul>
                  </li>
                  <li className="dropdown-submenu"><Link to="/product" className="dropdown-item">Shop All</Link>
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
  return { user: state.auth.username }
}

export default connect(mapStateToProps, { onLogoutUser })(Header)
