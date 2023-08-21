
import React, { useState } from 'react'; 
import loginUser from '../../../api/Login';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/basic/InputFeild.jsx';

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await loginUser(email, password);
      localStorage.setItem('token', token);
      setError(false); 
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
      setError(true); 
    }
  };

  const signupRoute = () => {
    navigate('/signup')
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
            <div className="flex flex-column">
                <div>
                    <div className="bg-white border border-gray-300 w-80 pt-10 pb-60 flex items-center flex-col mb-3 relative">                        <form
                            className="mt-8 w-64 flex flex-col"
                            onSubmit={handleSubmit}
                    >
                          <InputField
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <InputField
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                            
                            <button
                                type="submit"
                                className="text-sm text-center bg-blue-300 text-white py-1 rounded font-medium"
                            >
                                Log In
                            </button>
                        </form>
                        <div
                            className={`text-sm text-center text-red-500 absolute bottom-20 px-8 ${error ? "" : "hidden"}`}
                        >
                            Sorry, your email/password was incorrect. Please
                            double-check and try again.
                        </div>
                    </div>
                    <div className="bg-white border border-gray-300 text-center w-80 py-4">
                        <span className="text-sm">Don't have an account?</span>
                        <button 
                            className="text-blue-500 text-sm font-semibold ml-1 cursor-pointer"
                            onClick={signupRoute}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Authentication;
