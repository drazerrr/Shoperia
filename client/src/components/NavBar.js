import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosLogIn } from 'react-icons/io'
import { BiHomeAlt2 } from 'react-icons/bi'
import { SiAboutdotme } from 'react-icons/si'
import { BsTelephone } from 'react-icons/bs'

import { useState } from 'react'
const NavBar = () => {
  const [toggle, setToggle] = useState(true)
  const toggleMenu = () => {
    setToggle(!toggle);
    console.log(toggle)
  }
  return (
    <div>
    <nav className='nav-bar'>
    <Logo />
     <div className='ham' onClick={toggleMenu}><GiHamburgerMenu /></div>
      <ul className={toggle ? 'nav-links' : 'nav-links nav-visible'}>
        <NavLink onClick={toggleMenu} className='link' to='/login'><IoIosLogIn className='icon'/> Register/Login</NavLink>
        <NavLink onClick={toggleMenu} className='link' to='/'><BiHomeAlt2 className='icon'/> Home</NavLink>
        <NavLink onClick={toggleMenu} className='link' to='/about'><SiAboutdotme className='icon'/> About</NavLink>
        <NavLink onClick={toggleMenu} className='link' to='/contact'><BsTelephone className='icon'/> Contact Us</NavLink>
        
        </ul>
    </nav>
    </div>
  )
}

export default NavBar