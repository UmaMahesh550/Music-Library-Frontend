import React, { useContext } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../Authentication/Authentication';

//Playlist creation page where a user can add new playlist to his playlists
function CreatePlaylist() {

  const {user}=useContext(AuthContext);
  const navigate=useNavigate();
  const formik=useFormik({
    enableReinitialize:true,
    initialValues:{
      name:''
    },
    validationSchema:Yup.object({
      name:Yup.string().min(4,'Playlist name should be atleast 4 characters').required('Playlist name is required')
    }),
    onSubmit:(values,{setSubmitting,resetForm,setStatus})=>{
      axios.post('http://localhost:5000/api/playlists/playlist',values,{
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
        setStatus('error');
      })
      .finally(()=>{
        setSubmitting(false);
      })
    }
  });

  return (
    <div className="container" style={{"marginTop":80}}>
      <main className="form-signin w-50 m-auto bg-body-secondary shadow" style={{padding:60}}>
          <form onSubmit={formik.handleSubmit}>
          <h1 className="h3 mb-3 fw-normal"><b>Create playlist</b></h1><br/>
      
          <div className="form-floating">
              <input type="text" class="form-control" id="name" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} placeholder="Playlist Name"/>
              <label htmlFor="name">Playlist Name*</label>
          </div>
      
          <div style={{"marginBottom":10}}></div>
          {
              formik.touched.name && formik.errors.name ? (<div className='text-danger'>{formik.errors.name}</div>): null
          }

          <button className="btn btn-primary w-100 py-2" type="submit" disabled={formik.isSubmitting}>Create Playlist</button>
          
          {formik.status === 'error' && (<div className="alert alert-danger mt-3">Playlist creation failed...</div>)}
          </form>
          <a href="/allplaylists"><button className="btn btn-secondary w-100 py-2" style={{"marginTop":10}}>All Playlists</button></a>
      </main>
    </div>
  )
}

export default CreatePlaylist