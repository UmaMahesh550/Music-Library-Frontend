import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {AuthContext} from '../Authentication/Authentication.js';
import { useParams, useNavigate } from 'react-router-dom';

//Updating the playlist i.e the palylist name
function UpdatePlaylist() {

  const [playlist,setPlaylist]=useState(null);
  const {user}=useContext(AuthContext);
  const {pid}=useParams();
  const navigate=useNavigate();

  useEffect(()=>{
    //fetching playlist based on it's id
    axios.get(`http://localhost:5000/api/playlists/id/${pid}`, {
      headers: {
        Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
      }
    })
    .then(response=>{
      if(response.data.length===0){
        console.warn('No Playlist found');
      }
      setPlaylist(response.data);
    })
    .catch(error=>{
      console.log('Error fetching playlist by id',error);
    })
  },[user,pid]);

  const formik=useFormik({
    enableReinitialize:true,
    initialValues:{
        name:playlist?.name || "",
    },
    validationSchema:Yup.object({
        name:Yup.string().min(4,'Playlist name should be atleast 4 characters').required('Playlist Name is required')
    }),
    onSubmit:(values,{setSubmitting, resetForm, setStatus})=>{
      //updating the playlist with the values provided from the form
      axios.put(`http://localhost:5000/api/playlists/playlist/${pid}`,values,{
          headers: {
            Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
          }
        })
      .then((response)=>{
        alert(response.data.message);
        resetForm();
        if(response.status===200){
          navigate('/allplaylists')
        }
      })
      .catch(error=>{
          setStatus("error");
      })
      .finally(()=>{
          setSubmitting(false);
      })            
    }
});


  return (
    <div className='container mt-5'>
      <div className="modal modal-sheet position-static d-block p-4 py-md-5" tabIndex="-1" role="dialog" id="modalSheet">
        <div className="modal-dialog">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header border-bottom-0">
              <h1 className="modal-title fs-5">Update Playlist</h1>
            </div>
            <form onSubmit={formik.handleSubmit}>
            <div className="modal-body py-0">
            
              <div className="form-floating">
                  <input type="text" className="form-control" id="name" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} placeholder="Playlist Name"/>
                  <label htmlFor="name">Playlist Name</label>
              </div>
            </div>
            {
              formik.touched.name && formik.errors.name ? (<div className='text-danger'>{formik.errors.name}</div>): null
            }
            <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
              <button  type="submit" className="btn btn-lg btn-primary">Save changes</button>
              <button  type="button" className="btn btn-lg btn-danger" onClick={()=>(navigate('/allplaylists'))}>Cancel</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdatePlaylist