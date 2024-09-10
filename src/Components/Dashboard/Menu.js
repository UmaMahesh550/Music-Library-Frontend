import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Authentication/Authentication';

//Nav-bar or the Menu bar of the application which helps accessing different components
function Menu() {

  const {user, logout, getCount, count} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    getCount();
  },[user])

  //calling this method when clicking the logout button in the menu which calls the logout function in auth middleware
  const handleLogout = () =>{
      logout();
      navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg  bg-success rounded" aria-label="thirteen navbar example">
      <div className="container-fluid">
        <button className="navbar-toggler collapsed dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to='/'><img src='https://www.cnet.com/a/img/resize/c0b4b98d22f67b9ad2d8faba4bb707c643a5e989/hub/2016/06/21/72e03f2a-9435-4566-92aa-d1394827de10/applemusic-ios.png?auto=webp&fit=crop&height=1200&width=1200' alt='music' height={50} width={70} style={{borderRadius:100}}/></Link>
        <Link className="navbar-brand" to='/' style={{ color:'white'}}><b>Music Library</b></Link> 
        
        <div className="navbar-collapse collapse d-lg-flex" id="navbarsExample11">
          <ul className="navbar-nav me-auto mb-2 col-lg-11 justify-content-lg-center">
            <li className="nav-item" style={{marginRight:20}}>
              <Link className="nav-link active" aria-current="page" to='/' style={{color:'white'}}><b>Home</b></Link>
            </li>

            {user && user.role==='user' &&
            <li className="nav-item" style={{marginRight:20}}>
              <Link className="nav-link active" aria-current="page" to='/usersongs' style={{color:'white'}}><b>Songs</b></Link>
            </li>
            }
            {user && user.role==='admin' &&
            <li className="nav-item" style={{marginRight:20}}>
              <Link className="nav-link active" aria-current="page" to='/adminsongs' style={{color:'white'}}><b>Songs</b></Link>
            </li>
            }
            {user && user.role==='user' &&
            <li className="nav-item" style={{marginRight:20}}>
              <Link className="nav-link active" aria-current="page" to='/allplaylists' style={{color:'white'}}><b>Playlists</b></Link>
            </li>
            }
            {user && user.role==='user' && 
            <li className="nav-item" style={{marginRight:20}}>
              <Link className="nav-link active" aria-current="page" to='/searchsongs' style={{color:'white'}}><b>Search Songs</b></Link>
            </li>
            }
            {user && user.role==='user' &&
            <li className="nav-item" style={{marginRight:20}}>
              <Link className="nav-link active" aria-current="page" to='/createplaylist' style={{color:'white'}}><b>Create Playlist</b></Link>
            </li>
            }
            
            { user && user.role==='admin'?(
            <li className="nav-item" style={{marginRight:20}}> 
              <Link className="nav-link active" aria-current="page" to='/addsong' style={{color:'white'}}><b>Add Song</b></Link>
            </li>
            ):null}

            <li className="nav-item" style={{marginRight:20}}> 
              <Link className="nav-link active" aria-current="page" to='/aboutus' style={{color:'white'}}><b>About Us</b></Link>
            </li>
          </ul>
        </div>

        <div className="dropdown" style={{"marginRight":20, 'marginLeft':20}}>
          <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
            {user && 
             <b>
                {user.userName}
                {user.role==='user' && count>0 && <span className="badge text-bg-danger" style={{float:'right'}}>{count}</span>}
            </b>
            }
            {!user &&
            <>Menu</>}
          </button>
          <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
              <>
              {user && user.role==='user'?(
                <li><Link className="dropdown-item" to={'/notifications'}>Notifications<span className="badge text-bg-danger" style={{float:'right'}}>{count}</span></Link></li>
              ):null}
              {user &&
                <div>
                  <li><Link className="dropdown-item" to={'/profile'}>Profile<img src='https://i.pinimg.com/736x/07/66/d1/0766d183119ff92920403eb7ae566a85.jpg' height={20} width={20} alt='Profile' style={{float:'right'}}/></Link></li>
                  <li><Link className="dropdown-item" onClick={handleLogout}>Logout<img src='https://i.pinimg.com/originals/ce/32/c6/ce32c62c5b10c25e0dba7ce29e99d9d4.png' height={20} alt='Logout' width={20} style={{float:'right'}}/></Link></li>
                </div>
              }
              {!user &&
                <div>
                  <li><Link className="dropdown-item" to={'/login'}>Login<img src='https://www.freeiconspng.com/thumbs/login-icon/door-login-icon--1.png' height={20} width={30} alt='Login' style={{float:'right'}}/></Link></li>
                  <li><Link className="dropdown-item" to={'/register'}>Register<img src='https://i1.wp.com/softcom2017.fesb.unist.hr/wp-content/uploads/2016/07/register-icon.png?fit=595%2C586' height={20} width={20} alt='Register' style={{float:'right'}}/> </Link></li>
                </div>
              }
              </>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Menu