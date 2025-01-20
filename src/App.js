import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import TrendingTokens from './components/TrendingTokens';
import LoadingScreen from './components/LoadingScreen';
import GlobalStyle from './styles/GlobalStyle';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  z-index: 1;
  font-family: 'Inter', sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin: 2rem 0;
  position: relative;
  padding: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(78, 205, 196, 0.1),
      rgba(255, 111, 97, 0.1),
      rgba(78, 205, 196, 0.1),
      transparent
    );
  }
`;

const Title = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 1rem;
  color: var(--deep-teal);
  font-weight: 900;
  letter-spacing: -0.02em;
  position: relative;
  display: inline-block;
  font-family: 'Manrope', sans-serif;
  background: linear-gradient(
    135deg,
    var(--deep-teal) 0%,
    var(--soft-teal) 50%,
    var(--deep-teal) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 8px rgba(78, 205, 196, 0.3));
  
  &::before {
    content: '';
    position: absolute;
    inset: -10px -20px;
    background: linear-gradient(165deg, rgba(78, 205, 196, 0.1), rgba(255, 111, 97, 0.05));
    border-radius: 8px;
    z-index: -1;
  }
  
  span {
    background: linear-gradient(
      135deg,
      var(--vibrant-coral) 0%,
      var(--soft-pink) 50%,
      var(--vibrant-coral) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 8px rgba(255, 111, 97, 0.3));
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent,
      var(--deep-teal),
      var(--vibrant-coral),
      var(--deep-teal),
      transparent
    );
    border-radius: 2px;
    opacity: 0.5;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--mint-green);
  margin-bottom: 2rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  opacity: 0.9;
  text-transform: uppercase;
  font-family: 'Inter', sans-serif;
  position: relative;
  padding: 0.5rem 1rem;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg,
      transparent,
      rgba(168, 230, 207, 0.1),
      transparent
    );
    border-radius: 4px;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      var(--mint-green),
      transparent
    );
    opacity: 0.3;
  }
`;

const LiveIndicator = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--mint-green);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--mint-green);
    border-radius: 50%;
    display: inline-block;
    animation: pulse 1s infinite;
    box-shadow: var(--success-glow);
  }
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev + 0.1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen 
              key="loading"
              progress={progress} 
              onComplete={handleLoadingComplete}
            />
          ) : (
            <>
              <LiveIndicator>LIVE UPDATES</LiveIndicator>
              <Header>
                <Title>Vision<span>Edge</span></Title>
                <Subtitle>Turning Insights into Wealth-Building Moves</Subtitle>
              </Header>
              <TrendingTokens />
            </>
          )}
        </AnimatePresence>
      </AppContainer>
    </>
  );
};

export default App; 