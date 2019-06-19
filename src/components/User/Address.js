import React, { Component } from 'react';
import {onAddressAdd, getAddress, deleteAddress} from "../../actions/address"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
// import EditAddress from './EditAddress';


class Address extends Component{
    state={
        edit: false,
        editAddress: false
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

        // console.log(nama_depan);
        // console.log(nama_belakang);
        // console.log(provinsi);
        // console.log(kabupaten_kota);
        // console.log(kecamatan);
        // console.log(kodepos);
        // console.log(nama_jalan);
        
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
                <div key={item.id} className="card bg-light mx-auto my-3">
                    <div className="card-body text-center">
                        <p className="card-text lead">Nama Penerima: {item.nama_depan} {item.nama_belakang}</p> 
                        <p className="card-text lead"> 
                        Alamat: {item.nama_jalan}, Kec. {item.kecamatan}, 
                                                Kab/Kot. {item.kabupaten_kota}, {item.provinsi},
                                                {item.kodepos}, Telepon:{item.telepon}
                                                
                        </p>
                        <Link to={`/editaddress/${item.id}`}><button className='d-inline-block btn btn-dark mx-2'>Edit</button>
                        </Link>
                        <button className='d-inline-block btn btn-dark mx-2' onClick={()=>{this.onDeleteAddress(item.id)}}>
                        Delete</button>
                    </div>
                </div>
            )
        })
    }
    render(){
        if(this.state.edit){
            return(
                <div className="container">
                <div>
                    {this.renderList()}
                </div>
                <div>
                    <button className='btn btn-outline-success' onClick={()=>{this.setState({edit: !this.state.edit})}}>Minimize</button>
                </div>
                <div>
                <form>
                        <h1>Address</h1>
                        <div className="form-group row">
                            <div className="col-6">
                                <p>Nama Depan</p>
                                <input type="text" ref={input => { this.nama_depan = input; }}
                                    className="form-control" placeholder="type your text" /></div>
                            <div className="col-6">
                                <p>Nama Belakang</p>
                                <input type="text" ref={input => { this.nama_belakang = input; }}
                                    className="form-control" placeholder="type your text" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-6">
                                <p>Provinsi</p>
                                <input type="text" ref={input => { this.provinsi = input; }}
                                    className="form-control" placeholder="type your text" /></div>
                            <div className="col-6">
                                <p>Kabupaten/Kota</p>
                                <input type="text" ref={input => { this.kabupaten_kota = input; }}
                                    className="form-control" placeholder="type your text" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-6">
                                <p>Kecamatan</p>
                                <input type="text" ref={input => { this.kecamatan = input; }}
                                    className="form-control" placeholder="type your text" /></div>
                            <div className="col-6">
                                <p>Kode Pos</p>
                                <input type="number" ref={input => { this.kodepos = input; }}
                                    className="form-control" placeholder="type your text" />
                            </div>
                            <div className="col-6">
                                <p>Nomor Telepon</p>
                                <input type="text" ref={input => { this.telepon = input; }}
                                    className="form-control" placeholder="type your text" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Nama Jalan</label>
                            <textarea className="form-control" rows="5" id="comment" ref={input => { this.nama_jalan = input; }}></textarea>
                        </div>
                </form>
                <button type="submit" className="btn btn-primary" onClick={this.onButtonClick}>Submit</button>
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
                <div>
                    <button className='btn btn-outline-success' onClick={()=>{this.setState({edit: !this.state.edit})}}>Add new address</button>
                </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {user: state.auth,
            address: state.auth.address}
  }
export default connect(mapStateToProps, {onAddressAdd, getAddress, deleteAddress})(Address)
