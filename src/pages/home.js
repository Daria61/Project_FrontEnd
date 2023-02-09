import React, { useEffect, useState } from 'react';
import axios from "axios"
import StartSectionImg from '../component/startSectionImg';
import NewReleases from '../component/newReleases';
import MostLiked from '../component/mostLiked';
import Catalog from '../component/catalog';
export default function Home() {
  const [header , setHeader] = useState()
   useEffect(()=>{
    axios.get('http://localhost:8080/webdesign')
    .then((info)=>{
      setHeader(info.data.result)
      console.log(info.data.result);
    })
    .catch((err)=>console.log(err))
   },[])
  return (
    <div className='contain'>
      <StartSectionImg/>
      <div>
        <NewReleases/>
        <MostLiked/>
        <Catalog/>
      </div>
    </div>
  )
}
