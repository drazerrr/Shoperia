import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home, About, Contact, Register, NotFound, Login} from './pages/index'

function App() {
  return (
    <div className='main'>
      <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
