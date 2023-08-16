import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({children}) => {
    const userData = useSelector((state) => state.user)
    if(userData.email === "") {
        return <Navigate to='/login' />
    }
    return children
}

export default ProtectedRoute