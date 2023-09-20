import NavBar from "../components/NavBar"
import {MdOutlineArrowBackIosNew, MdArrowForwardIos} from 'react-icons/md'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addItemDB } from "../store/cart";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changePage, fetchApi } from "../store/products";
import Loading from "../components/Loading";

const Home = () => {
  const [id_name, setId_name] = useState(0)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(state => state.products.products)
  const page = useSelector(state => state.products.page)
  const totalPages = useSelector(state => state.products.totalPages)
  const loading = useSelector(state => state.products.loading)
  const { pageNumber} = useParams();

  const parentClick = (e, value) => {
    e.stopPropagation();
      navigate('/product/'+ value)
    
  }


  const handleClick = (e, value) => {
    e.stopPropagation();
    dispatch(addItemDB(value));
    toast.info("Added to cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      })
    setId_name(value.id)
    setTimeout(() => {
      setId_name(0)
    }, 200)
  };

  const onPage = (e) => {
    dispatch(changePage(e))
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  useEffect(() => {
    dispatch(fetchApi());
  }, [dispatch, page] );
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>{`Home - ${pageNumber ? `page ${pageNumber} of ${Math.floor(totalPages / 14) + 1} - Shoperia E-Commerce Web App`: 'Shoperia E-Commerce Web App'}`}</title>
                <link rel="canonical" href="http://localhost:3000" />
            </Helmet>
      <NavBar />
      {loading && <Loading />}
    <div className="product-container">
      {product.map((item) => {
        return (
          <div className="products" onClick={(e) => parentClick(e, item.id)}key={item.id}>
            <img src={item.images[0]} alt={item.title}/>
            <h4>{item.title}</h4>
            <div className="description">{item.description}</div>
            <h4>{(item.price).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
})}</h4>
            <button id={item.id} onClick={(e) => handleClick(e, item)} className={`btn button ${item.id === id_name ? 'click' : ""}`}> Add to Cart</button>
            </div>
        )
      })}
    </div>
    <div className="pagination">
              <Link className={page === 0 ? "disabled": ""} onClick={() => { onPage(page - 14); window.scrollTo({top: 0, behavior: 'smooth'})}}to={(page -14) === 0 ? "/" : "/page/" + (page / 14)}><MdOutlineArrowBackIosNew /></Link>

              {[...Array(Math.floor((totalPages ? totalPages : 0) /14) + 1).fill(1)].map((_, i) => {
                return (
                <Link to={i === 0 ? "/" : "/page/" + (i + 1)} onClick={() => onPage(i * 14)} className={`page-num ${i === (page/14) ? "page-col" : ""}`} key={i}>{i + 1}</Link>
              )})}
              <Link className={page > (totalPages - 14) ? "disabled" : ""}  onClick={() => { onPage(page + 14); window.scrollTo({top: 0, behavior: 'smooth'})}}  to={"/page/" + ((page + 28) / 14)}  ><MdArrowForwardIos /></Link>
            </div>
            <ToastContainer position="top-right"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored" />
    </div>
  )
}

export default Home