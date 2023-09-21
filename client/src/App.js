import {lazy, Suspense} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import Loading from './components/Loading';
const MyHomeComponent = lazy(() => import('./pages/Home'))
const MyAboutComponent = lazy(() => import('./pages/About'))
const MyContactComponent = lazy(() => import('./pages/Contact'))
const MyNotFoundComponent = lazy(() => import('./pages/NotFound'))
const MyLoginComponent = lazy(() => import('./pages/Login'))
const MyCartComponent = lazy(() => import('./pages/Cart'))
const MyRegisterComponent = lazy(() => import('./pages/Register'))
const MyPaginationComponent = lazy(() => import('./pages/Pagination'))
const MyDetailPageComponent = lazy(() => import('./pages/DetailPage'))


function App() {
  return (
    <div className='main'>
      <BrowserRouter>
      <Routes>
        <Route exact path= "/" element={<ProtectedRoute><Suspense fallback={<Loading />}><MyHomeComponent /></Suspense></ProtectedRoute>} />
        <Route path= "/page/:pageNumber" element={<ProtectedRoute><Suspense fallback={<Loading />}><MyPaginationComponent /></Suspense></ProtectedRoute>} />
        <Route path='/register' element={<Suspense fallback={<Loading />}><MyRegisterComponent /></Suspense>} />
        <Route path='/login' element={<Suspense fallback={<Loading />}><MyLoginComponent /></Suspense>} />
        <Route path='/about' element={<Suspense fallback={<Loading />}><MyAboutComponent /></Suspense>} />
        <Route path='/contact' element={<Suspense fallback={<Loading />}><MyContactComponent /></Suspense>} />
        <Route path="/cart" element={<ProtectedRoute><Suspense fallback={<Loading />}><MyCartComponent /></Suspense></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><Suspense fallback={<Loading />}><MyDetailPageComponent /></Suspense></ProtectedRoute>} />
        <Route path='/*' element={<Suspense fallback={<Loading />}><MyNotFoundComponent /></Suspense>} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
