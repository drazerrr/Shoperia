import NavBar from "../components/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { removeItemDB, incItemQtyDB, decItemDB } from "../store/cart";
import {AiOutlinePlusSquare, AiOutlineMinusSquare, AiFillDelete} from 'react-icons/ai'

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
        <NavBar/>
        {cartItem.cart.length === 0 ? <h1>No items available...</h1>: <h1>SubTotal:</h1>}
        {cartItem.cart.map((item) => {
        return (
          <div className="products" key={item.id}>
            <img src={item.image} alt="product"/>
            <h4>{item.title}</h4>
            <h4>${item.price}</h4>
            <h4>{item.qty > 1 ? <AiOutlineMinusSquare onClick={() => decreaseItem(item.id)} /> : <AiFillDelete onClick={() => decreaseItem(item.id)} />} {item.qty} <AiOutlinePlusSquare onClick={() => increaseItem(item.id)}/></h4>
            <button type="button"  className="btn" onClick={() => handleRemove(item.id)}> Remove</button>
            </div>
        )
      })}

    </div>
  )
}

export default Cart