import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useEffect } from 'react';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    await signup(data);
  });

  return (
    <div className="flex h-screen items-center justify-center p-4 bg-spotter-base text-spotter-text">
      <div className="bg-spotter-dark p-8 rounded-2xl shadow-2xl w-full max-w-md border border-spotter-border">
        <div className="flex justify-center mb-6">
          <Dumbbell className="w-12 h-12 text-spotter-text" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">Join Spotter</h1>

        {/* Backend Error Messages (e.g., "User already exists") */}
        {registerErrors.map((err, i) => (
          <div
            key={i}
            className="bg-spotter-red/20 text-spotter-red p-3 rounded-lg mb-4 text-center text-sm border border-spotter-red"
          >
            {err.message}
          </div>
        ))}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* USERNAME */}
          <div>
            <input
              type="text"
              {...register('username', { required: true })}
              className="w-full bg-spotter-base text-white px-4 py-3 rounded-lg border border-spotter-border focus:border-spotter-blue focus:outline-none transition-colors"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-spotter-red text-xs mt-1">Username required</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full bg-spotter-base text-white px-4 py-3 rounded-lg border border-spotter-border focus:border-spotter-blue focus:outline-none transition-colors"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-spotter-red text-xs mt-1">Email required</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="w-full bg-spotter-base text-white px-4 py-3 rounded-lg border border-spotter-border focus:border-spotter-blue focus:outline-none transition-colors"
              placeholder="Password (min. 6 characters)"
            />
            {errors.password && (
              <p className="text-spotter-red text-xs mt-1">
                Password is too short
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-spotter-text text-black font-bold py-3 rounded-full hover:bg-white/90 transition-colors mt-4"
          >
            Register
          </button>
        </form>

        <p className="flex gap-x-2 justify-between mt-6 text-spotter-textGray text-sm">
          Already have an account?
          <Link to="/login" className="text-spotter-blue hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
