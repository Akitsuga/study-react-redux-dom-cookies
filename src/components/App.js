import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import cookies from 'universal-cookie'

import {keepLogin} from '../actions'

import Home from './Home'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import ManageProduct from './ManageProduct'

const cookie = new cookies()

class App extends Component {
    // Life cycle hook / method
    componentDidMount(){
        // akan di jalankan sekali ketika pertama kali component di render
        
        // mengambil value yang disimpan pada file cookie masihLogin
        var userCookie = cookie.get('masihLogin')
        // jika didapatkan username di file cookie, akan memanggil function keepLogin
        if(userCookie !== undefined){
            console.log("cookie ada");
            // function keepLogin akan me-loginkan ulang username yg tersimpan pada file cookie
            this.props.keepLogin(userCookie)       
        }
    }

    render () {
        return (                
                <BrowserRouter>
                <div>
                    {/* App.js disini
                    Rencana Header disini */}
                    {/* link.contains("/login") */}
                    {/* link === "/login" */}
                    <Header/>
                    <Route path="/" exact component={Home}/> 
                    <Route path="/login" component={Login}/> 
                    <Route path="/register" component={Register}/> 
                    <Route path="/manageproduct" component={ManageProduct}/>
                    {/* Semua dibawah ini di upgrade, hasilnya diatas
                    <Home/>
                    <Login/>
                    <Register/> */}
                </div>
                </BrowserRouter>
        )
    }
}

export default connect (null,{keepLogin})(App)