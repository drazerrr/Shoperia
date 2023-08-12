import FormRow from "../components/FormRow"
import Logo from "../components/Logo"
import { useState } from "react"
import { Link } from 'react-router-dom'
import registerUser from "../Redux/registerUser"

const initialState = {
  name: '',
  email: '',
  password: '',
}

const Register = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
    };
    const onSubmit = (e) => {
      e.preventDefault();
      const {name, email, password } = values;
      registerUser(values);
      
    }
  return (
    <section className="form-container" onSubmit={onSubmit}>
         <form className="form">
          <Logo />
          <h3>Register</h3>
          <FormRow type="text" name="name" handleChange={handleChange} value={values.name}/>
          <FormRow type="email" name="email" handleChange={handleChange} value={values.email}/>
          <FormRow type="password" name="password" handleChange={handleChange} value={values.password}/>
          <button className="btn" type="submit">Submit</button>
          <div className="member">Already a member? <Link className="option" to='/Login'>Login</Link></div>
         </form>
    </section>
  )
}

export default Register