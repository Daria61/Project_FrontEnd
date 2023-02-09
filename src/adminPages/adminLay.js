import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import AdminHeader  from '../adminComponent/component/adminHeader'
import { SignInContext } from '../contexthandle/contextCreate'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
export default function AdminLay() {
  const navigate = useNavigate()
  const { setSignAdmin} = useContext(SignInContext)


  return (
    <div>
        <AdminHeader/>
        <div className='d-flex row  '>
          <div className='col-md-2 pb-5 mb-5'>
            <div className='mx-3 mb-5'>
            <NavLink to="/dashboard"className=" text-decoration-none  d-flex my-3 gap-2 p-2  rounded" style={({isActive})=>({
            backgroundColor: isActive? "#D2B6DE" : "white" , color: isActive? "#7303A3 ": "#ccc"})}>
                <i className="bi bi-clipboard-fill"></i>
                <p className='menuHover'>Dashboard</p>
            </NavLink>

            <NavLink to="/users"className=" text-decoration-none  d-flex my-3 gap-2 p-2  rounded" style={({isActive})=>({
            backgroundColor: isActive? "#D2B6DE" : "white" , color: isActive? "#7303A3 ": "#ccc"})}>
               <i className="bi bi-people-fill"></i>
               <p className='menuHover'>Users</p>
            </NavLink>
            <NavLink to="/products"className=" text-decoration-none  d-flex my-3 gap-2 p-2  rounded " style={({isActive})=>({
                backgroundColor: isActive? "#D2B6DE" : "white" , color: isActive? "#7303A3 ": "#ccc"})}>
                  <i className="bi bi-box2-heart-fill"></i>
                  <p className='menuHover'>Products</p>
                </NavLink>           
                <NavLink to="/category"className=" text-decoration-none  d-flex my-3 gap-2 p-2  rounded" style={({isActive})=>({
                backgroundColor: isActive? "#D2B6DE" : "white" , color: isActive? "#7303A3 ": "#ccc" })} >
                <i className="bi bi-tags-fill"></i>
                <p className='menuHover'>Caregories & Brands</p>              
              </NavLink>
              <NavLink to="/staffs"className=" text-decoration-none d-flex my-3 gap-2 p-2  rounded" style={({isActive})=>({
                backgroundColor: isActive? "#8DC8FF" : "white" , color: isActive? "#0068CA ": "#ccc"})} >
                <i className="bi bi-person-hearts"></i>
                <p className='menuHover'>Staffs</p>
              </NavLink>
            </div>



            <div className='mx-3 pt-4'>
            <NavLink to=""className=" text-decoration-none d-flex my-3 gap-2 p-2  rounded" style={({isActive})=>({
              backgroundColor: isActive? "#D2B6DE" : "white" , color: isActive? "#7303A3 ": "#ccc"})} >
              <i className="bi bi-gear-wide"></i>
              <p className='menuHover'>Settings</p>
            </NavLink>
            <NavLink to=""className=" text-decoration-none d-flex my-3 gap-2 p-2  rounded" style={({isActive})=>({
              backgroundColor: isActive? "#D2B6DE" : "white" , color: isActive? "#7303A3 ": "#ccc"})} >
              <i className="bi bi-box-arrow-right"></i>
              <p className='menuHover' onClick={()=>{setSignAdmin([]); localStorage.clear(); navigate("/sign")}}>Logout</p>
            </NavLink>
            <NavLink to=""className=" text-decoration-none d-flex my-3 gap-2 p-2  rounded" style={({isActive})=>({
              backgroundColor: isActive? "#D2B6DE" : "white" , color: isActive? "#7303A3 ": "#ccc"})} >
              <i className="bi bi-question-circle"></i>
              <p className='menuHover'>Help</p>
            </NavLink>
            </div>
            <img alt="cat" src={require("../images/undraw_Cat_s1wg.png")} className="w-100"/>
          </div>
          <div className='col-md-10'>
         <Outlet/>
          </div>
        </div>
    </div>
  )

}