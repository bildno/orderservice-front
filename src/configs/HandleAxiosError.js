import { useNavigate } from 'react-router-dom';

export const hadleAxiosError = (error, onLogout, navigate) => {
  if (error.response.data.statusMessage === 'EXPIRED_RT') {
    alert('시간이 경과하여 재로그인이 필요합니다');
    onLogout();
    navigate('/');
  } else if (error.response.data.message === 'NO_LOGIN') {
    alert('로그인행');
    navigate('/');
  } else {
    // 만약 추가해야 할 예외타입이 더 있다면 else if로 추가해서 써주시면 됩니다.
    throw error;
  }
};
