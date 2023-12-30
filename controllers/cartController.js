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