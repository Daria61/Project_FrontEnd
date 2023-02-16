import React from 'react'
import Allcatalog from '../component/allcatalog'
import Showproducts from '../component/showproducts'

export default function Shop() {
  return (
    <div className='contain'>
      <Allcatalog/>
      <Showproducts/>
    </div>
  )
}
