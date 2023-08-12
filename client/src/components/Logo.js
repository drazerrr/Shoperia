import { FaShoppingBag } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/' className='brand-name'><FaShoppingBag />  Shoperia</Link>
  )
}

export default Logo
