import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/UserAuthContext';
import Footer from './Footer';
import About from './landing/About';
import Features from './landing/Features';
import Hero from './landing/Hero';

const Landing = () => {
  const { session } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is authenticated, redirect to feed
    if (session) {
      navigate('/feed');
    }
  }, [session, navigate]);

  // Show loading state while checking authentication
  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Only render landing page if user is not authenticated
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  );
};

export default Landing;
