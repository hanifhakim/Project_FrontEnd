import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {getProducts} from '../actions/product'

import { connect } from 'react-redux'
import ProductList from '../components/ProductList'

import '../css/product.css'
import axios from '../config/axios';
import Footer from './Footer';

class Product extends Component{

    state = {
        products:[],
        productSearch:[],
        category:''
    }

    //Kirim array untuk mapping product
    renderList = () => {
        return this.state.productSearch.map((item, i) => {
            return (
                <ProductList item={item} key={i} />
            )
        }) 
    }

    //ambil data (ALL) from db
    gettingProducts = async (cat) => {
      const res =  await this.props.getProducts(cat)
      const {data} = res.payload
      this.setState({products: data, productSearch: data})
    //   console.log(res.payload.data)
    }

    //Filtering sesuai parameter yg diisi
    onButtonSearch = () => {
        const name = this.name.value
        const min = parseInt(this.min.value)
        const max = parseInt(this.max.value)

        var newArr = this.state.products.filter((item, i) => {
            if(isNaN(min) && isNaN(max)){
                return item.name.toLowerCase().includes(name.toLowerCase());
            } else if (isNaN(min)){
                return (
                    item.name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price <= max)
                ;
            } else if (isNaN(max)){
                return (
                    item.name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price >= min)
                ;
            } else {
                return (
                    item.name.toLowerCase().includes(name.toLowerCase()) &&
                    item.price <= max &&
                    item.price >= min)
                ;
            }
        })

        return this.setState({productSearch: newArr})
    }

    //Reset filter
    onButtonReset = () => {
        var cat = this.state.category
        this.gettingProducts(cat)
        this.name.value = ''
        this.min.value = ''
        this.max.value = ''
    }


    //Filtering dgn name:'ikan'
    onIkan = async () => {
       await this.setState({name: 'ikan'})
    
        const name = this.state.name
        var newArr = this.state.products.filter((item, i) => {
                return item.name.toLowerCase().includes(name.toLowerCase());
        })

        return this.setState({productSearch: newArr})
    }

     //Filtering dgn name:'udang'
    onUdang = async () => {
       await this.setState({name: 'udang'})
    
        const name = this.state.name
        var newArr = this.state.products.filter((item, i) => {
                return item.name.toLowerCase().includes(name.toLowerCase());
        })

        return this.setState({productSearch: newArr})
    }

     //Filtering dgn name:'kerang'
    onKerang = async () => {
       await this.setState({name: 'kerang'})
    
        const name = this.state.name
        var newArr = this.state.products.filter((item, i) => {
                return item.name.toLowerCase().includes(name.toLowerCase());
        })

        return this.setState({productSearch: newArr})
    }

    //Sortirt berdasarkan yg diklik
    sortList = async (event) => {
        var fnsort = document.querySelector('#sel1').value
        const category = this.props.match.params.category
        // console.log(fnsort);

        if(category === 'all'){
            if(fnsort === 'A-Z'){                
                const res = await axios.get(`/sortnameasc`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'Z-A' ){
                const res = await axios.get(`/sortnamedesc`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'High-Low'){
                const res = await axios.get(`/sortpricedesc`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'Low-High'){
                const res = await axios.get(`/sortpriceasc`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'New-Old'){
                const res = await axios.get(`/sortdatedesc`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'Old-New'){
                const res = await axios.get(`/sortdateasc`)
                this.setState({productSearch: res.data})
            } 
            
        } else if (category === 'seafood'){
            if(fnsort === 'A-Z'){                
                const res = await axios.get(`/catsortnameasc/${category}`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'Z-A' ){
                const res = await axios.get(`/catsortnamedesc/${category}`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'High-Low'){
                const res = await axios.get(`/catsortpricedesc/${category}`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'Low-High'){
                const res = await axios.get(`/catsortpriceasc/${category}`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'New-Old'){
                const res = await axios.get(`/catsortdatedesc/${category}`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'Old-New'){
                const res = await axios.get(`/catsortdateasc/${category}`)
                this.setState({productSearch: res.data})
            } 
        }  else if (category === 'freshwater'){
            if(fnsort === 'A-Z'){                
                const res = await axios.get(`/catsortnameasc/${category}`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'Z-A' ){
                const res = await axios.get(`/catsortnamedesc/${category}`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'High-Low'){
                const res = await axios.get(`/catsortpricedesc/${category}`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'Low-High'){
                const res = await axios.get(`/catsortpriceasc/${category}`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'New-Old'){
                const res = await axios.get(`/catsortdatedesc/${category}`)
                this.setState({productSearch: res.data})
            } else if (fnsort === 'Old-New'){
                const res = await axios.get(`/catsortdateasc/${category}`)
                this.setState({productSearch: res.data})
            } 
        } else {
            this.gettingProducts()
        }
        return null
    }

    //Kalo ada perubahan 
    async componentWillUpdate (nextProps, nextState) {
        if(this.state.category !== nextProps.match.params.category){
            await this.setState ({
                category: this.props.match.params.category
            })
            console.log(this.state.category);
            console.log('dari will update');
            
            // console.log(this.props.match.params.category);
            var cat = this.state.category
            this.gettingProducts(cat)
        }
        // console.log(nextProps);
        // console.log(nextState);
    }

    //Setstate sesuai params yg ada
    componentDidMount = async () => {
        // console.log(this.props.match.params.category);
        await this.setState({
            category: this.props.match.params.category
        })
        console.log('dari didmount');
        
        // console.log(this.state.category);
        // var cat = this.state.category
        // await this.gettingProducts(cat)
    }

    render(){
        console.log(this.state.productSearch);
        console.log('dari render');
        
        return(
            <div>
                <div className="container-fluid">
                    <h1 className='border-dark border-bottom border-top mt-3 text-center'>Products</h1>
                    <div className='d-flex justify-content-end'>
                        <div className="form-group">
                            <select className="form-control" id="sel1" onChange={this.sortList}>
                                <option>Sort</option>
                                <option>A-Z</option>
                                <option>Z-A</option>
                                <option>Low-High</option>
                                <option>High-Low</option>
                                <option>New-Old</option>
                                <option>Old-New</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-2 border-right'>
                            <div>
                                <h5 className='border-bottom'>Category</h5>
                            </div>
                            <div className="panel-group listItem">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h6 className="panel-title ml-2">
                                            <Link to='/product/all'>
                                                <button className='border-0 bg-white'
                                                    onClick={()=>{this.gettingProducts('all')}}>All
                                                </button>
                                            </Link>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-group listItem">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h6 className="panel-title ml-2">
                                            <a data-toggle="collapse" href="#collapse1">
                                                <button className='border-0 bg-white'>Seafood</button>
                                            </a>
                                        </h6>
                                    </div>
                                    <div id="collapse1" className="panel-collapse collapse">
                                        <ul className="list-group">
                                            <li className="list-group-item listItem">
                                                <button className='border-0 bg-white' onClick={this.onIkan}>Ikan</button>
                                            </li>
                                            <li className="list-group-item listItem">
                                                <button className='border-0 bg-white' onClick={this.onUdang}>Udang</button>
                                            </li>
                                            <li className="list-group-item listItem">
                                                <button className='border-0 bg-white' onClick={this.onKerang}>Kerang</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-group listItem">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h6 className="panel-title ml-2">
                                            <a data-toggle="collapse" href="#collapse2">
                                                <button className='border-0 bg-white'>Freshwater</button>
                                            </a>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div><h5 className='border-bottom'>Filter</h5></div>
                            <div className="mt-1 ml-2">
                                <h6>Name</h6>
                            </div>
                            <form className="input-group ml-2"><input ref={input => this.name = input} className="form-control" type="text" /></form>
                            <div className="mt-1 ml-2">
                                <h6>Price</h6>
                            </div>
                            <form className="input-group ml-2"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                            <form className="input-group ml-2"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                            <button onClick={this.onButtonSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                            <button onClick={this.onButtonReset} className="btn btn-outline-secondary btn-block mt-1">Reset</button>
                        </div>
                        <div className='col-10 row'>
                        {this.renderList()}
                        </div>
                    </div>
                </div>
                <div className='fixed-bottom'>
                    <Footer/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        products: state.product.products
    }

}

export default connect (mapStateToProps,{ getProducts })(Product)