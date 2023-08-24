import NavBar from "../components/NavBar"
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addItemDB } from "../store/cart";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();


  const handleClick = (e) => {
    dispatch(addItemDB(e));
  }
  useEffect(() => {
    const value = async () => {
      let api = await fetch('https://fakestoreapi.com/products');
      let data = await api.json();
      setProducts(data);
    };
    value();
  }, []);

  return (
    <div className="product-container">
      <NavBar />
      {products.map((item) => {
        return (
          <div className="products" key={item.id}>
            <img src={item.image} alt="product"/>
            <h4>{item.title}</h4>
            <h4>${item.price}</h4>
            <button onClick={() => handleClick(item)} className="btn button"> Add to Cart</button>
            </div>
        )
      })}
    </div>
  )
}

export default Home