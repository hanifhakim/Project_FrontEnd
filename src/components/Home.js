import React, { Component } from 'react'

import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {onLoggedIn} from '../actions'
import { Jumbotron, Button } from 'reactstrap';

class Home extends Component {

    loginClick = () => {
        const user = this.username.value
        const pass = this.password.value
        console.log(user);
        

        this.props.onLoggedIn(user, pass)
    }
    
    errorLogin = () => {
        if(this.props.user.error !== ""){
            this.username.value = ""
            this.password.value = ""
            return (
                <div className="alert alert-danger mt-2" role="alert">
                    {this.props.user.error}
                </div>
              )
        } else {
              return null
        }
    }

    homeFlex = () => {
        return (
            <div className="container-fluid bg-dark tembakFlex">
                <div className="d-sm-flex justify-content-around row">
                    <div className="card my-3" style={{ width: "18rem" }}>
                        <h5 className="card-title text-center bg-success">Produk Laut</h5>
                        <img src={require("../img/crab-food.jpg")} alt="" className="card-img-top p-2" />
                        <div className="card-body">
                            <p className="card-text"></p>
                            <p className="card-text"></p>
                            <a href="#">
                            <button className="btn btn-primary btn-block btn-sm my-2">Belanja Produk Laut</button>
                            </a>
                        </div>
                    </div>
                    <div className="card my-3" style={{ width: "18rem" }}>
                        <h5 className="card-title text-center bg-success">Produk Air Tawar</h5>
                        <img src={require("../img/lokal.jpg")} alt=""className="card-img-top p-2" />
                        <div className="card-body">
                            <p className="card-text"></p>
                            <p className="card-text"></p>
                            <a href="#">
                            <button className="btn btn-primary btn-block btn-sm my-2">Belanja Produk Air Tawar</button>
                            </a>
                        </div>
                    </div>
                    <div className="card my-3" style={{ width: "18rem" }}>
                        <h5 className="card-title text-center bg-success">Produk Makanan Beku</h5>
                        <img src={require("../img/frozen.jpg")} alt="" className="card-img-top p-2" />
                        <div className="card-body">
                            <p className="card-text"></p>
                            <p className="card-text"></p>
                            <a href="#">
                            <button className="btn btn-primary btn-block btn-sm my-2">Belanja Produk Makanan Beku</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        console.log(this.props.user);
        if(this.props.user.username !==""){
            return (
                <div className="jumbotron">
                    <Jumbotron>
                        <div className="row">
                            <div className="col-sm-4 img-fluid">
                                <img className="gambarJumbo" src="http://4.bp.blogspot.com/-ur1BBZqUmmQ/U97X5tQmjMI/AAAAAAAABSI/Wbz00BaRgVM/s1600/BudaiFishMkt1.JPG" alt="gambar" />
                            </div>
                            <div className="col-sm-8">
                                <h1 className="display-3 text-capitalize">Welcome {this.props.user.username}!</h1>
                                <p className="lead">NakamIkan merupakan portal e-commerce dunia perikanan
                                         kelautan, dengan misi utama yaitu memanfaatkan sumberdaya
                                         perikanan secara berkelanjutan</p>
                                <hr className="my-2" />
                                <p>Buat akun untuk mendapatkan penawaran menarik dari kami !</p>
                            </div>
                        </div>
                    </Jumbotron>
                    {this.homeFlex()}
                </div>
            )
        }
        return (
            <div>
                <Jumbotron>
                    <div className="row">
                        <div className="col-sm-4 img-fluid">
                            <img className="gambarJumbo" src="http://4.bp.blogspot.com/-ur1BBZqUmmQ/U97X5tQmjMI/AAAAAAAABSI/Wbz00BaRgVM/s1600/BudaiFishMkt1.JPG" alt="gambar" />
                        </div>
                        <div className="col-sm-8">
                            <h1 className="display-3">Welcome !</h1>
                            <p className="lead">NakamIkan merupakan portal e-commerce dunia perikanan
                                     kelautan, dengan misi utama yaitu memanfaatkan sumberdaya
                                     perikanan secara berkelanjutan</p>
                            <hr className="my-2" />
                            <p>Buat akun untuk mendapatkan penawaran menarik dari kami !</p>
                            <p className="lead">
                                <Button data-toggle="modal" data-target="#contactModalLogin" className="mx-2" color="primary">Login</Button>
                                <Link className="btn btn-primary" to="/register">Register</Link>
                            </p>
                            <div>{this.errorLogin()}</div>
                        </div>
                        {/* Modal Login */}
                        <div className="modal hide fade text-dark" id="contactModalLogin"
                        tabIndex="-1" role="dialog" aria-labelledby="post-comment" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Login</h5>
                                        <button className="close" data-dismiss="modal">
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="name">Username</label>
                                                <input ref={input => { this.username = input; }}
                                                    type="text" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input ref={input => { this.password = input }}
                                                    type="password" className="form-control" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button onClick={this.loginClick} className="btn btn-primary btn-block" data-dismiss="modal">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                {this.homeFlex()}
            </div>
        )
    }
}


// class Home extends Component {
    
    
    
    
//     render() {
//         return (
//             <div>
//                 <div
//                     id="carouselExampleIndicators"
//                     class="carousel slide mb-3"
//                     data-ride="carousel"
//                 >
//                     <ol class="carousel-indicators">
//                         <li
//                             data-target="#carouselExampleIndicators"
//                             data-slide-to="0"
//                             class="active"
//                         />
//                         <li data-target="#carouselExampleIndicators" data-slide-to="1" />
//                         <li data-target="#carouselExampleIndicators" data-slide-to="2" />
//                     </ol>
//                     <div class="carousel-inner">
//                         <div class="carousel-item active">
//                             <div className="carousel-caption d-none d-md-block">
//                                 <h1 className="display-4">About NakamIkan</h1>
//                                 <p className="lead ">
//                                     NakamIkan merupakan portal e-commerce dunia perikanan
//                                     kelautan, dengan misi utama yaitu memanfaatkan sumberdaya
//                                     perikanan secara berkelanjutan
//                                  </p>
//                             </div>
//                             <img
//                                 class="d-block w-100"
//                                 src="http://geographical.co.uk/media/k2/items/cache/d0d5caef53a97465ee5797663b3cd459_XL.jpg"
//                                 alt="First slide"
//                             />
//                         </div>
//                         <div class="carousel-item">
//                             <div className="carousel-caption d-none d-md-block">
//                                 <h5>Lorem</h5>
//                                 <p>lorem</p>
//                             </div>
//                             <img
//                                 class="d-block w-100"
//                                 src="https://c402277.ssl.cf1.rackcdn.com/photos/14905/images/magazine_hero/Medium_WW1113937.jpg"
//                                 alt="Second slide"
//                             />
//                         </div>
//                         <div class="carousel-item">
//                             <div className="carousel-caption d-none d-md-block">
//                                 <h5>Lorem</h5>
//                                 <p>lorem</p>
//                             </div>
//                             <img
//                                 class="d-block w-100"
//                                 src="https://caradonna-prod.s3.us-east-2.amazonaws.com/prod/s3fs-public/styles/hero/public/schooloffish-blogheader.png"
//                                 alt="Third slide"
//                             />
//                         </div>
//                     </div>
//                     <a
//                         class="carousel-control-prev"
//                         href="#carouselExampleIndicators"
//                         role="button"
//                         data-slide="prev"
//                     >
//                         <span class="carousel-control-prev-icon" aria-hidden="true" />
//                         <span class="sr-only">Previous</span>
//                     </a>
//                     <a
//                         class="carousel-control-next"
//                         href="#carouselExampleIndicators"
//                         role="button"
//                         data-slide="next"
//                     >
//                         <span class="carousel-control-next-icon" aria-hidden="true" />
//                         <span class="sr-only">Next</span>
//                     </a>
//                 </div>
//                 <div className="carousel-item">
//                     <img src="" alt="..." />
//                     <div className="carousel-caption d-none d-md-block">
//                         <h5>Lorem</h5>
//                         <p>lorem</p>
//                     </div>
//                 </div>
//                 {/* AKUN */}
//                 <section id="explore-head-section">
//                     <div class="container">
//                         <div class="row">
//                             <div class="col text-center py-5">
//                                 <h1 class="display-4">Accessibility</h1>
//                                 <p class="lead">Do you have a account?</p>
//                                 <button class="btn btn-primary mr-auto" data-toggle="modal" data-target="#contactModalLogin">Login</button>
//                                 <button class="btn btn-primary ml-2" data-toggle="modal" data-target="#contactModalRegist">Register</button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
               
//                 </div>
//             </div>
//         );
//     }
// }

const mapStateToProps = (state) => {
    return {user: state.auth}
  }
export default connect (mapStateToProps, {onLoggedIn})(Home)