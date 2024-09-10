import React from 'react'

function LoadingPage() {
  return (
    <div className='container mt-5'>
        <div className="d-flex align-items-center" style={{"marginTop":200}}>
        <strong role="status">Loading...</strong>
        <div className="spinner-border ms-auto" aria-hidden="true"></div>
        </div>
    </div>
  )
}

export default LoadingPage