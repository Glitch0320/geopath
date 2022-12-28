import React, { useRef, useEffect } from 'react'

function Compass({ degree }) {
  const compassRef = useRef(null)

  useEffect(() => {
    const compass = compassRef.current
    compass.style.transform = `rotate(${degree}deg)`
  }, [degree])

  return (
    <div 
    style={{
        position: 'fixed',
        zIndex: 1000,
        top: '8rem'
      }}
    ref={compassRef}>
      <div className="compass-direction">N</div>
      <div className="compass-direction">NE</div>
      <div className="compass-direction">E</div>
      <div className="compass-direction">SE</div>
      <div className="compass-direction">S</div>
      <div className="compass-direction">SW</div>
      <div className="compass-direction">W</div>
      <div className="compass-direction">NW</div>
    </div>
  )
}

export default Compass