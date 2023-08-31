import dotenv from 'dotenv';
import User from '../modules/User.js'
import  bcrypt  from 'bcrypt'
dotenv.config();


const register = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
       return res.json({err: 'Please provide all values'})
    };
    try {
        const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const value = await User.create({name, email, password: hash});
    res.json(value);
    } catch(err) {
        res.json(err)
    }
};

 const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.json({ err: 'Please provide all values'})
    };

    const logData = await User.findOne({email});
    if(logData) {
        if(bcrypt.compareSync(password, logData.password)) {
            return res.json(logData)
        } else {
            return res.json({err: 'Invalid credential'})
        }
    } else {
        return res.json({err: 'Invalid credential'});
    }
} 


export {register, login}