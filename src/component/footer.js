import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import {useNavigate} from "react-router-dom"
import { Filter } from '../contexthandle/contextCreate'
export default function Footer() {

    const {filter, setFilter} = useContext(Filter)

    const navigate =  useNavigate()

    const [cate, setCate] = useState()
    useEffect(()=>{
        axios.get(" http://localhost:8080/api/category")
        .then((res)=> setCate(res.data.result),
        err=>console.log(err))
    },[])

  return (
    <div className='contain'>
        <div className='d-flex row mb-4'>
            <div className='col-3'>
                <img className='w-75 h-50' style={{objectFit:"cover"}} src={require("../images/logo.png")} alt="logo"/>
            </div>
            <div className='col-6 row text-start mt-5'>
                <div className='col-4'>
                    <h5 className='mb-3'>ABOUT COACH</h5>
                    <p style={{color: "#808B96"}}><a href='a'>Coach Story</a></p>
                    <p style={{color: "#808B96"}}><a href='a'>Legal</a></p>
                    <p style={{color: "#808B96"}}><a href='a'>Coach Foundation</a></p>
                </div>
                <div className='col-4'>
                    <h5 className='mb-3'>CATEGORIES</h5>
                    {cate?.map((a)=>{
                        return ( <p style={{color: "#808B96"}} className="catehoverF" onClick={()=> {setFilter(a.id); navigate("/shop")} }>{a.category}</p>)
                    })}
                </div>
                <div className='col-4'>
                    <h5 className='mb-3'>FOLLOW US</h5>
                    <p style={{color: "#808B96"}}><a href='https://www.instagram.com/coach/?hl=en'>Instagram</a></p>
                    <p style={{color: "#808B96"}}><a href='https://www.facebook.com/coach/'>Facebook</a></p>
                    <p style={{color: "#808B96"}}><a href='https://twitter.com/Coach?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'>Twitter</a></p>
                    <p style={{color: "#808B96"}}><a href='https://www.pinterest.com/coach/'>Pinterest</a></p>
                    <p style={{color: "#808B96"}}><a href='https://www.youtube.com/@coach'>Youtube</a></p>
                </div>
            </div>
            <div className='col-3 mt-5'>
                    <h5 className='mb-5'>SIGN UP TO OUT MAISILING LIST</h5>
                    <div className='d-flex border-bottom justify-content-between me-2'>
                    <input type="text" style={{outline: "none"}} placeholder="Your Email address" className="border-0"/>
                    <p>Sign Up</p>
                    </div>
            </div>
        </div>
    </div>
  )
}
