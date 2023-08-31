import NavBar from "../components/NavBar"
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addItemDB } from "../store/cart";
import { useNavigate } from "react-router-dom";
import {MdOutlineArrowBackIosNew, MdArrowForwardIos} from 'react-icons/md'
import { Helmet } from "react-helmet";

const Home = () => {
  const [product, setProducts] = useState([]);
  const [id_name, setId_name] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const parentClick = (e) => {
    e.preventDefault();
    if(e.target === e.currentTarget) {
      navigate('/detail')
    }
  }


  const handleClick = (e) => {
    dispatch(addItemDB(e));
    setId_name(e.id)
    setTimeout(() => {
      setId_name(0)
    }, 200)
  };

  const onPage = (e) => {
    setPage(e);
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  useEffect(() => {
    const value = async () => {
      let api = await fetch(`https://dummyjson.com/products?limit=14&skip=${page}`);
      let data = await api.json();
      setProducts(data.products);
      setTotalPages(data.total);
    };
    value();
  }, [page]);

  console.log(product)
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Home - Shoperia E-Commerce Web Page</title>
                <link rel="canonical" href="http://localhost:3000" />
            </Helmet>
      <NavBar />
    <div className="product-container">
      {product.map((item) => {
        return (
          <div className="products" onClick={parentClick}key={item.id}>
            <img src={item.images[0]} alt={item.title}/>
            <h4>{item.title}</h4>
            <div className="description">{item.description}</div>
            <h4>${item.price}</h4>
            <button id={item.id} onClick={() => handleClick(item)} className={`btn button ${item.id === id_name ? 'click' : ""}`}> Add to Cart</button>
            </div>
        )
      })}
    </div>
            <div className="pagination">
              <span className={page === 0 ? "disabled": ""} onClick={() => { setPage(page - 14); window.scrollTo({top: 0, behavior: 'smooth'})}}><MdOutlineArrowBackIosNew /></span>
              {[...Array(Math.floor(totalPages /14) + 1).fill(1)].map((_, i) => {
                return (
                <span onClick={() => onPage(i * 14)} className={`page-num ${i === (page/14) ? "page-col" : ""}`} key={i}>{i + 1}</span>
              )})}
              <span className={page > (totalPages - 14) ? "disabled" : ""}  onClick={() => { setPage(page + 14); window.scrollTo({top: 0, behavior: 'smooth'})}}    ><MdArrowForwardIos /></span>
            </div>
    </div>
  )
}

export default Home