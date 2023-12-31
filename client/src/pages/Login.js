import FormRow from "../components/FormRow"
import Logo from "../components/Logo"
import { useState } from "react"
import { Link, Navigate } from 'react-router-dom'
import { userLogin } from "../store/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from "react-helmet"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  email: '',
  password: '',
  showPassword: false,
}

const Login = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(values))
  }
  const data = useSelector((state) => state.user);
  if(data.name !== "" && !data.isLoading) {
    return <Navigate to='/' />
  }
  const showPass = () => {
    setValues({...values, showPassword: !values.showPassword})
  }
  if(data.isLoading && data.alertType === 'danger') {
    toast.error(data.alertMessage, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  if(data.isLoading && data.alertType === 'success') {
    toast.success(data.alertMessage, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }


  return (
    <section className="form-container">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Login Page - Shoperia E-Commerce Web Page</title>
                <link rel="canonical" href="http://localhost:3000/login" />
            </Helmet>
         <form className="form" onSubmit={onSubmit}>
          <Logo />
          <h3>Login</h3>
          <FormRow type="email" name="email"  handleChange={handleChange} value={values.email}/>
          <FormRow type={values.showPassword ? "text" : "password"} name="password" handleChange={handleChange} value={values.password}/>
          <div className="hide-show"><input className="showpass" type="checkbox" value={values.showPassword} onClick={showPass}/> Show password</div >
          <button className="btn button" type="submit" disabled={data.isLoading}>Submit</button>
          <div className="member">Not register yet? <Link className="option" to='/register'>Register</Link></div>
         </form>
         <ToastContainer position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored" />
    </section>
  )
}

export default Login