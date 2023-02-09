import React from 'react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { SignInContext } from '../contexthandle/contextCreate';
export default function AdminSign() {

    const [data, setData]=useState();
    const [input, setInput] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate()
    const { setSignAdmin} = useContext(SignInContext)

    useEffect(()=>{
        axios.get('http://localhost:8080/api/staffs')
        .then(res=> {
            setData(res.data.result)
        }, err =>{
            console.log(err);
        });
    },[])

    const checkMail =(e)=>{
        e.preventDefault()
        const file = data.filter((a)=> a.email === input && a.password === pass)

        if(file.length > 0){
            localStorage.setItem("name", file[0].name);
            localStorage.setItem("id", file[0].id)
            setInput("")
            setPass("")
            setSignAdmin({adminName: file[0].name, id: file[0].id})
            navigate("/dashboard")
        }else{ 
            alert("Please try again")
            setInput("")
            setPass("")
        }
    }
        return(
               <div className=" rounded text-center mt-5">
               <div className="closeBtn" onClick={()=> navigate("/")}><i class="bi bi-x-lg"></i></div>
               <div className='mt-5'>
                   <h3>Sign in with email</h3>
                </div>
               <div className='my-5'>
                    <p>Your email</p>
                    <input className='border-0 border-bottom form-contol' type="text" value={input} onChange={(e) =>{setInput(e.target.value)}} style={{outline:"none", }}/>
               </div>
               <div className='my-5'>
                    <p>Password</p>
                    <input className='border-0 border-bottom form-contol' type="text" value={pass} onChange={(e) =>{setPass(e.target.value)}} style={{outline:"none",}}/>
               </div>
               <button style={{border:"0", borderRadius:"20px", padding :"8px 80px", color:"white", backgroundColor:"black "}} onClick={checkMail}>Sign in</button>
            </div>
        )
    }
    


