import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onLoginClick = (username) => {
    return (iniDispatch)=>{ // return ini dibuat untuk Middleware (awalnya tidak ada)
        console.log("check input: ",username);
        
        axios.get("http://localhost:1985/user", { 
            params: { // ingat ES6, jika parameter sama dengan object maka bisa ditulis username saja
                // username: user <- berhubung ini error maka disingkat saja
                username:username
            }
        }).then(res => { 
            
            if (res.data.length > 0){ // Jika ada isinya
                
                console.log("Check user[2]: ", res.data[0]);
                
                const {id,username}=res.data[0]
                
                
                
                iniDispatch({
                    type: "BERHASIL_LOGIN",
                    payload: {id,username} //res.data
                })
                // letak cookies 
                cookie.set('masihLogin', username, {path:'/'})
                
                
            } else {
                iniDispatch({ // Jika username tidak ditemukan
                    type: "ERROR_LOGIN",
                    payload: 'Username & password salah'
                }) 
            
                setTimeout(() => {
                    iniDispatch({
                        type: 'NO_MESSAGE'
                    })
                }, 3000);
                
            }
        }).catch(err => { // jika Missing In Action
            console.log("LogError: ", err.message);
        })
    }    
}

export const onRegClick = (user,pass) => {
    return iniDispatch =>{ 
        axios.get("http://localhost:1985/user", {
            params: { // aturan API buatan; ketika memakai get, maka memakai params
                username: user
            }
        }).then(res => {
            //.console.log(res.data);
            
            if (res.data.length === 0){
                // untuk masukkan db.json
                axios.post("http://localhost:1985/user", {  //aturan API buatan; ketika memakai post, maka memakai object
                    username: user, 
                    password: pass            
                }).then(res => { // jika proses berhasil tidak error (belum tentu membawa hasil, hanya proses yang berhasil); kalau gagal proses maka pakai .catch
                    // console.log("Registrasi berhasil");
                    iniDispatch ({
                        type: 'AUTH_SUCCESS',
                        payload: 'Register Berhasil'
                    })
                })  
            } else {
                iniDispatch ({
                    type: 'AUTH_ERROR',
                    payload: 'Username ' + user + ' telah terisi. Silahkan pilih username yang berbeda'
                })
                
            }
            setTimeout(() => {
                iniDispatch({
                    type: 'NO_MESSAGE'
                })
            }, 3000);
        }).catch(err => { // jika Missing In Action
            console.log("RegError: ", err.message);
        })
    }    
}

export const onLogoutUser = () => {
    cookie.remove('masihLogin')
    return { // dispatch digunakan untuk mengirim sebuah object, karena disini tidak mereturn function maka tidak dipaakai dispatch
        type: 'LOGOUT_USER'
    }
}

export const keepLogin = (user) => {
    return iniDispatch => {
        axios.get('http://localhost:1985/user', {
            params: {
                username: user
            }
        }) .then(res => {
            if(res.data.length > 0){
                iniDispatch({
                    type: 'BERHASIL_LOGIN',
                    payload: {username: user}
                })
            }
        }) .catch(err => { // jika Missing In Action
            console.log("Cookie Error: ", err.message);
        })
    }
}