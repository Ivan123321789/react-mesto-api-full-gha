// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'https://api.ivan.nomoreparties.sbs';
// export const BASE_URL = 'http://localhost:3333';

  const getResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); 
  }
    

export const register = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(getResponse);
}; 

export const authorize = ({password, email}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(getResponse)
}; 

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      //"Accept": "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }
  })
  .then(getResponse);
}