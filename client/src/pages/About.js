import NavBar from "../components/NavBar"
import { Helmet } from "react-helmet"
import Footer from '../components/Footer'


const About = () => {
  return (
    <div className="main">
      <Helmet>
                <meta charSet="utf-8" />
                <title>About - Shoperia E-Commerce Web Page</title>
                <link rel="canonical" href="http://localhost:3000" />
            </Helmet>
      <NavBar />
      About
      <Footer />
      </div>
  )
}

export default About