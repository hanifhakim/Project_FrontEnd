import React, { Component } from 'react'


import {connect} from 'react-redux'

import '../css/home.css'

class Home extends Component {
   
    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <span className="display-4 border border-light text-white">Fresh Food</span>
                        <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                    </div>
                </div>
                <div className="card mb-3" max-width= "540px;">
                    <div className="row no-gutters">
                        <div className="col-md-3">
                        <img src={require("../img/crab-food.jpg")} alt="" className="card-img-top p-2" />
                        </div>
                            <div className="col-md-3">
                                <div className="card-body">
                                    <h5 className="card-title">SeaFood Product</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><button className="btn btn-outline-dark">Go shop</button></p>
                                </div>
                            </div>
                        <div className="col-md-3">
                        <img src={require("../img/lokal.jpg")} alt=""className="card-img-top p-2" />
                        </div>
                            <div className="col-md-3">
                                <div className="card-body">
                                    <h5 className="card-title">FreshWater Product</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><button className="btn btn-outline-dark">Go shop</button></p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            )
            }
        }
    
    
const mapStateToProps = (state) => {
    return {user: state.auth}
  }
export default connect (mapStateToProps)(Home)