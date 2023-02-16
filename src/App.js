import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import MainLayout from './pages/mainLayout';
import { useState } from 'react';
import AdminLay from './adminPages/adminLay';
import AdminSign from './adminPages/adminSign';
import AdminUsers from './adminPages/admin.users';
import AdminStaffs from './adminPages/adminStaffs';
import AdminDashboard from './adminPages/adminDashboard';
import AdminProducts from './adminPages/adminProducts';
import AdminCategory from './adminPages/adminCategory';
import UsersDetail from './adminPages/usersDetail';
import AddProduct from './adminPages/addProduct';
import ContextServiceAdmin from './contexthandle/contextService';
import ContextService from './contexthandle/mainContextService';
import Sale from './pages/sale';
import Shop from './pages/shop';
import Wallet from "./pages/wallet"
import Detail from './pages/detail';
import Login from './pages/login';
import User from './pages/user';
function App() {
  
  const [signAdmin, setSignAdmin] = useState([])
  const [control, setControl] = useState(false)
  const [filter, setFilter] = useState()
  const [searching , setSearching ] = useState()
  const [user, setUser] = useState()
  

  return (
     <>
    <ContextService filter={filter} setFilter={setFilter} searching={searching} setSearching={setSearching} user={user} setUser={setUser}>
    <Routes>
      <Route element={<MainLayout control={control} setControl={setControl}/>}>
        <Route index path="/" element={<Home control={control} setControl={setControl} />}/>
        <Route path="/shop" element={<Shop/>}></Route>
        <Route path="/shop/:id" element={<Detail/>}></Route>
        <Route path="/sale" element={<Sale/>}></Route>
        <Route path="/wallet" element={<Wallet/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path='/user' element={<User/>}></Route>
      </Route>
     </Routes>
    </ContextService>

    {/* <ContextServiceAdmin signAdmin={signAdmin} setSignAdmin={setSignAdmin}>
    <Routes>
      <Route exact path='/sign' element={<AdminSign/>}></Route>
      <Route element={<AdminLay signAdmin={signAdmin}/>}>
        <Route index path="/dashboard" element={<AdminDashboard/>}></Route>
        <Route path='/users' element={<AdminUsers/>}></Route>
        <Route path='/users/:id' element={<UsersDetail/>}></Route>
        <Route path="/products" element={<AdminProducts/>}></Route>
        <Route path="/productsadd" element={<AddProduct/>}></Route>
        <Route path='/category' element={<AdminCategory/>}></Route>
        <Route path="/staffs" element={<AdminStaffs/>}></Route>
      </Route>
    </Routes>
    </ContextServiceAdmin> */}
    </>
  )
}

export default App;
