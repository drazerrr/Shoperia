import FormRow from "../components/FormRow"
import Logo from "../components/Logo"
import { useState } from "react"
import { Link, Navigate } from 'react-router-dom'
import { userFetch } from "../store/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

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

  return (
    <section className="form-container" onSubmit={onSubmit}>
         <form className="form">
          <Logo />
          <h3>Register</h3>
          <div className={`alert ${data.alertType}`} >{data.alertMessage}</div>
          <FormRow type="text" name="name" handleChange={handleChange} value={values.name}/>
          <FormRow type="email" name="email" handleChange={handleChange} value={values.email}/>
          <FormRow type={values.showPassword ? "text" : "password"} name="password" handleChange={handleChange} value={values.password}/><div className="hide-show"><input className="showpass" type="checkbox" value={values.showPassword} onClick={showPass}/> Show password</div >
          <button className="btn button" type="submit" disabled={data.isLoading}>Submit</button>
          <div className="member">Already a member? <Link className="option" to='/Login'>Login</Link></div>
         </form>
    </section>
  )
}

export default Register