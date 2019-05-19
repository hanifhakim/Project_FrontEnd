import React, { Component } from 'react';
import Cookies from 'universal-cookie'
import { onEditAddress } from "../actions/address";
import {Link} from 'react-router-dom'

import {connect} from "react-redux"

// const cookie = new Cookies()
class EditAddress extends Component {
    
    onButtonClick = (id) => {
        
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
            
            this.props.onEditAddress(nama_depan, nama_belakang, provinsi, kabupaten_kota, kecamatan,
                kodepos, telepon, nama_jalan, address_id)            
        } catch (e) {
            console.log(e);
            
        }
        
    }

    render(){
        console.log(this.props.address[this.props.match.params.selected]);
        console.log(this.props.address)
        console.log(this.props.id);
        
        if(this.props.address.length !== 0) {
            
            var {
                id,
                kabupaten_kota,
                kecamatan,
                kodepos,
                telepon,
                nama_belakang,
                nama_depan,
                provinsi
            } = this.props.address[this.props.match.params.selected]
            
        }
        return (
            <div>
                <div className="container-fluid row">
                    <div className="col-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link to={'/manageaccount/info'}>accountinfo</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to={'/manageaccount/address'}>adress</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to={'/manageaccount/editaccount'}>edit account</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-7">
                    <form>
                        <h1>Address</h1>
                        <div className="form-group row">
                            <div className="col-6">
                                <p>Nama Depan</p>
                                <input type="text" ref={input => { this.nama_depan = input; }}
                                    defaultValue={nama_depan}
                                    className="form-control" placeholder="type your text" /></div>
                            <div className="col-6">
                                <p>Nama Belakang</p>
                                <input type="text" ref={input => { this.nama_belakang = input; }}
                                    defaultValue={nama_belakang}
                                    className="form-control" placeholder="type your text" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-6">
                                <p>Provinsi</p>
                                <input type="text" ref={input => { this.provinsi = input; }}
                                    defaultValue={provinsi}
                                    className="form-control" placeholder="type your text" /></div>
                            <div className="col-6">
                                <p>Kabupaten/Kota</p>
                                <input type="text" ref={input => { this.kabupaten_kota = input; }}
                                    defaultValue={kabupaten_kota}
                                    className="form-control" placeholder="type your text" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-6">
                                <p>Kecamatan</p>
                                <input type="text" ref={input => { this.kecamatan = input; }}
                                    defaultValue={kecamatan}
                                    className="form-control" placeholder="type your text" /></div>
                            <div className="col-6">
                                <p>Kode Pos</p>
                                <input type="number" ref={input => { this.kodepos = input; }}
                                    defaultValue={kodepos}
                                    className="form-control" placeholder="type your text" />
                            </div>
                        </div>
                        <div className="col-6">
                                <p>Nomor Telepon</p>
                                <input type="text" ref={input => { this.telepon = input; }}
                                 defaultValue={telepon}
                                    className="form-control" placeholder="type your text" />
                        </div>
                        <div className="form-group">
                            <label>Nama Jalan</label>
                            <textarea class="form-control" rows="5" id="comment" ref={input => { this.nama_jalan = input; }}></textarea>
                        </div>
                    </form>
                    <button type="submit" className="btn btn-primary" onClick={()=>{this.onButtonClick(id)}}>Submit</button>
                    <Link to ='/manageaccount/address'><button type="submit" className="btn btn-secondary">Cancel</button>
                    </Link>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.auth,
            // id: state.auth.address.id,
            edit: state.auth.user,
            address: state.auth.address}
  }
export default connect(mapStateToProps, {onEditAddress})(EditAddress)