import FormRow from "../components/FormRow"
import Logo from "../components/Logo"
import { useState } from "react"
import { Link, Navigate } from 'react-router-dom'
import { userFetch } from "../store/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from "react-helmet"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  name: '',
  email: '',
  password: '',
  showPassword: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
    };
    const onSubmit = (e) => {
      e.preventDefault();
      dispatch(userFetch(values));
    }
    const data = useSelector((state) => state.user)

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
    <section className="form-container" onSubmit={onSubmit}>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Register - Shoperia E-Commerce Web Page</title>
                <link rel="canonical" href="http://localhost:3000" />
            </Helmet>
         <form className="form">
          <Logo />
          <h3>Register</h3>
          <FormRow type="text" name="name" handleChange={handleChange} value={values.name}/>
          <FormRow type="email" name="email" handleChange={handleChange} value={values.email}/>
          <FormRow type={values.showPassword ? "text" : "password"} name="password" handleChange={handleChange} value={values.password}/><div className="hide-show"><input className="showpass" type="checkbox" value={values.showPassword} onClick={showPass}/> Show password</div >
          <button className="btn button" type="submit" disabled={data.isLoading}>Submit</button>
          <div className="member">Already a member? <Link className="option" to='/Login'>Login</Link></div>
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

export default Register