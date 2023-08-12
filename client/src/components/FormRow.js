
const FormRow = ({type, name, labelName, value, handleChange}) => {
  return (
    <div className="register">
        <label className="label" htmlFor={name} >{labelName || name}</label>
        <input className="input" type={type} name={name} value={value} onChange={handleChange}/>
    </div>
  )
}

export default FormRow