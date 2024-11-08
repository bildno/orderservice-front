import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../configs/axios-config';
import AuthContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { hadleAxiosError } from '../configs/HandleAxiosError';

const OrderListComponent = ({ isAdmin }) => {
  const [orderList, setOrderList] = useState([]);
  const { onLogout, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const cancelOrder = async (id) => {
    try {
      await axiosInstance.patch(
        `${process.env.REACT_APP_API_BASE_URL}/order/${id}/cancel`,

        // 주문 취소를 백엔드로 요청 -> 문제가 없었다면 주문 목록 다시 렌더링
        setOrderList((prevList) => {
          return prevList.map((order) =>
            order.id === id ? { ...order, orderStatus: 'CANCELED' } : order,
          );

          // const cancelOrder = prevList.find((order) => order.id === id);
          // cancelOrder.orderStatus = 'CANCELED';
          // const filtered = prevList.filter((order) => order.id !== id);
          // return [...filtered, cancelOrder];
        }),
      );
    } catch (e) {
      hadleAxiosError(e, onLogout, navigate);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const url = isAdmin ? '/order/list' : '/order/my-order';
      try {
        const res = await axiosInstance.get(
          `${process.env.REACT_APP_API_BASE_URL}${url}`,
        );

        console.log(res.data);
        setOrderList(res.data.result);
      } catch (e) {
        console.log(e);
      }
    };

    fetchOrders();
  }, []);

  console.log('orderList : ', orderList);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>회원 EMAIL</TableCell>
            <TableCell>주문상태</TableCell>
            <TableCell>액션</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((order) => (
            <React.Fragment key={order.id}>
              <TableRow>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.userEmail}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>
                  {isAdmin && order.orderStatus === 'ORDERED' && (
                    <Button
                      color='secondary'
                      onClick={() => cancelOrder(order.id)}
                      size='small'
                    >
                      CANCEL
                    </Button>
                  )}
                </TableCell>
              </TableRow>
              {/* 확장된 행 (주문 세부 사항) */}
              <TableRow>
                <TableCell colSpan={4}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>
                        주문 세부 사항 (클릭 시 열립니다!)
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        {order.orderDetails.map((orderItem) => (
                          <li key={orderItem.id}>
                            {orderItem.productName} - {orderItem.count} 개
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderListComponent;
