import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogIn } from 'react-icons/io'
import { BiSolidUserCircle } from 'react-icons/bi'
import { SiAboutdotme } from 'react-icons/si'
import { BsTelephone } from 'react-icons/bs'
import { TbLogout } from 'react-icons/tb'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { add, localStorageDataRemove } from '../store/userSlice'
import { localStorageCartRemove } from '../store/cart'
import { useDispatch } from 'react-redux'
import { LiaCartPlusSolid } from 'react-icons/lia'
import { changePage } from '../store/products'
const NavBar = () => {
  const [toggle, setToggle] = useState(true)
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setToggle(!toggle);
  }
  const reset = () => {
    dispatch(changePage(0))
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

const logout = () => {
  reset();
  localStorageDataRemove();
  localStorageCartRemove();
  dispatch(add({name: "", email: "", location: "", alertText: "", alertMessage: ""}));
}
  const data = useSelector((state) => state.user)
  const cartItem = useSelector((state) => state.cart)
  return (
    <nav className='nav-bar'>
    <Logo />
     <div className='ham' onClick={toggleMenu}><GiHamburgerMenu /></div>
      <ul className={toggle ? 'nav-links' : 'nav-links nav-visible'}>
        {data.name === "" ? <NavLink onClick={toggleMenu} className='link' to='/login'><IoIosLogIn className='icon'/> Register/Login</NavLink> : <NavLink onClick={toggleMenu} className='link' to='/login'><BiSolidUserCircle className='icon'/> Welcome {data.name.split(" ")[0]}</NavLink>}
        <NavLink onClick={toggleMenu} className='link' to='/cart'><LiaCartPlusSolid className='icon' /> ({cartItem.cart.reduce((accum, item) => {return accum + item.qty}, 0)})</NavLink>
        <NavLink onClick={toggleMenu} className='link' to='/about'><SiAboutdotme className='icon'/> About</NavLink>
        <NavLink onClick={toggleMenu} className='link' to='/contact'><BsTelephone className='icon'/> Contact Us</NavLink>
        {data.name !== "" && <NavLink onClick={logout} className='link' ><TbLogout className='icon'/> Logout</NavLink>}
        
        </ul>
    </nav>
  )
}

export default NavBar