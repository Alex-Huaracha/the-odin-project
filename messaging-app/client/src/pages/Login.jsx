import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md bg-slate-800/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-100">
          Login
        </h2>

        {error && (
          <div className="bg-red-500/20 backdrop-blur-md border border-red-400/30 text-red-200 p-3 mb-4 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-lg
                         text-slate-100 placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50
                         transition"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-lg
                         text-slate-100 placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50
                         transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600/80 backdrop-blur-md border border-indigo-500/30
                       text-white p-3 rounded-lg font-semibold
                       hover:bg-indigo-500/80 hover:border-indigo-400/50
                       transition shadow-lg hover:shadow-indigo-500/25"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
