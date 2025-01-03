

export const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const getRole = () => {
  const role = localStorage.getItem("role");
  return role;
}

export const getToken = () => {
  const token = localStorage.getItem('accessToken');
  return token;
}