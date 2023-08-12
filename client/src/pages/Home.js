import NavBar from "../components/NavBar"
import { useState, useEffect } from 'react';
import { BsCart4 } from 'react-icons/bs'

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const value = async () => {
      let api = await fetch('https://fakestoreapi.com/products');
      let data = await api.json();
      setProducts(data);
    };
    value();
  }, [])
  return (
    <div className="product-container">
      <NavBar />
      {products.map((item) => {
        return (
          <div className="products" key={item.id}>
            <img src={item.image} alt="product"/>
            <h4>{item.title}</h4>
            <h4>${item.price}</h4>
            <button className="btn"><BsCart4/> Add to Cart</button>
            </div>
        )
      })}
    </div>
  )
}

export default Home