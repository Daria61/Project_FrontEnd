import React from 'react';
import StartSectionImg from '../component/startSectionImg';
import NewReleases from '../component/newReleases';
import MostLiked from '../component/mostLiked';
import Catalog from '../component/catalog';
export default function Home() {
  return (
    <div className='contain'>
      <StartSectionImg/>
      <div>
        <NewReleases/>
        <Catalog/>
        <MostLiked/>
      </div>
    </div>
  )
}
