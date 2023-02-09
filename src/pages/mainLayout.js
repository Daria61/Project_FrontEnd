import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/footer'

const  MainLayout = ({control, setControl})=> {
  return (
    <div>
        <Header control={control} setControl={setControl}/>
        <Outlet control={control} setControl={setControl}/>
        <Footer/>
    </div>
  )
}
export default MainLayout