import notFound from '../assets/images/notFound.svg'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className="page-404">
        <img className="not-found" src={notFound} alt='Not found svg' />
        <div className='tag'>Page Not found</div>
        <Link className="back-home" to='/'>Back Home</Link>
    </div>
  )
}

export default NotFound