import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../services/api';
import { useAuth } from '../../auth/useAuth.ts';
import { User } from "../../types/user";
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = (location.state?.from?.pathname as string) || '/dashboard';

    const handleLogin = async () => {
        try {
            setError('');
            const response = await loginUser(username, password);

            if (!response?.token) {
                throw new Error('Token not found in response');
            }

            login(response.token.token, response.user as User);
            navigate(from);
        } catch (err: any) {
            setError('Login failed. Please check your login & password.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="relative mb-4">
                    <input
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Login
                </button>
                {error && <p className="text-red-600 mt-4 text-sm text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
