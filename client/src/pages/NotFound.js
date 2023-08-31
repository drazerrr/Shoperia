import notFound from '../assets/images/notFound.svg'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
const NotFound = () => {
  return (
    <div className="page-404">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Page not found (404) - Shoperia E-Commerce Web Page</title>
                <link rel="canonical" href="http://localhost:3000" />
            </Helmet>
        <img className="not-found" src={notFound} alt='Not found svg' />
        <div className='tag'>Page Not found</div>
        <Link className="back-home" to='/'>Back Home</Link>
    </div>
  )
}

export default NotFound