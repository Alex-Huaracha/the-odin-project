import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useEffect } from 'react';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
  });

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="bg-spotter-dark p-8 rounded-2xl shadow-2xl w-full max-w-md border border-spotter-border">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Dumbbell className="w-12 h-12 text-spotter-text" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          Log in to Spotter
        </h1>

        {/* Backend Errors (e.g., "Incorrect password") */}
        {loginErrors.map((err, i) => (
          <div
            key={i}
            className="bg-spotter-red/20 text-spotter-red p-3 rounded-lg mb-4 text-center text-sm border border-spotter-red"
          >
            {err.message}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          {/* Input: Username/Email */}
          <div className="mb-4">
            <input
              type="text"
              {...register('username', { required: true })}
              className="w-full bg-spotter-base text-white px-4 py-3 rounded-lg border border-spotter-border focus:border-spotter-blue focus:outline-none transition-colors"
              placeholder="Username or Email"
            />
            {errors.username && (
              <p className="text-spotter-red text-xs mt-1">
                This field is required
              </p>
            )}
          </div>

          {/* Input: Password */}
          <div className="mb-6">
            <input
              type="password"
              {...register('password', { required: true })}
              className="w-full bg-spotter-base text-white px-4 py-3 rounded-lg border border-spotter-border focus:border-spotter-blue focus:outline-none transition-colors"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-spotter-red text-xs mt-1">
                Password is required
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-spotter-text text-black font-bold py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="flex gap-x-2 justify-between mt-6 text-spotter-textGray text-sm">
          Don't have an account?
          <Link to="/register" className="text-spotter-blue hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
