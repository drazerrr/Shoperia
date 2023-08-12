import FormRow from "../components/FormRow"
import Logo from "../components/Logo"
import { useState } from "react"
import { Link } from 'react-router-dom'

const initialState = {
  name: '',
  lastName: '',
  email: '',
}

const Login = () => {
  const [values, setValues] = useState(initialState);

  return (
    <section className="form-container">
         <form className="form">
          <Logo />
          <h3>Login</h3>
          <FormRow type="email" name="email"/>
          <FormRow type="password" name="password"/>
          <button className="btn" type="submit">Submit</button>
          <div className="member">Not register yet? <Link className="option" to='/register'>Register</Link></div>
         </form>
    </section>
  )
}

export default Login