import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Authentication/Authentication'

//Footer of the application
function Footer() {

  const {user}=useContext(AuthContext);

  return (
    <>
    <div style={{color:'white'}}>
    <footer className="py-4 px-5 mx-5 mt-5 mb-1 border-top">
      <div className="row">
        <div className="col d-flex flex-column flex-sm-row justify-content-between py-2 my-2">
          <ul className="nav mx-5"> 
            <li className="nav-item" style={{marginRight:30, borderRadius:15, alignContent:'center'}}><Link to='/' className="nav-link px-2 text-body-primary" style={{color:'white'}}><u>Home</u></Link></li>
            {user && user.role==='user' &&
              <li className="nav-item" style={{marginRight:30, borderRadius:15, alignContent:'center'}}><Link to='/usersongs' className="nav-link px-2 text-body-primary" style={{color:'white'}}><u>Songs</u></Link></li>
            }
            {user && user.role==='admin' &&
              <li className="nav-item" style={{marginRight:30, borderRadius:15, alignContent:'center'}}><Link to='/adminsongs' className="nav-link px-2 text-body-primary" style={{color:'white'}}><u>Songs</u></Link></li>
            }
            {user &&
              <li className="nav-item" style={{marginRight:30, borderRadius:15, alignContent:'center'}}><Link to='/searchsongs' className="nav-link px-2 text-body-primary" style={{color:'white'}}><u>Search Songs</u></Link></li>
            }
            <li className="nav-item" style={{marginRight:30, borderRadius:15, alignContent:'center'}}><Link to='/aboutus' className="nav-link px-2 text-body-primary" style={{color:'white'}}><u>About Us</u></Link></li>
          </ul>
        </div>
        <div className="col-md-2 d-flex flex-column flex-sm-row justify-content-between py-2 my-2" >
          <form style={{float:'right'}}>
            <h4>Email</h4>
            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
              <p>musiclibrary@gmail.com<br/>musiclibrary@yahoo.com</p>
            </div>
          </form>
        </div>
        <div className="col-md-2 d-flex flex-column flex-sm-row justify-content-between py-2 my-2" >
          <form style={{float:'right'}}>
            <h4>Contact</h4>
            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
              <p>08933-273689<br/>(+91)8792736827</p>
            </div>
          </form>
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-center py-1 my-1">
        <p style={{textAlign:'center'}}>© 2024 Music Company, Inc. All rights reserved.</p>
      </div>
    </footer>
    </div>
    </>
  )
}

export default Footer