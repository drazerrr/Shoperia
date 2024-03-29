import NavBar from "../components/NavBar"
import {MdOutlineArrowBackIosNew, MdArrowForwardIos} from 'react-icons/md'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { changePage, fetchApi } from "../store/products";
import Loading from "../components/Loading";
import handleClick from "../components/handleClick";
import Toaster from "../components/Toaster";

const Pagination = () => {
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


  const onPage = (e) => {
    dispatch(changePage(e))
    window.scrollTo({top: 0, behavior: 'instant'})
  }

  useEffect(() => {
    if(pageNumber === '1') {
        navigate('/')
    }
    if(pageNumber && Number.isInteger(parseInt(pageNumber))) {
        if(pageNumber > 1 && pageNumber <= Math.floor(totalPages / 14) + 1) {
            dispatch(changePage((pageNumber - 1)* 14))
        } 
      } else {
        navigate('/not-found')
      }
    dispatch(fetchApi());
    if(pageNumber > Math.floor(totalPages / 14) + 1) {
        navigate('/not-found')   
    }
  }, [dispatch, page, pageNumber, totalPages, navigate] );
  return (
    <div className="page">
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
            <img src={item.thumbnail} alt={item.title} loading="lazy"/>
            <h5>{item.title}</h5>
            <h5>{(item.price).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
})}</h5>
            <button id={item.id} onClick={(e) => handleClick(e, item, dispatch, setId_name)} className={`btn button ${item.id === id_name ? 'click' : ""}`}> Add to Cart</button>
            </div>
        )
      })}
    </div>
    <div className="pagination">
              <Link className={page === 0 ? "disabled": ""} onClick={() => { onPage(page - 14)}} to={(page -14) === 0 ? "/" : "/page/" + (page / 14)}><MdOutlineArrowBackIosNew /></Link>

              {[...Array(Math.floor((totalPages ? totalPages : 0) /14) + 1).fill(1)].map((_, i) => {
                return (
                <Link to={i === 0 ? "/" : "/page/" + (i + 1)} onClick={() => onPage(i * 14)} className={`page-num ${i === (page/14) ? "page-col" : ""}`} key={i}>{i + 1}</Link>
              )})}
              <Link className={page > (totalPages - 14) ? "disabled" : ""}  onClick={() => { onPage(page + 14); }}  to={"/page/" + ((page + 28) / 14)}  ><MdArrowForwardIos /></Link>
            </div>
            <Toaster />
    </div>
  )
}

export default Pagination