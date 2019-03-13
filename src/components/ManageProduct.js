import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class ManageProduct extends Component {
    state = {
        products: []
    }

    onAddClick = () => {
        // console.log("Berhasil di klik");
        const name = this.name.value
        const desc = this.desc.value
        const price = parseInt(this.price.value)
        const src = this.pict.value
        
        axios.post('http://localhost:1985/product', {
                name,
                desc,
                price,
                src
        }) .then(res => {
            this.getProduct()
        })
            
    }

    onDeleteClick = (x) => {
        console.log(x);
        axios.delete(`http://localhost:1985/product/${x}`)
        .then(res =>{
            this.getProduct()
        }).catch(err => {console.log("DeleteClick Error: ",err);
        })
    }

    componentDidMount() {
        this.getProduct()
    }
    getProduct = () => {
        axios.get('http://localhost:1985/product')
            .then(res => {
                this.setState({products: res.data})
            })
    }
  
    renderList = () => {
        return this.state.products.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td><img className="list" src={item.src} alt={item.desc}></img></td>
                    <td>
                        <button className="btn btn-primary mr-2">Edit</button>
                        <button className="btn btn-danger" onClick={()=>{this.onDeleteClick(item.id)}} >Delete</button>
                    </td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div className="container">
                <h1 className="display-4 text-center">Manage Product</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
                <h1 className="display-4 text-center">input Product</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" placeholder="Stuff" /></th>
                            <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" placeholder="description" /></th>
                            <th scope="col"><input ref={input => this.price = input} className="form-control" type="number" placeolder="Price"/></th>
                            <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" placeholder="http://" /></th>
                            <th scope="col"><button onClick={this.onAddClick} className="btn btn-outline-warning" >Add</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    
    
}

export default connect()(ManageProduct)

