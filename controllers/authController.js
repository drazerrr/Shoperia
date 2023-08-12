import User from '../modules/User.js'


const register = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
       return res.json({err: 'Please provide all values'})
    };
    try {
    const value = await User.create({name, email, password});
    console.log(value);
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
    console.log(logData)
    if(logData) {
        if(logData.password === password) {
            return res.json(logData)
        } else {
            return res.json({err: 'Invalid credential'})
        }
    } else {
        return res.json({err: 'Invalid credential'});
    }
} 


export {register, login}