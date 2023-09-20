import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home, About, Contact, Register, NotFound, Login, Cart, Pagination } from './pages/index'
import ProtectedRoute from './pages/auth/ProtectedRoute';
import DetailPage from './pages/DetailPage';


function App() {
  return (
    <div className='main'>
      <BrowserRouter>
      <Routes>
        <Route path= "/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path= "/page/:pageNumber" element={<ProtectedRoute><Pagination/></ProtectedRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><DetailPage /></ProtectedRoute>} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
