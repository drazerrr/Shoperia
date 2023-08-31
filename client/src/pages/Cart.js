import NavBar from "../components/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { removeItemDB, incItemQtyDB, decItemDB } from "../store/cart";
import {AiOutlinePlusSquare, AiOutlineMinusSquare, AiFillDelete} from 'react-icons/ai'
import { Helmet } from "react-helmet";

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
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Cart - Shoperia E-Commerce Web Page</title>
                <link rel="canonical" href="http://localhost:3000/cart" />
            </Helmet>
        <NavBar/>
        <div className="cart-container">
        {cartItem.cart.length === 0 ? <h1>No items available...</h1>: <h1>SubTotal: ${cartItem.cart.reduce(function(accumulator, item) {
          return accumulator + (item.price * item.qty)
        }, 0)}</h1>}
        {cartItem.cart.map((item) => {
        return (
          <div className="products" key={item.id}>
            <img src={item.images[0]} alt={item.title}/>
            <h4>{item.title}</h4>
            <div>{item.category}</div>
            <h4>${item.price * item.qty}</h4>
            <h4>{item.qty > 1 ? <AiOutlineMinusSquare onClick={() => decreaseItem(item.id)} /> : <AiFillDelete onClick={() => decreaseItem(item.id)} />} {item.qty} <AiOutlinePlusSquare onClick={() => increaseItem(item.id)}/></h4>
            <button type="button"  className="btn button" onClick={() => handleRemove(item.id)}> Remove</button>
            </div>
        )
      })}
      </div>

    </div>
  )
}

export default Cart