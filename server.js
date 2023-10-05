import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import authRouter from './routes/authRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import cors from 'cors'
dotenv.config();

// middlewares
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';
import errorHandleMiddleware from './middlewares/error-handler.js'


const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Express!')
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cart', cartRouter);

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);


const port = process.env.PORT || 4000;

try {
    connectDB(process.env.MONGO_URI);
app.listen(port, (err) => {
    if(err) {
        console.log('There(s) something problem');
    } else {
        console.log(`Server is running on PORT...${port}`)
    }
})
} catch (err) {
    console.log(err)
}