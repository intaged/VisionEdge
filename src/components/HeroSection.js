import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 4rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: 'Inter', sans-serif;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--neon-cyan),
      var(--neon-pink),
      var(--neon-cyan),
      transparent
    );
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--neon-pink),
      var(--neon-cyan),
      var(--neon-pink),
      transparent
    );
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const StatBox = styled(motion.div)`
  text-align: center;
  position: relative;
  padding: 1.5rem 2rem;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(45deg, var(--neon-cyan), var(--neon-pink));
    border-radius: 16px;
    z-index: -1;
    opacity: 0.15;
  }
`;

const StatValue = styled.div`
  font-size: 2.75rem;
  font-weight: 800;
  color: var(--soft-white);
  text-shadow: 0 0 10px var(--neon-cyan);
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  line-height: 1;
  font-feature-settings: "tnum" 1;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: var(--neon-cyan);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
  opacity: 0.9;
  font-family: 'Manrope', sans-serif;
`;

const OrbContainer = styled.div`
  position: absolute;
  right: 10%;
  animation: ${float} 6s ease-in-out infinite;
`;

const Orb = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 5px;
    background: linear-gradient(
      45deg,
      var(--neon-cyan),
      var(--neon-pink),
      var(--neon-green)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: ${rotate} 10s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--neon-cyan);
    text-shadow: 0 0 20px var(--neon-cyan);
    animation: ${pulse} 2s ease-in-out infinite;
    background: currentColor;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M30 20 L70 20 L70 35 L55 35 L55 80 L45 80 L45 35 L30 35 Z' /%3E%3Cpath d='M30 45 L70 45 L70 60 L30 60 Z' /%3E%3C/svg%3E") center/contain no-repeat;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M30 20 L70 20 L70 35 L55 35 L55 80 L45 80 L45 35 L30 35 Z' /%3E%3Cpath d='M30 45 L70 45 L70 60 L30 60 Z' /%3E%3C/svg%3E") center/contain no-repeat;
  }
`;

const BackgroundGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(8, 247, 254, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(8, 247, 254, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 1;
`;

const HeroSection = ({ stats }) => {
  return (
    <HeroContainer>
      <BackgroundGrid />
      <StatsContainer>
        <StatBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <StatValue>${stats.volume.toLocaleString()}</StatValue>
          <StatLabel>24H Volume</StatLabel>
        </StatBox>
        <StatBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <StatValue>{stats.traders.toLocaleString()}</StatValue>
          <StatLabel>Active Traders</StatLabel>
        </StatBox>
        <StatBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <StatValue>+{stats.topGainer}%</StatValue>
          <StatLabel>Top Gainer</StatLabel>
        </StatBox>
      </StatsContainer>
      <OrbContainer>
        <Orb />
      </OrbContainer>
    </HeroContainer>
  );
};

export default HeroSection; 