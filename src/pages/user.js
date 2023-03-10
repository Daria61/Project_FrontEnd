import React from 'react'
import { NavLink, useNavigate,Outlet } from 'react-router-dom'
import { UserLogin } from '../contexthandle/contextCreate'
import { useContext } from 'react'

export default function User() {
  const {user, setUser} = useContext(UserLogin)

  const logOut=()=>{
    localStorage.removeItem("username")
    localStorage.removeItem("id")
  }

  return (
    <div className='contain row'>
      <div className='col-2 border-end '>
        <div className='d-flex gap-2 align-items-baseline mb-3 pt-4'>
        <i class="bi bi-person-circle fs-4"></i>
        <h5>{user?.name}</h5>
        </div>
      <NavLink to="/shop">
      <div className='d-flex gap-2 mt-3'>
          <i class="bi bi-cart"></i>
          <p>Shop</p>
      </div>
      </NavLink>
      <NavLink to="/wallet">
      <div className='d-flex gap-2 mt-3'>
          <i class="bi bi-list-stars"></i>
          <p>Wish list</p>
      </div>
      </NavLink>
      <NavLink to="/settings">
      <div className='d-flex gap-2 mt-3'>
         <i class="bi bi-gear"></i>
          <p>Settings</p>
      </div>
      </NavLink>
      <NavLink to="/" onClick={logOut}>
      <div className='d-flex gap-2 mt-3'>
         <i class="bi bi-box-arrow-right"></i>
          <p>Log out</p>
      </div>
      </NavLink>
      </div>
      <div className='col-9'>
        <Outlet/>
      </div>
    </div>
  )
}
