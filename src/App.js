import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import MainLayout from './pages/mainLayout';
function App() {
  return (
    <>
     <Routes>
      <Route element={MainLayout}>
        <Route index element={<Home/>}/>
        <Route/>
      </Route>
     </Routes>

     <Routes>
      
     </Routes>
    </>
  );
}

export default App;
