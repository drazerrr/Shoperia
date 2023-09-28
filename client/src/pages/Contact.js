import NavBar from "../components/NavBar"
import { Helmet } from "react-helmet"
import Footer from "../components/Footer"

const Contact = () => {
  return (
    <div className="main">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Contact me - Shoperia E-Commerce Web Page</title>
                <link rel="canonical" href="http://localhost:3000/contact" />
            </Helmet>
      <NavBar />
      Contact
      <Footer />
    </div>
  )
}

export default Contact