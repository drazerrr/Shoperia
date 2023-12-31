import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minLength: 4,      
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        minLength: 6    
    },
    location: {
        type: String,
        minLength: 4,
        default: 'my city'
    },
    cart: [],
});


export default mongoose.model('User', UserSchema);