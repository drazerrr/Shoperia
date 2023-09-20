import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
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
    <div>
      {product.map((item, index) => {
        return (
          <div key={index}><img src={item} alt={index}/></div>
        )
      })}
    </div>
  )
}

export default DetailPage