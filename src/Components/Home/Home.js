import React, { useContext } from 'react'
import { AuthContext } from '../Authentication/Authentication';
import { useNavigate } from 'react-router-dom';

//Home page of the application
function Home() {

    const {user} = useContext(AuthContext);
    const navigate=useNavigate();

    return (
        <div className='container'>
            <div className="container my-5">
                <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Music Library</h1><br/>
                        <p className="lead" style={{fontWeight:400}}> This music library-application is a simple explorer for your personal music collection.
                            The main objective of a music library app is to provide an enjoyable and frictionless experience for listeners to access virtually 
                            any song they want, instantly and affordably. A major aim is to build a large catalog of songs from all albums and artists the appeal of the app.</p><br/>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                            {!user &&
                            <div>
                                <button type="button" onClick={()=>(navigate('/login'))} className="btn btn-outline-primary btn-lg px-4 me-md-2 fw-bold">Sign In</button>
                                <button type="button" onClick={()=>(navigate('/register'))} className="btn btn-outline-secondary btn-lg px-4">Sign Up</button>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                        <img className="rounded-lg-3" src="https://miro.medium.com/v2/resize:fit:1400/1*nChshyHhYer985FIUWu6TA.jpeg" alt="music" width="500" height='350' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home