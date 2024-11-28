import axios from 'axios';
// import getCookieService from './GetCookieService';

const usersUrl = 'http://182.160.114.100:8081/';
// const usersUrl = 'http://localhost:8081/';

export const login = async (user) => {
  console.log(user);

  try {
    return await axios.post(`${usersUrl}auth/login`, user);
  } catch (err) {
    console.log(err.message);

    return err.message;
  }
};
