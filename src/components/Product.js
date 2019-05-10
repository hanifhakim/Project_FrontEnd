import React, { Component } from 'react';


class Product extends Component{

    render(){
        return(
            <div>
                <div className="container">
                    <div className="card m-2" style={{ width: "18rem" }}>
                        <img className="card-img-top" src="..." alt="Cardcap" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#home" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product