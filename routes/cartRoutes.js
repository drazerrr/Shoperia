import express from 'express';
import { addItem, decQuantity, incQuantity, removeItem } from '../controllers/cartController.js';

const router = express.Router();

router.route('/addcart').put(addItem)
router.route('/removecart').put(removeItem)
router.route('/increaseqty').put(incQuantity);
router.route('/decreaseqty').put(decQuantity);


export default router