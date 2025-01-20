import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const glitch = keyframes`
  0% {
    text-shadow: 0.05em 0 0 var(--vibrant-coral), -0.05em -0.025em 0 var(--deep-teal),
                -0.025em 0.05em 0 var(--mint-green);
  }
  14% {
    text-shadow: 0.05em 0 0 var(--vibrant-coral), -0.05em -0.025em 0 var(--deep-teal),
                -0.025em 0.05em 0 var(--mint-green);
  }
  15% {
    text-shadow: -0.05em -0.025em 0 var(--vibrant-coral), 0.025em 0.025em 0 var(--deep-teal),
                -0.05em -0.05em 0 var(--mint-green);
  }
  49% {
    text-shadow: -0.05em -0.025em 0 var(--vibrant-coral), 0.025em 0.025em 0 var(--deep-teal),
                -0.05em -0.05em 0 var(--mint-green);
  }
  50% {
    text-shadow: 0.025em 0.05em 0 var(--vibrant-coral), 0.05em 0 0 var(--deep-teal),
                0 -0.05em 0 var(--mint-green);
  }
  99% {
    text-shadow: 0.025em 0.05em 0 var(--vibrant-coral), 0.05em 0 0 var(--deep-teal),
                0 -0.05em 0 var(--mint-green);
  }
  100% {
    text-shadow: -0.025em 0 0 var(--vibrant-coral), -0.025em -0.025em 0 var(--deep-teal),
                -0.025em -0.05em 0 var(--mint-green);
  }
`;

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const flicker = keyframes`
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 0.99;
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.4;
  }
`;

const matrix = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% -200%;
  }
`;

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
  font-family: 'Manrope', sans-serif;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-image: linear-gradient(0deg, transparent 24%, 
      rgba(78, 205, 196, 0.03) 25%,
      rgba(78, 205, 196, 0.03) 26%, transparent 27%, transparent 74%,
      rgba(78, 205, 196, 0.03) 75%, rgba(78, 205, 196, 0.03) 76%, transparent 77%),
      linear-gradient(90deg, transparent 24%, 
      rgba(78, 205, 196, 0.03) 25%, rgba(78, 205, 196, 0.03) 26%, transparent 27%, transparent 74%,
      rgba(78, 205, 196, 0.03) 75%, rgba(78, 205, 196, 0.03) 76%, transparent 77%);
    background-size: 50px 50px;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%),
                linear-gradient(to bottom,
                  rgba(78, 205, 196, 0.1) 0%,
                  rgba(255, 111, 97, 0.1) 100%);
    pointer-events: none;
    animation: ${flicker} 4s infinite;
  }
`;

const MatrixBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background: linear-gradient(0deg, transparent 0%, rgba(78, 205, 196, 0.03) 50%, transparent 100%);
  background-size: 100% 200%;
  animation: ${matrix} 20s linear infinite;
  opacity: 0.5;
  pointer-events: none;
`;

const LogoContainer = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 150px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--deep-teal), transparent);
    top: 50%;
    animation: ${flicker} 2s infinite alternate;
  }

  &::before {
    left: -180px;
    transform: rotate(-45deg);
  }

  &::after {
    right: -180px;
    transform: rotate(45deg);
  }
`;

const Logo = styled.h1`
  font-size: 4.5rem;
  color: var(--deep-teal);
  text-shadow: 0 0 10px var(--deep-teal),
               0 0 20px var(--deep-teal),
               0 0 30px var(--soft-teal);
  font-weight: 900;
  letter-spacing: -0.02em;
  animation: ${glitch} 2s infinite;
  position: relative;
  
  span {
    color: var(--vibrant-coral);
    text-shadow: 0 0 10px var(--vibrant-coral),
                 0 0 20px var(--soft-pink),
                 0 0 30px var(--soft-pink);
  }

  &::before {
    content: attr(data-text);
    position: absolute;
    left: -2px;
    text-shadow: -1px 0 var(--mint-green);
    top: 0;
    color: var(--deep-teal);
    background: #0a0a0a;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: ${glitch} 2s infinite linear alternate-reverse;
  }

  &::after {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    text-shadow: 1px 0 var(--vibrant-coral);
    top: 0;
    color: var(--deep-teal);
    background: #0a0a0a;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: ${glitch} 3s infinite linear alternate-reverse;
  }
`;

const LoadingBar = styled(motion.div)`
  width: 300px;
  height: 4px;
  background: rgba(78, 205, 196, 0.1);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(78, 205, 196, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      var(--deep-teal),
      var(--vibrant-coral),
      var(--mint-green),
      var(--deep-teal)
    );
    background-size: 300% 100%;
    animation: gradient 2s linear infinite;
    transform-origin: left;
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
`;

const LoadingText = styled(motion.div)`
  color: var(--mint-green);
  font-size: 1rem;
  margin-top: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-shadow: 0 0 5px var(--mint-green);
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--mint-green);
    border-radius: 50%;
    display: inline-block;
    animation: pulse 1s infinite;
    box-shadow: 0 0 10px var(--mint-green);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      var(--mint-green), 
      transparent
    );
  }
`;

const ProgressPercentage = styled(motion.span)`
  position: absolute;
  right: -60px;
  color: var(--deep-teal);
  font-size: 0.8rem;
  font-family: 'Space Mono', monospace;
`;

const LoadingScreen = ({ progress, onComplete }) => {
  return (
    <Container
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { 
          duration: 0.5,
          ease: "easeInOut"
        }
      }}
    >
      <MatrixBackground />
      <LogoContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        }}
      >
        <Logo data-text="VisionEdge">
          Vision<span>Edge</span>
        </Logo>
      </LogoContainer>
      
      <LoadingBar
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: progress,
          transition: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }}
        onAnimationComplete={() => {
          if (progress >= 1) {
            onComplete();
          }
        }}
      />
      
      <LoadingText
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 0.8, 
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        }}
      >
        Scanning Blockchain
        <ProgressPercentage>
          {Math.round(progress * 100)}%
        </ProgressPercentage>
      </LoadingText>
    </Container>
  );
};

export default LoadingScreen; 