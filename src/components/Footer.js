import React, {Component} from 'react';


class Footer extends Component{

    render(){
        return(        
        <footer id="main-footer" className="bg-info mt-5">
            <div className="">
                <div className="d-flex justify-content-between">
                    <div className="text-white">
                        <ul> Customer Service
                            <li>Contact Us</li>
                            <li>Return & Exchanges</li>
                        </ul>
                    </div>
                    <div className="text-white">
                        <ul> About Us
                            <li>Store</li>
                            <li>Career</li>
                        </ul>
                    </div>
                    <div className="text-right p-2 text-white">
                        <h5 className="display-5">NakamIkan <i className="fas fa-fish"></i></h5>
                        <p>Copyright &copy;
                        <span> 2019 </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        )
    }
}

export default Footer