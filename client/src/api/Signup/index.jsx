import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/auth/register';

const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post(apiUrl, {
      name: name,
      email: email,
      password: password
    });

    return response.data.token;
  } catch (error) {
    throw new Error('Signup failed');
  }
};

export default signupUser;