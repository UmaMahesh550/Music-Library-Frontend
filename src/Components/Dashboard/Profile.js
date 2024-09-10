import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Authentication/Authentication';

//Profile page of our application which displays the details of the user that is logged in to the application
function Profile() {

  const { user } = useContext(AuthContext);
  const [userDetails,setUserDetails]=useState(null);

  useEffect( ()=>{
    axios.get('http://localhost:5000/api/users/profile',{
      headers: {
        Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
      }
    })
    .then(response=>{
      setUserDetails(response.data);
    })
    .catch(error=>{
      console.error('Error fetching user details'.error);
    })
  },[user])


  return (
    <div className='container mt-5'>
      {userDetails &&
      <div className="px-4 py-5 my-5">
        <div>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8Y6xPm60wPth_BaylY-pUlhGZjULAzZ2jw&s' alt='profile' height={100} width={100}/>
        </div>
        <div>
          <h5 className="display-1 fw-bold">{userDetails.userName}</h5>
          <div className='m-auto'>
            <table style={{ margin: '0 auto', textAlign: 'left'}} >
              <tr className="lead" style={{fontWeight:600}}>
                <td>Email Id:</td>
                <td>{userDetails.emailId}</td>
              </tr>
              <tr className="lead" style={{fontWeight:600}}>
                <td>Phone Number:</td>
                <td>{userDetails.phoneNumber}</td>
              </tr>
              <tr className="lead" style={{fontWeight:600}}>
                <td>Role:</td>
                <td>{userDetails.role}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Profile