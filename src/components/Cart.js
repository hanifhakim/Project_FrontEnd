import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom'
import'../css/shop.css'

class Cart extends Component{

    render(){
        return(
            <div className="row">
                <div className="col-2 filter card mt-3 container-fluid">
                    <div className="card-title">
                        <h2>Search</h2>
                        <form className="input-group"><input onChange={this.onBtnSearch} ref={input => this.name = input} className="form-control" type="text" /></form>
                    </div>
                    <div className="card-title">
                        <h2 className="border-bottom">Products</h2>
                        <div className="panel-group listItem">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a data-toggle="collapse" href="#collapse1">SeaFood</a>
                                    </h4>
                                </div>
                                <div id="collapse1" className="panel-collapse collapse">
                                    <ul className="list-group">
                                        <li className="list-group-item listItem">
                                            <Link to="/">One</Link>
                                        </li>
                                        <li className="list-group-item listItem">
                                            <Link to="/">One</Link>
                                        </li>
                                        <li className="list-group-item listItem">
                                            <Link to="/">One</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel-group">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title listItem">
                                        <a data-toggle="collapse" href="#collapse2">Freshwater</a>
                                    </h4>
                                </div>
                                <div id="collapse2" className="panel-collapse collapse">
                                    <ul className="list-group">
                                    <li className="list-group-item listItem">
                                            <Link to="/">One</Link>
                                        </li>
                                        <li className="list-group-item listItem">
                                            <Link to="/">One</Link>
                                        </li>
                                        <li className="list-group-item listItem">
                                            <Link to="/">One</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-10 row">
                    
                </div>
            </div>
        )
    }
}

export default Cart