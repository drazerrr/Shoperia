/* for run install all dependencies  for both client and server
set .env file MONGO_URI=<mongo uri>


# Create a Navbar 

/* This Project is not complete yet */
# Creating Register Page
/* Not complete yet */

# create homePage 
Use A FakeStoreApi in homepage

# create register/login page

# create server /jobify folder

/* setup login and logout user 

# setup cart Add Cart/ remove cart

creating a Cart.js file in page 

 const Cart = () => {
    let cartItem = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleRemove = (e) => {
        dispatch(removeItem(e));
    }

    const increaseItem = (e) => {
      dispatch(incItem(e))
    }
    const decreaseItem = (e) => {
      dispatch(decItem(e))
    }

  return (
    <div>
        <NavBar/>
        {cartItem.cart.length === 0 ? <h1>No items available...</h1>: <h1>SubTotal:</h1>}
        {cartItem.cart.map((item) => {
        return (
          <div className="products">
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

 # also create a reducer for cart
 cart.js in store 

 