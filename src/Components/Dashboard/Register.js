import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

//Register page of the application where a new user or admin can be registered.
const Register=()=>{

    const navigate= useNavigate();
    const formik=useFormik({
        enableReinitialize:true,
        initialValues:{
            userName:'',
            phoneNumber:'',
            emailId:'',
            password:'',
            role:''
        },
        validationSchema:Yup.object({
            userName:Yup.string().required('Username is required'),
            phoneNumber:Yup.number().min(1000000000,'Phone number should be atleast 10 characters').max(9999999999,'Phone number should not exceed 10 characters').required('Phone Number is required'),
            emailId:Yup.string().required('Email is required'),
            password:Yup.string().required('Password is required'),
            role:Yup.string().required("Select a role")
        }),
        onSubmit:(values,{setSubmitting, resetForm, setStatus})=>{
            axios.post('http://localhost:5000/api/users/register',values)
            .then(()=>{
                setStatus('success');
                resetForm();
                alert("Registered Successfully.........");
                navigate("/login");
            })
            .catch(error=>{
                setStatus("error");
            })
            .finally(()=>{
                setSubmitting(false);
            })            
        }
    });

    return(
        <div className="container" style={{"marginTop":50}}>
            <main className="form-signin w-50 m-auto bg-body-secondary border shadow-lg" style={{borderRadius:15, padding:35}}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <h1 className="h3 mb-3 fw-normal"><b>Sign Up</b></h1><br/>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="userName" name="userName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} placeholder="User Name"/>
                        <label htmlFor="userName">Name*</label>
                    </div>

                    <div className="form-floating">
                        <input type="number" className="form-control" id="phoneNumber" name="phoneNumber" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phoneNumber} placeholder="Phone Number"/>
                        <label htmlFor="phoneNumber">Phone Number*</label>
                    </div>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="emailId" name="emailId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.emailId} placeholder="Email"/>
                        <label htmlFor="emailId">Email*</label>
                    </div>
                
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="Password"/>
                        <label htmlFor="password">Password*</label>
                    </div>

                    <div className="form-floating">
                        <select  className="form-select" id="role"   {...formik.getFieldProps('role')}>
                            <option value='' disabled >..Select a role..</option>
                            <option value='user'>User</option>
                            <option value='admin' >Admin</option>
                        </select>
                        <label htmlFor="role">Role*</label>
                    </div>
                
                    <div style={{"marginBottom":10}}></div>
                    {
                        formik.touched.userName && formik.errors.userName ? (<div className='text-danger'>{formik.errors.userName}</div>): null
                    }
                    {
                        formik.touched.phoneNumber && formik.errors.phoneNumber ? (<div className='text-danger'>{formik.errors.phoneNumber}</div>): null
                    }
                    {
                        formik.touched.emailId && formik.errors.emailId ? (<div className='text-danger'>{formik.errors.emailId}</div>): null
                    }
                    {
                        formik.touched.password && formik.errors.password ? (<div className='text-danger'>{formik.errors.password}</div>): null
                    }
                    {
                        formik.touched.role && formik.errors.role ? (<div className='text-danger'>{formik.errors.role}</div>): null
                    }
                    <button className="btn btn-primary w-100 py-2" type="submit" disabled={formik.isSubmitted}>Register</button>
                    
                    {formik.status === 'success' && (<div className="alert alert-success mt-3">Registration successful!</div>)}
                    {formik.status === 'error' && (<div className="alert alert-danger mt-3">Registration failed. Please try again.</div>)}
                </form>
                <a href="/login"><button className="btn btn-info w-100 py-2" style={{"marginTop":10}}>Sign In</button></a>
            </main>
        </div>
    )


}

export default Register;