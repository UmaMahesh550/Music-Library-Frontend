import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Authentication/Authentication';

//Notification component to fetch the notifications that are created as soon as a song is created.
function Notifications() {

  const {user,getCount}=useContext(AuthContext);
  const [notifications,setNotifications]=useState([]);

  useEffect(()=>{
    if(user){
      fetchUnreadNotifications();
    }
  },[user])

  //Fetch unread notifications of loggedin  user
  const fetchUnreadNotifications = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/notifications/unread`, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        setNotifications(response.data);
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
        await axios.put(`http://localhost:5000/api/notifications/${notificationId}/markAsRead`, null, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        setNotifications(notifications.filter(n => n._id !== notificationId));
        getCount();
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
};

  return (
    <div className='container mt-5'>
      <h3 style={{textAlign:'left'}}><b>Notifications:</b></h3>
      <div className='mt-5' style={{textAlign:'left'}}>
      {notifications.length>0?(notifications.map(notification=>(
        <div >
          <div class="alert alert-info alert-dismissible fade show" role="alert">
            <h6>Hello User! {notification.message}<small style={{float:'right'}}>Created On:{new Date(notification.createdAt).toLocaleDateString()}</small></h6>
            <button type="button" onClick={()=>(markAsRead(notification._id))} class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
      ))):<h5 style={{textAlign:'center'}}>No Notifications available</h5>}
      </div>
    </div>
  )
}

export default Notifications