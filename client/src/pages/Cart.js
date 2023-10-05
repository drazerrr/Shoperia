import NavBar from "../components/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { removeItemDB, incItemQtyDB, decItemDB } from "../store/cart";
import {AiOutlinePlusSquare, AiOutlineMinusSquare, AiFillDelete} from 'react-icons/ai'
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";

const Cart = () => {
    let cartItem = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleRemove = (e) => {
        dispatch(removeItemDB(e));
    }

    const increaseItem = (e) => {
      dispatch(incItemQtyDB(e))
    }
    const decreaseItem = (e) => {
      dispatch(decItemDB(e))
    }

  return (
    <div className="main">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Cart - Shoperia E-Commerce Web Page</title>
                <link rel="canonical" href="http://localhost:3000/cart" />
            </Helmet>
        <NavBar/>
        <div className="cart-container">
        {cartItem.cart.length === 0 ? <h1>No items available...</h1>: <h1>SubTotal: {(cartItem.cart.reduce(function(accumulator, item) {
          return accumulator + (item.price * item.qty)
        }, 0)).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}</h1>}
        {cartItem.cart.map((item) => {
        return (
          <div className="cart-products" key={item.id}>
            <div className="part-1">
            <img src={item.images[0]} alt={item.title} loading="lazy"/>
            <h4 className="qty">{item.qty > 1 ? <AiOutlineMinusSquare className="cart-icon" onClick={() => decreaseItem(item.id)} /> : <AiFillDelete className="cart-icon" onClick={() => decreaseItem(item.id)} />} <span className="item-qty">{item.qty}</span> <AiOutlinePlusSquare className="cart-icon" onClick={() => increaseItem(item.id)}/></h4>
            </div>
            <div className="part-2">
            <h4>{item.title}</h4>
            <h5>{item.description}</h5>
            <div>{item.category}</div>
            <h4>{(item.price * item.qty).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
})}</h4>
            
            <button type="button"  className="btn button" onClick={() => handleRemove(item.id)}> Remove</button>
            </div>
            </div>
        )
      })}
      </div>
      <Footer />

    </div>
  )
}

export default Cart