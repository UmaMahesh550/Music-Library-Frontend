import React from 'react'

function AboutUs() {
  return (
    <div className="container py-4">
        <div className="container my-5">
            <header className="pb-3 mb-4 border-bottom">
                <a href="/aboutus" className="d-flex align-items-center text-body-emphasis text-decoration-none">
                    <span className="fs-4 mx-5"><b>About Us</b></span>
                </a>
            </header>
            <div className="position-relative p-5 text-center bg-body border border-dashed rounded-5">
                <h1 className="text-body-emphasis">Music Library</h1><br/>
                <p className="col-lg-6 mx-auto mb-4 fs-5">
                This music library-application is a simple explorer for your personal music collection.
                The main objective of a music library app is to provide an enjoyable and frictionless 
                experience for listeners to access virtually any song they want, instantly and affordably. 
                A major aim is to build a large catalog of songs from all albums and artists the appeal of the app.
                </p>
            </div>
        </div>
    </div>
  )
}

export default AboutUs