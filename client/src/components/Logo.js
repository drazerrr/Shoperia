import { FaShoppingBag } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changePage } from '../store/products';

const Logo = () => {
  const dispatch = useDispatch();
  const reset = () => {
    dispatch(changePage(0))
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
  return (
    <Link to='/' onClick={reset} className='brand-name'><FaShoppingBag />  Shoperia</Link>
  )
}

export default Logo
