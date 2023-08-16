import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogIn } from 'react-icons/io'
import { BiHomeAlt2, BiSolidUserCircle } from 'react-icons/bi'
import { SiAboutdotme } from 'react-icons/si'
import { BsTelephone } from 'react-icons/bs'
import { TbLogout } from 'react-icons/tb'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { add } from '../store/userSlice'
import { useDispatch } from 'react-redux'

const NavBar = () => {
  const [toggle, setToggle] = useState(true)
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setToggle(!toggle);
    console.log(toggle)
  }

const logout = () => {
  dispatch(add());
}
  const data = useSelector((state) => state.user)
  return (
    <div>
    <nav className='nav-bar'>
    <Logo />
     <div className='ham' onClick={toggleMenu}><GiHamburgerMenu /></div>
      <ul className={toggle ? 'nav-links' : 'nav-links nav-visible'}>
        {data.name === "" ? <NavLink onClick={toggleMenu} className='link' to='/login'><IoIosLogIn className='icon'/> Register/Login</NavLink> : <NavLink onClick={toggleMenu} className='link' to='/login'><BiSolidUserCircle className='icon'/> Welcome {data.name.split(" ")[0]}</NavLink>}
        <NavLink onClick={toggleMenu} className='link' to='/'><BiHomeAlt2 className='icon'/> Home</NavLink>
        <NavLink onClick={toggleMenu} className='link' to='/about'><SiAboutdotme className='icon'/> About</NavLink>
        <NavLink onClick={toggleMenu} className='link' to='/contact'><BsTelephone className='icon'/> Contact Us</NavLink>
        <NavLink onClick={logout} className='link' ><TbLogout className='icon'/> Logout</NavLink>
        
        </ul>
    </nav>
    </div>
  )
}

export default NavBar