import React, { useState , useContext, useEffect} from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import { Search } from '../contexthandle/contextCreate'
import axios from 'axios'
const Header = ({control, setControl})=> {
  const [search , setSearch] = useState(false)
  const { searching, setSearching} = useContext(Search)
  const navigate = useNavigate()

  const [suggest , setSuggest] = useState()
  const [searched, setSearched] = useState()
  
  useEffect(()=>{
    axios.get("http://localhost:8080/api/products")
    .then((res)=> {setSuggest(res.data.result); setSearched(res.data.result)} , err=> console.log(err))
  },[])

  const onSearch =()=>{
    setSearched(suggest?.filter((a)=> {
      if(a.productName.includes(searching)){
        return a
      }
    }))
  }

  const jupm=(id)=>{
    setSearch(!search);
     setSearching(""); 
     setSearched(suggest); 
     navigate(`/shop/${id}`) 

  }

  return (
    <div className='contain' style={{position: "relative"}}>
      <div className='row d-flex justify-content-between align-items-center'>
        <div className='col-3 d-flex gap-3 '>
          <NavLink to="/shop" style={({ isActive })=> {return isActive?  {color :"black"}: {color:"#808B96"}}}>SHOP</NavLink>
          <NavLink to="/sale" style={({ isActive })=> {return isActive?  {color :"black"}: {color:"#808B96"}}}>SALE</NavLink>
        </div>
        <div className='col-3 d-flex justify-content-around'>
          <NavLink to="/">
          <img style={{width :"150px", height: "60px", objectFit: "cover"}} src={require('../images/logo.png')} alt="img"/>
          </NavLink>
        </div>
        <div className='col-3  d-flex gap-4 justify-content-end'>
        <i class="bi bi-search" onClick={()=>{ setSearch(!search); setSearching("")}} ></i>
        <NavLink to="/wallet"><i class="bi bi-bag"></i></NavLink>
        <NavLink to="/login"><i class="bi bi-person"></i> </NavLink>
        </div>
      </div>
      <div style={{position: "absolute" , top : "15px", right: "110px", width: "1000px", display : search? "block" : "none"}}> 
        <input type="text" value={searching} className='w-100 border-0 border-bottom' placeholder='Search' style={{outline: "none"}} onChange={(e)=>{setSearching(e.target.value) ; onSearch()}}/>
      </div>
      <div className='searchShow' style={{ overflow: "scroll",display : search? "block" : "none",position: "absolute", backgroundColor:"#E5E7E9", right:"110px", top: "50px", width:"1000px", height:"500px", borderRadius:"5px", zIndex:"10"}}>
        <div className='d-flex row' >
          <h5 className='m-3'>Result</h5>
          {searched?.map((a)=>{
            return(
              <div className=' col-3 ps-4 pe-4 p-2 ' style={{maxHeight:"220px"}} >
                <div className='border rounded bg-white h-100 ' onClick={()=> jupm(a.id)}>
                 <div className=' text-center'>
                 <img src={a.thumb} alt="thumbImg"  style={{width: "150px", height:"120px",objectFit:"cover", }}/>
                 </div>
                <p className='ps-4'>{a.productName}</p>
                <p className='ps-4'>{a.price}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default Header
