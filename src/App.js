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
import ContextService from './contexthandle/contextService';
import Shop from './pages/shop';
function App() {
  
  const [signAdmin, setSignAdmin] = useState([])
  const [control, setControl] = useState(false)
  

  return (
     <>
     <Routes>
      <Route element={<MainLayout control={control} setControl={setControl}/>}>
        <Route index path="/" element={<Home control={control} setControl={setControl} />}/>
        <Route path="/shop" element={<Shop/>}></Route>
      </Route>
     </Routes>

    <ContextService signAdmin={signAdmin} setSignAdmin={setSignAdmin}>
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
    </ContextService>
    </>
  )
}

export default App;
