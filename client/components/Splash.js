import React from 'react'
import '../global.css'
import '../css/Splash.css'
import header from './header.png'

const Splash = () => {
  return (
    <div className="section-splash">
      <div className="main col">
        <img src={header} alt="The Shoppies" draggable="false" />
        <div className="searchSection">
          {/* <h1>Start Nominating</h1> */}
          {/* add conditional for responsiveness - shrink header text + nav */}
          <div className="searchBar">
            <i className="fas fa-search" />
            <input placeholder="Start searching for a nomination-worthy movie title here" />
          </div>
          <div className="buttonBar">
            <button type="button" className="searchButton">
              Search
            </button>
            <button type="button" className="nomButton">
              View Nominations
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Splash
