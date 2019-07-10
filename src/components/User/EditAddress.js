import React, { Component } from 'react';
// import Cookies from 'universal-cookie'
import { onEditAddress, getAddress } from "../../actions/address";
import {Link} from 'react-router-dom'

import {connect} from "react-redux"

import '../../css/address.css'

// const cookie = new Cookies()
class EditAddress extends Component {
    
    state = {
        addresSelected:[]
    }

    onButtonClick = async (id) => {
        
        try {
            const nama_depan = this.nama_depan.value
            const nama_belakang = this.nama_belakang.value
            const provinsi = this.provinsi.value
            const kabupaten_kota = this.kabupaten_kota.value
            const kecamatan = this.kecamatan.value
            const kodepos = this.kodepos.value
            const telepon = this.telepon.value
            const nama_jalan = this.nama_jalan.value
            const address_id = id
            
            await this.props.onEditAddress(nama_depan, nama_belakang, provinsi, kabupaten_kota, kecamatan,
                kodepos, telepon, nama_jalan, address_id)  
            this.props.getAddress()

        } catch (e) {
            console.log(e);
        }
        
    }

    componentDidMount = async () => {
        await this.props.getAddress()
        this.checkAddress()
    }

    checkAddress = () => {
        var arrNew = this.props.address.filter((item) => {            
            return item.id === parseInt(this.props.match.params.selected)
        })
        
       return this.setState ({addresSelected: arrNew})
    }

    render(){
        // console.log(this.props.address[this.props.match.params.selected]);
        // console.log(this.state.addresSelected)
        // console.log(this.props.address)
        // console.log(this.props);
        if(this.state.addresSelected.length !== 0) {
            
            var {
                id, kabupaten_kota, kecamatan, kodepos,
                telepon, nama_belakang, nama_depan, provinsi
            } = this.state.addresSelected[0]
            
        }

        return (
            <div>
                <div className="container-fluid row mt-3">
                    <div className="col-3">
                        <ul className="list-group-flush">
                            <li className="list-group-item sidebarAccountUser">
                                <Link to={'/manageaccount/info'} className='list'>
                                    <div>Account Info</div>
                                </Link>
                            </li>
                            <li className="list-group-item sidebarAccountUser">
                                <Link to={'/manageaccount/address'} className='list'>
                                    <div>Address</div>
                                </Link>
                            </li>
                            <li className="list-group-item sidebarAccountUser">
                                <Link to={'/manageaccount/myorder'} className='list'>
                                    <div>My Order</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-7">
                    <form>
                        <h1 className='text-center'>My Address</h1>
                        <div className="form-group row">
                            <div className="col-6">
                                <p>Nama Depan</p>
                                <input type="text" ref={input => { this.nama_depan = input; }}
                                    defaultValue={nama_depan}
                                    className="form-control editAddress" placeholder="type your text"
                                />
                            </div>
                            <div className="col-6">
                                <p>Nama Belakang</p>
                                <input type="text" ref={input => { this.nama_belakang = input; }}
                                    defaultValue={nama_belakang}
                                    className="form-control editAddress" placeholder="type your text"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-6">
                                <p>Provinsi</p>
                                <input type="text" ref={input => { this.provinsi = input; }}
                                    defaultValue={provinsi}
                                    className="form-control editAddress" placeholder="type your text"
                                />
                            </div>
                            <div className="col-6">
                                <p>Kabupaten/Kota</p>
                                <input type="text" ref={input => { this.kabupaten_kota = input; }}
                                    defaultValue={kabupaten_kota}
                                    className="form-control editAddress" placeholder="type your text"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-6">
                                <p>Kecamatan</p>
                                <input type="text" ref={input => { this.kecamatan = input; }}
                                    defaultValue={kecamatan}
                                    className="form-control editAddress" placeholder="type your text"
                                />
                            </div>
                            <div className="col-6">
                                <p>Kode Pos</p>
                                <input type="number" ref={input => { this.kodepos = input; }}
                                    defaultValue={kodepos}
                                    className="form-control editAddress" placeholder="type your text" 
                                />
                            </div>
                        </div>
                        <div className="col-6 pl-0">
                                <p className='mb-0'>Nomor Telepon</p>
                                <input type="text" ref={input => { this.telepon = input; }}
                                 defaultValue={telepon}
                                    className="form-control editAddress" placeholder="type your text"
                                />
                        </div>
                        <div className="form-group">
                            <label className='mt-4'>Nama Jalan</label>
                            <textarea className="form-control editAddress" rows="5" id="comment" 
                                ref={input => { this.nama_jalan = input; }}>                                
                            </textarea>
                        </div>
                    </form>
                    <button type="submit" className="btn btn-outline-primary mx-2" 
                        onClick={()=>{this.onButtonClick(id)}}>Submit
                    </button>
                    <Link to='/manageaccount/address'>
                        <button type="submit" className="btn btn-outline-secondary" >Back</button>
                    </Link>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
            address: state.auth.address
        }
  }
export default connect(mapStateToProps, {onEditAddress, getAddress})(EditAddress)