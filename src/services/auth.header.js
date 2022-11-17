export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.AccessToken) {
    return { 'x-access-token': user.token };
  } else {
    return {};
  }
}