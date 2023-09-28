import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Footer from "../components/Footer";


const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await fetch(`https://dummyjson.com/product/${id}`)
      const data = await api.json()
      console.log(data.images);

      setProduct(data.images)
    }
    fetchProduct();
  }, [id])
  return (
    <div className="main">
      {product.map((item, index) => {
        return (
          <div key={index}><img src={item} alt={index}/></div>
        )
      })}
      <Footer />
    </div>
  )
}

export default DetailPage