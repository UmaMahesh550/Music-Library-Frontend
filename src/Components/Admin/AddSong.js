import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {AuthContext } from '../Authentication/Authentication.js'

//Function to add song to the existing songs list and can be done by only admin
function AddSong() {

    const { user } = useContext(AuthContext)
    const navigate= useNavigate();
    const formik=useFormik({
        enableReinitialize:true,
        initialValues:{
            songName:'',
            singer:'',
            musicDirector:'',
            releaseDate:'',
            albumName:'',
            artistName:'',
        },
        validationSchema:Yup.object({
            songName:Yup.string().min(4,'Song name should be atleast 4 characters').required('Song Name is required'),
            singer:Yup.string().min(3,'Singer name should be atleast 3 characters').required('Singer Name is required'),
            musicDirector:Yup.string().min(3,'Music director name should be atleast 3 characters').required('Music Director Name is required'),
            releaseDate:Yup.date().required('Release Date is required'),
            albumName:Yup.string().min(3,'Album name should be atleast 3 characters').required("Album name is required"),
            artistName:Yup.string().min(3,'Artist name should be atleast 3 characters').required("Artist name is required")
        }),
        onSubmit:(values,{setSubmitting, resetForm, setStatus})=>{
            axios.post('http://localhost:5000/api/songs/song',values,{
                headers: {
                    Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
                }
                })
            .then(()=>{
                setStatus('success');
                resetForm();
                alert("Song added sucessfully...");
                navigate("/adminsongs");
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
    <div className='container' style={{"marginTop":50}}>
        <form onSubmit={formik.handleSubmit} className='w-50 m-auto'>
                <h1 className="h3 mb-3 fw-normal"><b>Add Song</b></h1>
            
                <div className="form-floating">
                    <input type="text" className="form-control" id="songName" name="songName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.songName} placeholder="Song Name"/>
                    <label htmlFor="songName">Song Name</label>
                </div>

                <div className="form-floating">
                    <input type="text" className="form-control" id="singer" name="singer" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.singer} placeholder="Singer Name"/>
                    <label htmlFor="singer">Singer Name</label>
                </div>

                <div className="form-floating">
                    <input type="text" className="form-control" id="musicDirector" name="musicDirector" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.musicDirector} placeholder="Music Director"/>
                    <label htmlFor="musicDirector">Music Director Name</label>
                </div>
            
                <div className="form-floating">
                    <input type="date" className="form-control" id="releaseDate" name="releaseDate" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.releaseDate} placeholder="Release Date"/>
                    <label htmlFor="date">Release Date</label>
                </div>

                <div className="form-floating">
                    <input type="text" className="form-control" id="albumName" name="albumName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.albumName} placeholder="Album Name"/>
                    <label htmlFor="albumName">Album Name</label>
                </div>

                <div className="form-floating">
                    <input type="text" className="form-control" id="artistName" name="artistName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.artistName} placeholder="Artist Name"/>
                    <label htmlFor="artistName">Artist Name</label>
                </div>

                <div style={{"marginBottom":20}}></div>
                {
                    formik.touched.songName && formik.errors.songName ? (<div className='text-danger'>{formik.errors.songName}</div>): null
                }
                {
                    formik.touched.singer && formik.errors.singer ? (<div className='text-danger'>{formik.errors.singer}</div>): null
                }
                {
                    formik.touched.musicDirector && formik.errors.musicDirector ? (<div className='text-danger'>{formik.errors.musicDirector}</div>): null
                }
                {
                    formik.touched.releaseDate && formik.errors.releaseDate ? (<div className='text-danger'>{formik.errors.releaseDate}</div>): null
                }
                {
                    formik.touched.albumName && formik.errors.albumName ? (<div className='text-danger'>{formik.errors.albumName}</div>): null
                }
                {
                    formik.touched.artistName && formik.errors.artistName ? (<div className='text-danger'>{formik.errors.artistName}</div>): null
                }
                <button className="btn btn-primary w-100 py-2" type="submit" disabled={formik.isSubmitted}>Add Song</button>
                
                {formik.status === 'success' && (<div className="alert alert-success mt-3">Song added successfullyl!</div>)}
                {formik.status === 'error' && (<div className="alert alert-danger mt-3">Failed. Please try again...</div>)}
            </form>
    </div>
  )
}

export default AddSong