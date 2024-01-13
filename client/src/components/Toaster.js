import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Toaster = () => {
    return (
        <ToastContainer
        position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    closeOnClick
    pauseOnHover={false}
    draggable= {true}
    progress= {undefined}
    theme="colored"/>
    )
}

export default Toaster