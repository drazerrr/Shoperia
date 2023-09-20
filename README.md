/* for run install all dependencies  for both client and server 
- npm run install-dependencies
setup .env file MONGO_URI=<mongo uri>


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

 
 # SETUP a cartRoutes.js and cartcontroller in backend 

 cartRoutes-
 import express from 'express';
import { addItem, decQuantity, incQuantity, removeItem } from '../controllers/cartController.js';

const router = express.Router();

router.route('/addcart').put(addItem)
router.route('/removecart').put(removeItem)
router.route('/increaseqty').put(incQuantity);
router.route('/decreaseqty').put(decQuantity);


export default router

cartController-
import User from '../modules/User.js';


const addItem = async (req, res) => {
    const {email, item} = req.body;
    
    let filter = {email};
    let insert = {$push: {cart: item}};

    try {
        const carts = await User.findOne({email, 'cart.id': item.id})
        if (carts) {
            const value = await User.findOneAndUpdate({email, 'cart.id': item.id}, {$inc: {"cart.$.qty": 1 }})
            res.json(value);
        } else {
        const value = await User.findOneAndUpdate(filter, insert);
        res.json(value);
        }

    } catch (err) {
        console.log(err)
        res.json({err:"Something went wrong..."})
    }
};

const removeItem = async (req, res) => {
    const {email, itemId} = req.body;
    
    let filter = {email};
    let remove = {$pull: {cart: {id : itemId }}};

    try {
        const value = await User.findOneAndUpdate(filter, remove);
        console.log(value);
        res.json(value);

    } catch (err) {
        console.log(err)
    }

};


const incQuantity = async (req, res) => {
    const {email, itemId} = req.body;

    let filter = {email, 'cart.id': itemId }
    try {
        const value = await User.findOneAndUpdate(filter, {$inc : {"cart.$.qty" : 1}});
        console.log(value);
        res.json(value);

    } catch (err) {
        console.log(err)
    }
}

const decQuantity = async (req, res) => {
    const {email, itemId} = req.body;
    let filter = {email, 'cart.id': itemId }
    try{
        const dec = await User.findOneAndUpdate(filter, {$inc : {"cart.$.qty" : -1}});
        res.json(dec)
        const del = await User.findOneAndUpdate({email}, {$pull: {cart: {id: itemId, qty: 0}}})
    } catch(err) {
        console.log(err);
    }
}

export {addItem, removeItem, incQuantity, decQuantity}

after setup backend to front-end cart

# Use Bcrypt for encription password
-npm install bcrypt --save dev 

# setup pagination 
use redux toolkit for state management 