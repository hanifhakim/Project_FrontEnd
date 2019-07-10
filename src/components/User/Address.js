import React, { Component } from 'react';
import {onAddressAdd, getAddress, deleteAddress} from "../../actions/address"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"


import '../../css/address.css'


class Address extends Component{
    state={
        edit: false
    }

    onButtonClick = () => {
        const nama_depan = this.nama_depan.value
        const nama_belakang = this.nama_belakang.value
        const provinsi = this.provinsi.value
        const kabupaten_kota = this.kabupaten_kota.value
        const kecamatan = this.kecamatan.value
        const kodepos = parseInt(this.kodepos.value)
        const telepon = this.telepon.value
        const nama_jalan = this.nama_jalan.value

        this.props.onAddressAdd(nama_depan, nama_belakang, provinsi, kabupaten_kota, kecamatan, kodepos, telepon, nama_jalan)
        
    }

    componentDidMount = () => {
        this.props.getAddress()
    }
   
    onDeleteAddress = (id) => {
     this.props.deleteAddress(id)
    }

    renderList = () => {
        return this.props.address.map((item, i) => {
            return(
                <div key={item.id} className="card mx-auto my-3 border-dark">
                    <div className="card-body text-center">
                        <p className="card-text lead">
                            <strong>Nama Penerima: {item.nama_depan} {item.nama_belakang}</strong>
                        </p> 
                        <div className="card-text lead">
                            <div>Alamat: {item.nama_jalan}</div> 
                            <div>Kec. {item.kecamatan}, Kab/Kot. {item.kabupaten_kota}</div> 
                            <div>{item.provinsi}, {item.kodepos}</div>             
                            Telepon:{item.telepon}
                        </div>
                        <Link to={`/editaddress/${item.id}`}>
                            <button className='d-inline-block btn bg-none mx-2' style={{color: 'blue'}} >Edit</button>
                        </Link>
                        <button className='d-inline-block btn bg-none mx-2' style={{color: 'red'}} 
                            onClick={()=>{this.onDeleteAddress(item.id)}}>Delete
                        </button>
                    </div>
                </div>
            )
        })
    }

    render(){
        if(this.state.edit){
            return(
                <div className="container" style={{marginBottom: '700px', height:'100%'}}>
                    <div>
                        {this.renderList()}
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-outline-primary' 
                            onClick={() => { this.setState({ edit: !this.state.edit }) }}>Minimize
                        </button>
                    </div>
                    <div>
                        <form>
                            <h1 className='display-6 text-center'>Add New Address</h1>
                            <div className="form-group row">
                                <div className="col-6">
                                    <p className='labelInput'>Nama Depan</p>
                                    <input type="text" ref={input => { this.nama_depan = input; }}
                                        className="form-control inputAddress" placeholder="type your text" />
                                </div>
                                <div className="col-6">
                                    <p className='labelInput'>Nama Belakang</p>
                                    <input type="text" ref={input => { this.nama_belakang = input; }}
                                        className="form-control inputAddress" placeholder="type your text"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-6">
                                    <p className='labelInput'>Provinsi</p>
                                    <input type="text" ref={input => { this.provinsi = input; }}
                                        className="form-control inputAddress" placeholder="type your text"/>
                                </div>
                                <div className="col-6">
                                    <p className='labelInput'>Kabupaten/Kota</p>
                                    <input type="text" ref={input => { this.kabupaten_kota = input; }}
                                        className="form-control inputAddress" placeholder="type your text"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-6">
                                    <p className='labelInput'>Kecamatan</p>
                                    <input type="text" ref={input => { this.kecamatan = input; }}
                                        className="form-control inputAddress" placeholder="type your text" />
                                </div>
                                <div className="col-6 ">
                                    <p className='labelInput'>Kode Pos</p>
                                    <input type="number" ref={input => { this.kodepos = input; }}
                                        className="form-control inputAddress" placeholder="type your text" />
                                </div>
                                <div className="col-6">
                                    <p className='labelInput'>Nomor Telepon</p>
                                    <input type="text" ref={input => { this.telepon = input; }}
                                        className="form-control inputAddress" placeholder="type your text" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className='labelInput'>Nama Jalan</label>
                                <textarea className="form-control inputAddress" rows="5" id="comment" ref={input => { this.nama_jalan = input; }}></textarea>
                            </div>
                        </form>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-outline-primary" onClick={this.onButtonClick}>Submit</button>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div className="container">
                    <div>
                        {this.renderList()}
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-outline-dark'
                            onClick={() => { this.setState({ edit: !this.state.edit }) }}>Add new address
                        </button>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        address: state.auth.address
    }
  }
export default connect(mapStateToProps, {onAddressAdd, getAddress, deleteAddress})(Address)
