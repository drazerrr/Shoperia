import NavBar from "../components/NavBar"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { FaStar } from "react-icons/fa";


const DetailPage = () => {
  const { id } = useParams();
  const [bg, setBg] = useState(false);
  const [product, setProduct] = useState([]);
  const [det, setDet] = useState([]);

  useEffect(() => {
    setBg(false)
    const fetchProduct = async () => {
      const api = await fetch(`https://dummyjson.com/product/${id}`)
      const data = await api.json()
      setProduct(data.images)
      setDet(data)
      setBg(true)
      console.log(data)
    }
    fetchProduct();
  }, [id])
  return (
    <div className="detailPage">
      <NavBar />
      <Helmet>
                <meta charSet="utf-8" />
                <title>Shoperia: Buy {det.title ? det.title : ""}</title>
                <link rel="canonical" href="http://localhost:3000/cart" />
            </Helmet>
      <div className="product-img">
      { bg && <Slide>
      {product.map((item, index) => {
        return (
          <div key={index} className="slides" style={{backgroundImage: `url(${item})`}}></div>
        )
      })}
      </Slide>}
      </div>
      <div className="detail">
        <h1>{det.title}</h1>
        <div className={`rating ${det.rating > 3 ? 'green' : 'red'}`}>{det.rating &&  det.rating.toFixed(1)} <FaStar /></div>
        <p>{det.description}</p>

      </div>
    </div>
  )
}

export default DetailPage