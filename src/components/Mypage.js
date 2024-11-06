import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Mypage = () => {
  const [memberInfoList, setMemberList] = useState([]);
  useEffect(() => {
    //회원정보 불러오기

    const fetchMmeberInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/user/myinfo`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
            },
          },
        );
        console.log(res.data.result);
        console.log(res.data.result.id);

        setMemberList([
          { key: '이름', value: res.data.result.id },
          { key: '이메일', value: res.data.result.email },
          { key: '도시', value: res.data.result.address?.city || '등록 전' },
          {
            key: '상세주소',
            value: res.data.result.address?.street || '등록 전',
          },
          {
            key: '우편번호',
            value: res.data.result.address?.zipCode || '등록 전',
          },
        ]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchMmeberInfo();
  }, []);

  return (
    <Container>
      <Grid container justifyContent='center'>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title='회원정보' style={{ textAlign: 'center' }} />
            <CardContent>
              <Table>
                <TableBody>
                  {memberInfoList.map((element, index) => (
                    <TableRow key={index}>
                      <TableCell>{element.key}</TableCell>
                      <TableCell>{element.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* OrderListComponent */}
      {/* <OrderListComponent isAdmin={userRole === 'ADMIN'} /> */}
    </Container>
  );
};

export default Mypage;
