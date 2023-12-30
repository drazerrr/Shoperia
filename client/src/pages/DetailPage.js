import NavBar from "../components/NavBar"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'


const DetailPage = () => {
  const { id } = useParams();
  const [bg, setBg] = useState(false);
  const [product, setProduct] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setBg(false)
    const fetchProduct = async () => {
      const api = await fetch(`https://dummyjson.com/product/${id}`)
      const data = await api.json()
      setProduct(data.images)
      setTitle(data.title)
      setBg(true)
    }
    fetchProduct();
  }, [id])
  return (
    <div className="detailPage">
      <NavBar />
      <Helmet>
                <meta charSet="utf-8" />
                <title>Shoperia: Buy {title}</title>
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
        <h1>{title}</h1>
      </div>
    </div>
  )
}

export default DetailPage