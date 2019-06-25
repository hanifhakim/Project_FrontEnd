import React, {Component} from 'react';
import Cookies from 'universal-cookie'

import '../css/footer.css'

const cookie = new Cookies()

class Footer extends Component{


    getYear = () => {
        var d = new Date();
        var n = d.getFullYear();
        return n
    }

    render(){
        var role = cookie.get('roleLogin')
        if(role === 'user' || role === undefined  ){
            return(        
            <footer id="main-footer" className="bg-info mt-5">
                <div className="">
                    <div className="d-flex justify-content-between">
                        <div className="text-right p-2 text-white">
                            <h5 className="display-5">NakamIkan <i className="fas fa-fish"></i></h5>
                            <p>Copyright &copy;
                                <span> {this.getYear()} </span>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
            )
        } else if (role === 'admin'){
            return(        
                <footer id="main-footer" className="bg-dark sticky-bottom" >
                    <div className="">
                        <div className="d-flex justify-content-between">
                            <div className="text-right p-2 text-white">
                                <h5 className="display-5">NakamIkan <i className="fas fa-fish"></i></h5>
                                <p>Copyright &copy;
                                    <span> 2019 </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        }
}

export default Footer