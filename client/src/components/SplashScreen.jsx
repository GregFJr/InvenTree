import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../SplashScreen.css';

const SplashScreen = () => {
  const [fadeProp, setFadeProp] = useState('fade-in');
  let navigate = useNavigate();

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => {
      setFadeProp('fade-out');
    }, 3000); 

    const navigateTimeout = setTimeout(() => {
      navigate('/home'); 
    }, 6000); 

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(navigateTimeout);
    };
  }, [navigate]);

  const handleImageSizing = () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    return {
      ...splashStyle,
      backgroundSize: aspectRatio > 1 ? '100% 100%' : 'cover',
    };
  };

  const splashStyle = {
    height: '100vh',
    width: '100vw',
    backgroundImage: 'url(/splash.png)',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    transition: 'opacity 3s ease-in-out',
  };

  const welcomeStyle = {
    position: 'absolute',
    top: '10%',
    left: '12%',
    transform: 'translate(-50%, -50%)',
    animation: 'fadeIn 3s ease forwards',
    zIndex: 10,
  };

  return (
    <div
      className={`splash-screen ${fadeProp}`}
      style={handleImageSizing()}> 
      <div style={welcomeStyle}><h2>Welcome To</h2></div>
      </div>
  );
};

export default SplashScreen;


