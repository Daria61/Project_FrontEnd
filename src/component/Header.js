import React from 'react'
import { useNavigate } from 'react-router-dom'
const Header = ({control, setControl})=> {
  const navigate = useNavigate()
  return (
    <div className='contain'>
      <div className='row d-flex justify-content-between align-items-center'>
        <div className='col-3 d-flex gap-3 '>
          <p onClick={navigate("/shop")}>SHOP</p>
          <p>SALE</p>
        </div>
        <div className='col-3 d-flex justify-content-around'>
          <img style={{width :"150px", height: "60px", objectFit: "cover"}} src={require('../images/logo.png')} alt="img"/>
        </div>
        <div className='col-3  d-flex gap-4 justify-content-end'>
        <i class="bi bi-search"></i>
        <i class="bi bi-bag"></i>
        <i class="bi bi-person"></i>
        </div>
      </div>
    </div>
  )
}
export default Header
