import axios from 'axios';


const registerUser = async (currentUser) => {
    const data = await axios.post('/api/v1/auth/register', currentUser);
    console.log(data);
}

export default registerUser