import React from 'react'
import '../global.css'
import '../css/Splash.css'
// import header from './header.png'

const Splash = () => {
  return (
    <div className="section-splash">
      <div className="main col">
        {/* <img src={header} alt="The Shoppies" draggable="false" /> */}
        <div className="searchSection">
          {/* add conditional for responsiveness - shrink header text + nav */}
          {/* <SearchBar /> */}
        </div>
      </div>
    </div>
  )
}

export default Splash
