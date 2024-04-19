'use client'

import React from 'react'
import './../app/css/additional-styles/scroll-down.css'

function ScrollDown() {
  const scrollToExplore = () => {
    const exploreSection = document.getElementById('explore')
    if (exploreSection) {
      window.scrollTo({
        top: exploreSection.offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="container cursor-pointer" onClick={scrollToExplore}>
      <div className="chevron"></div>
      <div className="chevron"></div>
      <div className="chevron"></div>
    </div>
  )
}

export default ScrollDown
