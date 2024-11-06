import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import MemberCreate from './components/MemberCreate';
import Home from './components/Home';
import LoginPages from './components/LoginPages';
import { AuthContextProvide } from './context/UserContext';
import ProductList from './components/ProductList';
import { CartContextProvider } from './context/CartContext';
import OrderPage from './components/OrderPage';
import Mypage from './components/Mypage';

function App() {
  return (
    <AuthContextProvide>
      <CartContextProvider>
        <div className='App'>
          <Header />
          <div className='content-wrapper'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/member/create' element={<MemberCreate />} />
              <Route path='/login' element={<LoginPages />} />
              <Route path='/product/list' element={<ProductList />} />
              <Route path='/order/cart' element={<OrderPage />} />
              <Route path='/mypage' element={<Mypage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartContextProvider>
    </AuthContextProvide>
  );
}

export default App;
