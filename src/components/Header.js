import React, { Component } from 'react'

import { connect } from "react-redux";
import { logoutUser } from '../actions'
// import { Link } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
// import { connect } from 'http2';
  
class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render() {
        // const {username} = this.props.user
        if(this.props.user !==""){
            console.log(this.props.user);
            
            return (
                <div>
                    <Navbar className="navbar fixed-top" color="info" light expand="md">
                        <NavbarBrand href="/">NakamIkan <i className="fas fa-fish"></i></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/components/"><i className="fas fa-home"></i></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">How To Buy?</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/components/"><i class="fas fa-shopping-cart"></i></NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret className="text-capitalize" >
                                        Halo {this.props.user}
                      </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            Manage Product
                        </DropdownItem>
                                        <DropdownItem>
                                            Admin
                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.props.logoutUser}>
                                            Logout 
                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
        } else {
            return (
                <div>
                    <Navbar className="navbar fixed-top" color="light" light expand="md">
                        <NavbarBrand href="/">NakamIkan <i className="fas fa-fish"></i></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/components/"><i className="fas fa-home"></i></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://github.com/reactstrap/reactstrap">How To Buy?</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/components/"><i class="fas fa-shopping-cart"></i></NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Products
                      </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            Ikan Laut
                        </DropdownItem>
                                        <DropdownItem>
                                            Ikan Air Tawar
                        </DropdownItem>
                                        <DropdownItem>
                                            Frozen Food
                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
        }
        
    }
}


// class Header extends Component {

// render(){
// return(
//     <div>

//         <nav className="navbar navbar-expand-sm bg-info  navbar-dark sticky-top" id="main-nav">
//             <div className="container">
//                 <a href="index.html" className="navbar-brand">NakamIkan <i className="fas fa-fish"></i></a>
//                 <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
//                     <span className="navbar-toggler-icon "></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarCollapse">
//                     <ul className="navbar-nav ml-auto">
//                         <li className="nav-item">
//                             <a href="#home" className="nav-link">Home</a>
//                         </li>
//                         <li className="nav-item">
//                             <a href="#produk" className="nav-link">Produk</a>
//                         </li>
//                         <li className="nav-item">
//                             <a href="#home" className="nav-link">Cara Belanja</a>
//                         </li>
//                         <li className="nav-item">
//                             <input type="text" placeholder="Cari" className="btn btn-dark"></input>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>


//     </div>
// )
// }
// }
const mapStateToProps = (state) => {
    return {user: state.auth.username}
}

export default connect (mapStateToProps, {logoutUser})(Header)