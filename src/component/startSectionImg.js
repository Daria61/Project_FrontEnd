import React from 'react'

export default function StartSectionImg() {
  return (
    <div className='d-flex row '>
        <img className='col-6' style={{objectFit: "cover"}} src={require("../mainImg/lilNasX.jpeg")} alt="coach"/>
        <img className='col-6' style={{objectFit: "cover"}} src={require("../mainImg/LilNasX.webp")} alt="coach"/>
    </div>
  )
}
