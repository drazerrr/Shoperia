import NavBar from "../components/NavBar"
import { Helmet } from "react-helmet"

const Contact = () => {
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Contact me - Shoperia E-Commerce Web Page</title>
                <link rel="canonical" href="http://localhost:3000/contact" />
            </Helmet>
      <NavBar />
      Contact
    </div>
  )
}

export default Contact