import axios from 'axios';

export default async function authFetchHandler({ endPoint, method = "GET", data }) {
  const url = `http://localhost:8000/${endPoint}`;
  //console.log("authHandler",data);
  const options = {
    withCredentials: true,
    method,
    data,
  };

  try {
    const response = await axios(url, options);
    return response;
  } catch (error) {
    console.log(error);
  }
}
