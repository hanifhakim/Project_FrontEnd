import React, { Component } from 'react'
import {Link} from 'react-router-dom'


import axios from '../config/axios'
import {connect} from 'react-redux'

import '../css/home.css'
import '../css/sliderproduct.css'
import Footer from './Footer';

class Home extends Component {
   
    state = {
        product:[]
    }

    getProductHome = async () => {
        const res = await axios.get(`/getproducthome`)
        // console.log(res);
        this.setState({product: res.data})
    }
    
    renderHome = () => {
        return this.state.product.map((item, i) => {
            return(
                <div className="card col-sm-3 border border-dark m-0.5" style={{ width: "100%" }} key={i}>
                    <div className=''>
                        <img className="productImageHome" 
                            src={`http://localhost:2010/manageproduct/list/${item.image}`} alt="Cardcap" 
                        />
                    </div>
                    <div className="card-body">
                        <Link to={`/detailproduct/${item.id}`} 
                            className='text-decoration-none text-dark'><h5>{item.name}</h5>
                        </Link>
                    </div>
                </div>
            )
        })
    }

    componentDidMount = () => {
        this.getProductHome()
    }

    render() {
        // console.log(this.state.product);
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <span className="display-4 border border-light text-white p-3">Fresh Food</span>
                        <p className="lead mt-4 ml-4">54% Sumber Protein Hewani Berasal dari Ikan !!</p>
                    </div>
                </div>
                <div className="card mb-3" max-width="540px;">
                    <div className="row no-gutters">
                        <div className="col-md-3">
                            <img src={require("../img/crab-food.jpg")} alt="" className="card-img-top p-2" />
                        </div>
                        <div className="col-md-3">
                            <div className="card-body">
                                <h5 className="card-title">Seafood Product</h5>
                                <p className="card-text">Produk ikan segar hasil laut.</p>
                                <Link to='/product/seafood'>
                                    <p className="card-text">
                                        <button className="btn btn-outline-dark">Go shop</button>
                                    </p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <img src={require("../img/lokal.jpg")} alt="" className="card-img-top p-2" />
                        </div>
                        <div className="col-md-3">
                            <div className="card-body">
                                <h5 className="card-title">Freshwater Product</h5>
                                <p className="card-text">Produk ikan segar hasil budidaya petani tambak.</p>
                                <Link to='/product/freshwater'>
                                    <p className="card-text">
                                        <button className="btn btn-outline-dark">Go shop</button>
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container testimonial-group">
                    <h4><span className='border-bottom border-warning'>Paling Sering Dipilih</span></h4>
                        <div className="row text-center flex-nowrap">
                            {this.renderHome()}
                        </div>
                </div>
                <Footer />
            </div>
        )
    }
}
    
    
const mapStateToProps = (state) => {
        return {
            user: state.auth
        }
  }
export default connect (mapStateToProps)(Home)