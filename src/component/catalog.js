import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import {Filter} from "../contexthandle/contextCreate"
import {NavLink} from "react-router-dom"
export default function Catalog() {

  const {filter, setFilter} = useContext(Filter)
    // const [pro, setPro] = useState()
    // const [cate , setCate] = useState({"women" : "", "men" : ""})
    // const [women , setWomen] =useState()

    // useEffect(()=>{
    //     axios.get("http://localhost:8080/api/products")
    //     .then((res)=>setPro(res.data.result))
    // }, [])

    // useEffect(()=>{
    //     axios.get("http://localhost:8080/api/category")
    //     .then((res)=>setCate({...cate, women: res.data.result.map((a)=> a.category === "Women") , men : res.data.result.map((a)=> a.category === "Men")}))
    // }, [])

    // const filt = pro?.filter((a)=>{ return a.category?.includes(cate.women?.id)? a : ""})
    

  return (
    <div className='mt-5 mb-5'>
        <h3 style={{fontWeight: 400}}>CATALOG</h3>
        <div className='d-flex row'>
          <div style={{position:"relative"}} className='col-md-6'>
            <img className='w-100' style={{height: "500px", objectFit: "cover"}} src={require("../images/secondwoman.jpeg")} alt="women"/>
              <NavLink to="/shop"  onClick={()=> setFilter("0af51716-d781-4832-93f6-542087bf2879")}>
              <button className='button'>Women's</button>
              </NavLink>
          </div>
          <div style={{position:"relative"}} className='col-md-6'>
            <img className='w-100' style={{height: "500px", objectFit: "cover"}} src={require("../images/third.jpeg")} alt="men"/>
            <NavLink to="/shop" onClick={()=> setFilter("b1f2eb1d-b81a-462d-ae77-2372ea3fb1ea")}>
            <button  className='button'>Men's</button>
            </NavLink>
          </div>
        </div>
    </div>
  )
}
