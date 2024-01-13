import { addItemDB } from "../store/cart"
import {toast} from 'react-toastify'

const handleClick = (e, value, dispatch, setId_name) => {
  e.stopPropagation();
  dispatch(addItemDB(value))
  toast.info("Added to cart", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    })
    if(setId_name) {
      setId_name(value.id)
      setTimeout(() => {
        setId_name(0)
      }, 200)
    }
}

export default handleClick