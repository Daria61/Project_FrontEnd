import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserLogin } from '../contexthandle/contextCreate'
export default function Login() {
    const navigate = useNavigate()
   
    useEffect(()=>{
        if(localStorage.getItem("username")){
            navigate("/user")
        }
    },[])

    const obj = {
        "name": "",
        "email": "",
        "password": "",
        "phone": "", 
     }

     const log ={
        email: "",
        password: ""
     }

     const [newUser, setNewUser]= useState(obj)
     const [mpass, setMpass] = useState("")
     const [login, setLogin] = useState(log)
     const {user, setUser} = useContext(UserLogin)
     const [check , setCheck] = useState(false)


    const signIn =()=>{
        if(!login.email && !login.password){
            alert("Please fill all form")
        }else{
            axios.post("http://localhost:8080/api/user/login", login)
        .then((res)=> {res.data.status? 
            setUser(res.data.result) : alert("Not Found")}, err=> console.log(err))

        if(user){
            localStorage.setItem("username", user?.name)
            navigate("/")
            setLogin(log)
        }
        }
    }

    const create =()=>{
        console.log(newUser);
        if(!newUser.email && !newUser.password && !newUser.name && !newUser.phone){
            alert("Please fill all")
        } 
        if(!check){
            alert("please check agree")
        }
        if(!newUser.email.includes("@gmail.com")){
            alert("fill correct mail")
        }
        axios.post("http://localhost:8080/api/user", newUser)
        .then((res)=> console.log(res.data.result))
    }

  return (
    <div className='contain'>
        <div className='d-flex row mt-3 pt-3'>
            <div className='col-md-6 p-5 border-end'>
                <h3 className='mb-3'>Sign in to Coach Insider</h3>
                <div className='m-2 '>
                    <input style={{maxWidth: "350px"}} value={login.email} onChange={(e)=>setLogin({...login, email: e.target.value})} className='p-2 w-100 ' type="text" placeholder='Email Address' />
                </div>
                <div className='m-2 '>
                    <input style={{maxWidth: "350px"}} value={login.password} onChange={(e)=>setLogin({...login, password: e.target.value})} className='p-2 w-100 ' type="text" placeholder='Password'/>
                </div>
                <div className='row d-flex  m-2' style={{maxWidth: "350px"}}>
                    <div className='col-6'>
                        <input type="checkbox" id="remember" className='me-2'/>
                        <label htmlFor='remember'>Remember Me</label>
                    </div>
                    <div className='col-6 text-end'>
                        <a href='/' className='border-bottom'>Forgot Password</a>
                    </div>
                </div>
                <button onClick={()=>signIn()} style={{maxWidth: "350px"}} className='border-0 bg-black text-white w-100 p-2 ms-2'>SIGN IN</button>
            </div>
            <div className='col-md-6 p-5 '>
                <h3 className='mb-3'>Become a Coach Insider</h3>
                <div className='m-2 '>
                    <input style={{maxWidth: "350px"}} className='p-2 w-100 ' value={newUser.name} type="text" placeholder='Name' onChange={(e)=> setNewUser({...newUser, name : e.target.value})}/>
                </div>
                <div className='m-2 '>
                    <input style={{maxWidth: "350px"}} className='p-2 w-100 ' value={newUser.email} type="text" placeholder='Email Address' onChange={(e)=> setNewUser({...newUser, email : e.target.value})}/>
                </div>
                <div className='m-2 '>
                    <input style={{maxWidth: "350px"}} className='p-2 w-100 ' value={newUser.phone} type="text" placeholder='Phone' onChange={(e)=> setNewUser({...newUser, phone : e.target.value})}/>
                </div>
                <div className='m-2 '>
                    <input style={{maxWidth: "350px"}} className='p-2 w-100 ' type="text" value={newUser.password} placeholder='Password' onChange={(e)=> setNewUser({...newUser, password : e.target.value})}/>
                </div>
                <div className='m-2 '>
                    <input style={{maxWidth: "350px"}} className='p-2 w-100 ' type="text" value={mpass} placeholder='Confirm Password' onChange={(e)=> {setMpass(e.target.value)}}/>
                </div>
               <div className='m-2 '>
               <p style={{fontSize: "12px" , color:  mpass === newUser.password ? "green": "red"}}>{ mpass === newUser.password ? "Match" : "Do not Match"}</p>
               <p style={{fontSize: "12px" , color: newUser.password.length >= 8 ? "green" : "red" }}>Must be 8 or more characters</p>
               </div>
               <div className='m-2'>
                   <input type="checkbox" id="agree" value={check} className='me-2' onChange={(e)=> setCheck(e.target.checked)}/>
                   <label htmlFor='agree'>Agree with Our <a href='https://www.coachoutlet.com/support/privacy-policy' className='border-bottom'>Privacy Policy</a></label>
               </div>
               <button onClick={()=>create()} style={{maxWidth: "350px"}} className='border-0 bg-black text-white w-100 p-2 ms-2' >CREATE ACCOUNT</button>
            </div>
        </div>
    </div>
  )
}
