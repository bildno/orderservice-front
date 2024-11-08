import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MemberCreate from '../components/MemberCreate';
import LoginPages from '../components/LoginPages';
import ProductList from '../components/ProductList';
import OrderPage from '../components/OrderPage';
import ProductCreate from '../components/ProductCreate';
import MyPage from '../components/Mypage';
import PrivateRouter from './PrivateRouter';
import Home from '../components/Home';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/member/create' element={<MemberCreate />} />
      <Route path='/login' element={<LoginPages />} />
      <Route path='/product/list' element={<ProductList />} />
      <Route
        path='/order/cart'
        element={<PrivateRouter element={<OrderPage />} />}
      />
      <Route path='/mypage' element={<PrivateRouter element={<MyPage />} />} />
      <Route
        path='/product/manage'
        element={
          <PrivateRouter element={<ProductCreate />} requiredRole='ADMIN' />
        }
      />
    </Routes>
  );
};

export default AppRouter;
