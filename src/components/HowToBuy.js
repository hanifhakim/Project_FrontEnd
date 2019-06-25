import React, { Component } from 'react';
import Footer from './Footer';

class HowToBuy extends Component {

    render(){
        return(
            <div>
                <div className='container'>
                    <h2 className='text-center'><span className='border-bottom border-dark'>Panduan Belanja</span></h2>
                    <div className=''>
                        <h5>1. Temukan Ikan Pilihanmu</h5>
                        <p className='lead ml-4'>Masuk ke menu shop dan pilih Kategori untuk memudahkanmu mencari.</p>
                    </div>
                    <div className=''>
                        <h5>2. Tambahkan Ikan Ke Keranjangmu</h5>
                        <p className='lead m-0 ml-4'>Pilih tombol <img src={require('../img/addcart.png')} alt='cart' style={{height:'40px', margin:'5px'}}></img> untuk menambahkan barang ke keranjang. </p> 
                        <p className='lead ml-4'>
                        Belum yakin? Simpan dulu di wishlist dengan menekan tombol  
                        <img src={require('../img/wishlist.png')} alt='wishlist' style={{height:'40px', margin:'5px'}}></img>
                        </p>
                    </div>
                    <div className=''>
                        <h5>3. Pastikan Lagi Detail Pesananmu</h5>
                        <p className='lead ml-4'>Masuk ke cart untuk mengecek kembali pesananmu, tambahkan apabila kurang, hapus apabila tidak jadi memesan.</p>
                    </div>
                    <div className=''>
                        <h5>4. Tambahkan Alamat dan Jangan Lupa Membayar</h5>
                        <p className='lead ml-4'>
                            Masukan alamat pengirimanmu, pilih metode pengiriman (jika menggunakan kurir nakamikan, maka pengirimanmu gratis !!), dan pilih mode bayar yang paling mudah buatmu.
                        </p>
                        <h5>5. Unggah Bukti Pembayaran</h5>
                        <p className='lead ml-4'>
                            Apabila memilih metode transfer, maka pastikan kamu mengunggah bukti pembayaran pada menu My Order di Manage Account.
                        </p>
                        <h5>6. Tunggu Ikan Segar Datang Didepan Rumahmu</h5>
                    </div>
                </div>
                <div className='fixed-bottom'>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default HowToBuy