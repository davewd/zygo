import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/UserAuthContext';

type Props = {};
const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { session, signInUser } = UserAuth();
  const navigate = useNavigate();

  // Check if form is complete
  const isFormComplete = email.trim() !== '' && password.trim() !== '';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInUser(email, password);
      if (result.success) {
        navigate('/feed'); // Redirect to home or dashboard after successful signup
      } else {
        setError(result.error.message); // Set error message if signup fails
      }
      console.log('Sign In call handled successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zygo-cream via-white to-zygo-mint"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-zygo-yellow rounded-full opacity-60 animate-float"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-zygo-blue rounded-full opacity-50 animate-float"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-zygo-mint rounded-full opacity-70 animate-float"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="absolute bottom-60 right-40 w-8 h-8 bg-zygo-red rounded-full opacity-60 animate-float"
        style={{ animationDelay: '3s' }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <div className="flex vertical-center flex-col items-center justify-center mb-6">
            <h2 className="text-6xl md:text-4xl font-bold text-gray-800">Login</h2>
            <p className="text-lg md:text-base text-gray-600 mt-2">
              Join our community and start your journey with Zygo today!
            </p>
            <form onSubmit={handleLogin} className="mt-8 w-full max-w-md">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-4 px-4 py-2 border border-gray-300 bg-white rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-zygo-blue"
              />
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="mt-4 px-4 py-2 border border-gray-300 bg-white rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-zygo-blue"
              />
              <p className="text-sm text-gray-500 mt-2">
                By signing up, you agree to our{' '}
                <a href="/terms" className="text-zygo-blue hover:underline">
                  Terms of Service
                </a>{' '}
              </p>
              <button
                className={`mt-6 px-6 py-3 text-white font-semibold rounded-lg transition-colors ${
                  isFormComplete
                    ? 'bg-zygo-dark-blue hover:bg-zygo-dark-blue/80'
                    : 'bg-zygo-blue hover:bg-zygo-dark-blue'
                }`}
                disabled={loading}
                type="submit"
              >
                Login
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
