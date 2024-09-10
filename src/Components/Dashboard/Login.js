import { useFormik } from "formik";
import * as Yup from 'yup';
import { AuthContext } from "../Authentication/Authentication.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

//Login page of our application to get user or admin login to our application
const Login=()=>{

    const navigate=useNavigate();
    const{login} = useContext(AuthContext);

    const formik=useFormik({
        enableReinitialize:true,
        initialValues:{
            emailId:'',
            password:''
        },
        validationSchema:Yup.object({
            emailId:Yup.string().required('Username is required'),
            password:Yup.string().required('Password is required'),
        }),
        onSubmit: (values,{setSubmitting, setStatus})=>{
            axios.post(`http://localhost:5000/api/users/login`,values)
            .then(response =>{
                if(!response.data){
                    alert("Enter valid credentials")
                }
                else{
                    setStatus('success');
                    login(response.data);
                    navigate('/');
                }
            })
            .catch(error=>{
                setStatus("error");
            })
            .finally(()=>{
                setSubmitting(true);
            })
        }
    });

    return(
        <div className="container" style={{"marginTop":90}}>
            <main className="form-signin w-50 m-auto bg-body-secondary border shadow-lg" style={{borderRadius:15, padding:35}} >
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <h1 className="h3 mb-3 fw-normal"><b>Sign In</b></h1><br/>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="emailId" name="emailId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.emailId} placeholder="Email"/>
                        <label htmlFor="emailId">Email ID*</label>
                    </div>
                
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="Password"/>
                        <label htmlFor="floatingPassword">Password*</label>
                    </div>

                    <div style={{"marginBottom":10}}></div>
                    {
                        formik.touched.emailId && formik.errors.emailId ? (<div className='text-danger'>{formik.errors.emailId}</div>): null
                    }

                    {
                        formik.touched.password && formik.errors.password ? (<div className='text-danger'>{formik.errors.password}</div>): null
                    }
                
                    <button className="btn btn-primary w-100 py-2" type="submit" disabled={formik.isSubmitted} style={{"marginTop":10}}>Sign in</button>
                    {formik.status === 'success' && <div className="alert alert-success mt-3">Login successful!</div>}
                    {formik.status === 'error' && <div className="alert alert-danger mt-3">Invalid Credentials</div>}
                </form>
                <button className="btn btn-info w-100 py-2" onClick={()=>(navigate('/register'))} style={{"marginTop":10}}>Sign Up</button>
            </main>
        </div>
    )
}

export default Login;