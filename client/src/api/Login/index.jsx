import axios from 'axios';

const apiUrl = 'http://localhost:8000/auth/login';

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(apiUrl, {
      email: email,
      password: password
    });

    return response.data.token;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export default loginUser;