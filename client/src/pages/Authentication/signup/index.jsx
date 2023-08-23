
import React, { useState } from 'react'; 
import signupUser from '../../../api/Signup';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/basic/InputFeild.jsx';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await signupUser(name, email, password);
      localStorage.setItem('token', token);
      setError(false); 
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
      setError(true); 
    }
  };

  const loginRoute = () => {
    navigate('/')
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
            <div className="flex flex-column">
                <div>
                    <div className="bg-white border border-gray-300 w-80 pt-10 pb-60 flex items-center flex-col mb-3 relative">
                        <form
                            className="mt-8 w-64 flex flex-col"
                            onSubmit={handleSubmit}
                        >
                            <InputField
                                className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                                type="text"
                                placeholder="full name"
                                value={email}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <InputField
                                className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                                type="text"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputField
                                className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="text-sm text-center bg-blue-300 text-white py-1 rounded font-medium"
                            >
                                Sign up
                            </button>
                        </form>
                        <div
                            className={`text-sm text-center text-red-500 absolute bottom-20 px-8 ${error ? "" : "hidden"}`}
                        >
                            Sorry, your email is already assigned to an account. Please
                            try with a different email
                        </div>
                    </div>
                    <div className="bg-white border border-gray-300 text-center w-80 py-4">
                        <span className="text-sm">Already have an account?</span>
                        <button 
                            className="text-blue-500 text-sm font-semibold ml-1 cursor-pointer"
                            onClick={loginRoute}
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Signup;
