import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../configs/axios-config';
import AuthContext from '../context/UserContext';

const ProductCreate = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [imageThumbnail, setImageThumbnail] = useState(null);
  const { onLogout, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  // useRef()를 사용해서 특정 태그 참조하기
  const $fileTag = useRef();

  // form submit handler
  const productCreate = async (e) => {
    e.preventDefault();

    try {
      const registerData = new FormData();
      registerData.append('name', name);
      registerData.append('category', category);
      registerData.append('price', price);
      registerData.append('stockQuantity', stockQuantity);
      registerData.append('productImage', productImage);

      await axiosInstance.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/create`,
        registerData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      alert('상품등록 완료');
      navigate('/product/list');
    } catch (e) {
      console.log(e);

      if (e.response.data.statusMessage === 'EXPIRED_RT') {
        alert('시간이 경과하여 재로그인이 필요합니다');
        onLogout();
        navigate('/');
      } else if (e.response.data.message === 'NO_LOGIN') {
        alert('로그인행');
        navigate('/');
      }
    }
  };
  const fileUpdate = (e) => {
    // 첨부된 파일 정보 읽기
    const file = $fileTag.current.files[0];
    setProductImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageThumbnail(reader.result);
    };
  };

  return (
    <Container>
      <Grid container justifyContent='center'>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title='상품등록' style={{ textAlign: 'center' }} />
            <CardContent>
              <form onSubmit={productCreate}>
                <div
                  className='thumbnail-box'
                  onClick={() => $fileTag.current.click()}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <img
                    style={{ maxWidth: '225px' }}
                    src={imageThumbnail || require('../assets/image-add.png')}
                    alt='prod-img'
                  />
                </div>
                <TextField
                  label='상품명'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  margin='normal'
                  required
                />
                <TextField
                  label='카테고리'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                  margin='normal'
                  required
                />
                <TextField
                  label='가격'
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                  margin='normal'
                  required
                />
                <TextField
                  label='재고수량'
                  type='number'
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  fullWidth
                  margin='normal'
                  required
                />
                <input
                  type='file'
                  accept='image/*'
                  onChange={fileUpdate}
                  style={{ display: 'none' }}
                  required
                  ref={$fileTag}
                />
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  fullWidth
                >
                  등록
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductCreate;
