import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  position: relative;
  padding: 1rem;
  margin: 0 auto;
  gap: 1rem;

  @media (min-width: 1440px) {
    grid-template-columns: 280px 1fr;
    padding: 1.5rem 2rem;
    gap: 1.5rem;
  }
`;

const InfoSection = styled.div`
  position: sticky;
  top: 1rem;
  height: calc(100vh - 2rem);
  background: linear-gradient(
    165deg,
    rgba(37, 43, 66, 0.97) 0%,
    rgba(13, 13, 13, 0.99) 100%
  );
  border-radius: 16px;
  border: 1px solid rgba(78, 205, 196, 0.15);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  backdrop-filter: blur(10px);
  overflow: hidden;

  h2 {
    font-size: 2rem;
    background: linear-gradient(135deg, var(--deep-teal), var(--vibrant-coral));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    letter-spacing: -0.5px;
    font-family: 'ClashDisplay-Bold', sans-serif;
    text-align: center;
    margin-bottom: 0.25rem;
    
    &::after {
      content: '';
      display: block;
      width: 40px;
      height: 2px;
      background: linear-gradient(90deg, var(--deep-teal), var(--vibrant-coral));
      margin: 0.5rem auto 0;
      border-radius: 2px;
    }
  }

  .description {
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--soft-white);
    opacity: 0.9;
    text-align: center;
    max-width: 90%;
    margin: 0 auto;
  }

  .features {
    display: grid;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .feature {
    background: rgba(78, 205, 196, 0.03);
    border-radius: 8px;
    padding: 0.75rem;
    border: 1px solid rgba(78, 205, 196, 0.1);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(78, 205, 196, 0.05);
      border-color: rgba(78, 205, 196, 0.2);
      transform: translateY(-2px);
    }

    h3 {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--deep-teal);
      font-size: 0.85rem;
      margin-bottom: 0.4rem;
      font-weight: 600;

      .icon {
        color: var(--vibrant-coral);
      }
    }

    p {
      color: var(--soft-white);
      font-size: 0.75rem;
      line-height: 1.4;
      opacity: 0.8;
    }
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1200px;
  width: 100%;
`;

const TimeRangeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.3rem;
  background: linear-gradient(
    165deg,
    rgba(37, 43, 66, 0.95) 0%,
    rgba(13, 13, 13, 0.98) 100%
  );
  border-radius: 10px;
  border: 1px solid rgba(78, 205, 196, 0.15);
  width: fit-content;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 1.5rem;
  z-index: 10;
  margin-bottom: 0.75rem;
`;

const TokenGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  > *:first-child {
    grid-column: 1 / -1;
    transform-origin: center;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.4rem 0.8rem;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: ${props => props.type === 'top-gainer' ? 
    'linear-gradient(135deg, rgba(13, 13, 13, 0.9), rgba(37, 43, 66, 0.95))' : 
    'rgba(255, 0, 255, 0.15)'};
  color: ${props => props.type === 'top-gainer' ? 'var(--deep-teal)' : 'var(--vibrant-coral)'};
  border: 1px solid ${props => props.type === 'top-gainer' ? 'var(--deep-teal)' : 'var(--vibrant-coral)'};
  box-shadow: ${props => props.type === 'top-gainer' ? 
    '0 0 20px rgba(78, 205, 196, 0.2)' : 
    '0 0 15px rgba(255, 0, 255, 0.2)'};
  backdrop-filter: blur(4px);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Inter', sans-serif;
`;

const TimeRangeSegment = styled.button`
  position: relative;
  padding: 8px 16px;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${props => props.$active ? 'var(--deep-teal)' : 'rgba(255, 255, 255, 0.6)'};
  background: ${props => props.$active ? 'rgba(78, 205, 196, 0.1)' : 'transparent'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.1em;
  min-width: 60px;

  &:hover {
    color: ${props => props.$active ? 'var(--deep-teal)' : 'rgba(255, 255, 255, 0.9)'};
    background: ${props => props.$active ? 'rgba(78, 205, 196, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  }

  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 2px;
      background: var(--deep-teal);
      border-radius: 2px;
      box-shadow: 0 0 8px var(--deep-teal);
    }
  `}
`;

const TokenImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 10px;
  border: 2px solid var(--deep-teal);
  padding: 2px;
  background: rgba(13, 13, 13, 0.6);
  box-shadow: 0 0 20px rgba(78, 205, 196, 0.2);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  z-index: 2;
`;

const TokenName = styled.h3`
  font-size: 1.1rem;
  color: var(--deep-teal);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.2rem;
  font-family: 'ClashDisplay-Semibold', sans-serif;
  text-shadow: 0 0 15px rgba(78, 205, 196, 0.2);
`;

const TokenSymbol = styled.p`
  color: var(--deep-teal);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
  opacity: 0.9;
  font-family: 'Inter', sans-serif;
`;

const MetricBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;
  z-index: 1;
`;

const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: var(--deep-teal);
  opacity: 0.8;
  letter-spacing: 1px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
`;

const TokenMetrics = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(78, 205, 196, 0.05);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      45deg,
      rgba(78, 205, 196, 0.3),
      rgba(255, 111, 97, 0.3)
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const TokenPrice = styled(MetricBox)`
  .value {
    color: var(--deep-teal);
    font-size: 1.1rem;
    font-weight: 700;
    text-shadow: 0 0 15px rgba(78, 205, 196, 0.3);
    letter-spacing: -0.02em;
    font-feature-settings: "tnum" 1;
    font-family: 'Space Mono', monospace;
  }
`;

const TokenChange = styled(MetricBox)`
  align-items: flex-end;

  .value {
    color: ${props => props.positive ? 'var(--mint-green)' : 'var(--vibrant-coral)'};
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    text-shadow: ${props => props.positive ? 
      '0 0 20px rgba(168, 230, 207, 0.5)' : 
      '0 0 20px rgba(255, 111, 97, 0.3)'};
    font-family: 'Space Mono', monospace;

    &::before {
      content: ${props => props.positive ? '"↗"' : '"↘"'};
      font-size: 1.4rem;
      line-height: 1;
      margin-right: 2px;
      color: inherit;
      transform: ${props => props.positive ? 'translateY(-2px)' : 'translateY(2px)'};
      transition: transform 0.3s ease;
      text-shadow: ${props => props.positive ? 
        '0 0 10px rgba(168, 230, 207, 0.8), 0 0 20px rgba(168, 230, 207, 0.4)' : 
        '0 0 10px rgba(255, 111, 97, 0.8), 0 0 20px rgba(255, 111, 97, 0.4)'};
    }
  }
`;

const TokenHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const TokenInfo = styled.div`
  flex: 1;
`;

const TokenCard = styled.div`
  background: linear-gradient(165deg, rgba(37, 43, 66, 0.97) 0%, rgba(13, 13, 13, 0.99) 100%);
  border-radius: 16px;
  border: 1px solid rgba(78, 205, 196, 0.15);
  padding: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(78, 205, 196, 0.3);
    box-shadow: 
      0 8px 20px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(78, 205, 196, 0.2);

    ${TokenImage} {
      transform: scale(1.05);
      border-color: var(--vibrant-coral);
      box-shadow: 0 0 25px rgba(255, 111, 97, 0.3);
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(78, 205, 196, 0.1), transparent 70%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      45deg,
      rgba(78, 205, 196, 0.3),
      rgba(255, 111, 97, 0.3)
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
  }

  ${props => props.$featured && `
    grid-column: span 2;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.5rem;
    align-items: center;

    ${TokenImage} {
      width: 80px;
      height: 80px;
    }

    ${TokenMetrics} {
      grid-template-columns: repeat(4, 1fr);
    }
  `}
`;

const TokenRank = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(78, 205, 196, 0.1);
  color: var(--deep-teal);
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.05em;
  border: 1px solid rgba(78, 205, 196, 0.2);
  font-family: 'Space Mono', monospace;
  z-index: 2;
`;

const TokenVolume = styled(MetricBox)`
  .value {
    color: var(--soft-teal);
    font-size: 0.9rem;
    font-weight: 600;
    font-feature-settings: "tnum" 1;
    font-family: 'Space Mono', monospace;
    opacity: 0.9;
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 80px;
  height: 80px;
  border: 3px solid transparent;
  border-top: 3px solid var(--deep-teal);
  border-right: 3px solid var(--vibrant-coral);
  border-bottom: 3px solid var(--mint-green);
  border-left: 3px solid var(--soft-pink);
  border-radius: 50%;
  margin: 3rem auto;
  position: relative;
  filter: drop-shadow(0 0 10px rgba(78, 205, 196, 0.3));

  .progress {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    font-weight: 600;
    color: var(--deep-teal);
    text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
    font-family: 'Space Mono', monospace;
  }

  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }

  &::before {
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid var(--vibrant-coral);
    animation-delay: -0.5s;
  }

  &::after {
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    border: 3px solid transparent;
    border-top: 3px solid var(--deep-teal);
    top: -8px;
    left: -8px;
    animation-delay: -1s;
  }

  @keyframes pulse-ring {
    0% {
      transform: rotate(0deg) scale(1);
      opacity: 1;
    }
    50% {
      transform: rotate(180deg) scale(1.1);
      opacity: 0.5;
    }
    100% {
      transform: rotate(360deg) scale(1);
      opacity: 1;
    }
  }
`;

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.9,
    rotateX: -20
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  hover: {
    scale: 1.05,
    rotateX: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const timeRangeTooltips = {
  '5M': 'Data from the last 5 minutes',
  '15M': 'Data from the last 15 minutes',
  '30M': 'Data from the last 30 minutes',
  '1H': 'Data from the last hour',
  '4H': 'Data from the last 4 hours',
  '24h': 'Data from the last 24 hours'
};

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(165deg, rgba(37, 43, 66, 0.95) 0%, rgba(13, 13, 13, 0.98) 100%);
  border-radius: 8px;
  padding: 0.75rem;
  max-width: 300px;
  width: 100%;
  position: relative;
  border: 1px solid var(--deep-teal);
  box-shadow: 0 0 20px rgba(78, 205, 196, 0.2);
  overflow: hidden;
  transform: scale(0.15);
  transform-origin: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(255, 111, 97, 0.15), transparent 50%);
    z-index: 0;
  }
`;

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-top: 0.5rem;
  position: relative;
  z-index: 1;
`;

const DetailCard = styled.div`
  background: rgba(78, 205, 196, 0.05);
  border-radius: 6px;
  padding: 0.5rem;
  border: 1px solid rgba(78, 205, 196, 0.2);

  h3 {
    color: var(--deep-teal);
    font-size: 0.75rem;
    margin-bottom: 0.4rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .content {
    color: var(--soft-white);
    font-size: 0.7rem;
    line-height: 1.3;
    opacity: 0.9;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(78, 205, 196, 0.1);
  }

  .metric-item {
    h4 {
      color: var(--deep-teal);
      font-size: 0.65rem;
      margin-bottom: 0.2rem;
      opacity: 0.8;
    }
    p {
      font-size: 0.7rem;
      font-weight: 600;
    }
  }

  &:hover {
    background: rgba(78, 205, 196, 0.08);
    border-color: rgba(78, 205, 196, 0.3);
  }
`;

const TrendingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.5rem;
  padding: 0.4rem;
  background: ${props => props.positive ? 'rgba(168, 230, 207, 0.1)' : 'rgba(255, 111, 97, 0.1)'};
  border-radius: 4px;
  color: ${props => props.positive ? 'var(--mint-green)' : 'var(--vibrant-coral)'};
  font-size: 0.65rem;
  font-weight: 600;

  &::before {
    content: ${props => props.positive ? '"↗"' : '"↘"'};
    font-size: 0.8rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  background: none;
  border: none;
  color: var(--deep-teal);
  font-size: 0.9rem;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(78, 205, 196, 0.1);
    transform: rotate(90deg);
  }
`;

const SocialLinks = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  gap: 0.75rem;
  z-index: 100;
`;

const SocialLink = styled.a`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 6px;
  background: rgba(78, 205, 196, 0.05);
  border: 1px solid rgba(78, 205, 196, 0.15);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    background: rgba(78, 205, 196, 0.1);
    border-color: rgba(78, 205, 196, 0.3);
    box-shadow: 
      0 0 15px rgba(78, 205, 196, 0.2),
      0 0 20px rgba(78, 205, 196, 0.1) inset;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: var(--deep-teal);
    transition: all 0.3s ease;
  }
`;

function TrendingTokens() {
  const [tokens, setTokens] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [loading, setLoading] = useState(true);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(5);

  const sendWebSocketMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  const cleanupWebSocket = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN) {
        sendWebSocketMessage({
          type: 'leave',
          room: 'trending'
        });
      }
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const handlePriceUpdate = (data) => {
    setTokens(prevTokens => {
      return prevTokens.map(token => {
        if (token.token.mint === data.mint) {
          return {
            ...token,
            pools: [{
              ...token.pools[0],
              price: { usd: parseFloat(data.price) }
            }]
          };
        }
        return token;
      });
    });
  };

  const handleVolumeUpdate = (data) => {
    setTokens(prevTokens => {
      return prevTokens.map(token => {
        if (token.token.mint === data.mint) {
          return {
            ...token,
            events: {
              ...token.events,
              [selectedTimeRange]: {
                ...token.events[selectedTimeRange],
                volume: data.volume
              }
            }
          };
        }
        return token;
      });
    });
  };

  const handleTrendingUpdate = (data) => {
    setTokens(prevTokens => {
      const updatedTokens = [...prevTokens];
      const index = updatedTokens.findIndex(t => t.token.mint === data.token.mint);
      
      if (index !== -1) {
        updatedTokens[index] = {
          ...updatedTokens[index],
          ...data,
          events: {
            ...updatedTokens[index].events,
            [selectedTimeRange]: data.events[selectedTimeRange]
          }
        };
      } else {
        updatedTokens.push({
          ...data
        });
      }
      
      return updatedTokens
        .sort((a, b) => {
          const aChange = a.events[selectedTimeRange]?.priceChangePercentage || 0;
          const bChange = b.events[selectedTimeRange]?.priceChangePercentage || 0;
          return bChange - aChange;
        })
        .slice(0, 5);
    });
  };

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://data.solanatracker.io/tokens/trending/' + selectedTimeRange, {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });
      
      const sortedTokens = response.data
        .sort((a, b) => {
          const aChange = a.events[selectedTimeRange]?.priceChangePercentage || 0;
          const bChange = b.events[selectedTimeRange]?.priceChangePercentage || 0;
          return bChange - aChange;
        })
        .slice(0, 5);
      
      setTimeout(() => {
        setLoadingProgress(30);
        setTimeout(() => {
          setLoadingProgress(100);
          setTokens(sortedTokens);
          setLoading(false);
        }, 200);
      }, 200);
      
    } catch (error) {
      console.error('Error fetching trending tokens:', error);
      setLoading(false);
      setLoadingProgress(100);
    }
  };

  const initializeWebSocket = () => {
    cleanupWebSocket();

    const ws = new WebSocket('wss://data.solanatracker.io');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({
        type: 'join',
        room: 'trending',
        timeRange: selectedTimeRange
      }));
    };

    ws.onclose = (event) => {
      console.log('WebSocket disconnected:', event.code, event.reason);
      wsRef.current = null;
      
      if (event.code !== 1000) {
        reconnectTimeoutRef.current = setTimeout(initializeWebSocket, 3000);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case 'price':
            handlePriceUpdate(data);
            break;
          case 'volume':
            handleVolumeUpdate(data);
            break;
          case 'trending':
            handleTrendingUpdate(data);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    wsRef.current = ws;
  };

  useEffect(() => {
    initializeWebSocket();
    fetchTokens();

    return () => {
      cleanupWebSocket();
    };
  }, []);

  useEffect(() => {
    fetchTokens();
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'leave',
        room: 'trending'
      }));
      wsRef.current.send(JSON.stringify({
        type: 'join',
        room: 'trending',
        timeRange: selectedTimeRange
      }));
    }
  }, [selectedTimeRange]);

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
  };

  const getBadgeType = (token, index) => {
    if (index === 0) return 'top-gainer';
    if (token.events[selectedTimeRange]?.volume > 1000000) return 'most-active';
    return null;
  };

  const formatMarketCap = (marketCap) => {
    if (!marketCap) return '$0.00';
    
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else if (marketCap >= 1e3) {
      return `$${(marketCap / 1e3).toFixed(2)}K`;
    } else {
      return `$${marketCap.toFixed(2)}`;
    }
  };

  const formatVolume = (volume) => {
    if (!volume && volume !== 0) return '$0.00';
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(2)}K`;
    return `$${volume.toFixed(2)}`;
  };

  const handleCardClick = (token) => {
    setSelectedToken(token);
  };

  const closeModal = () => {
    setSelectedToken(null);
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <Container>
      <SocialLinks>
        <SocialLink 
          href="https://x.com/ORANGIEBELLYSOL"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on X (Twitter)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </SocialLink>
        <SocialLink
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Join us on Telegram"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.815-.168.73-.337 1.466-.505 2.198-.169.732-.507.976-.832 1.004-.712.061-1.254-.435-1.943-.853-.986-.598-1.544-.962-2.498-1.541-1.097-.665-.385-1.031.24-1.629.164-.158 3.02-2.763 3.073-2.999.007-.03.012-.144-.056-.204-.067-.06-.167-.04-.239-.023-.101.024-1.708 1.086-4.82 3.185-.456.312-.87.465-1.241.457-.408-.009-1.191-.233-1.774-.424-.719-.238-1.292-.364-1.242-.77.026-.215.322-.437.889-.665 3.478-1.524 5.797-2.528 6.957-3.012 3.307-1.381 3.997-1.621 4.449-1.629.099-.002.321.023.465.14.123.1.153.234.166.333.019.14.031.472.012.602z"/>
          </svg>
        </SocialLink>
      </SocialLinks>
      <InfoSection>
        <h2>VisionEdge</h2>
        <div className="description">
          Turning Insights into Wealth-Building Moves.
        </div>
        <div className="features">
          <div className="feature">
            <h3>
              <span className="icon">◈</span>
              Smart Detection
            </h3>
            <p>Instantly identify high-potential tokens and market movements before they trend.</p>
          </div>
          <div className="feature">
            <h3>
              <span className="icon">◈</span>
              Live Analytics
            </h3>
            <p>Real-time price tracking and performance metrics for informed trading decisions.</p>
          </div>
          <div className="feature">
            <h3>
              <span className="icon">◈</span>
              Market Insights
            </h3>
            <p>Deep analysis of market trends, volume patterns, and trading activity.</p>
          </div>
          <div className="feature">
            <h3>
              <span className="icon">◈</span>
              Price Alerts
            </h3>
            <p>Get notified instantly about significant price movements and market opportunities.</p>
          </div>
          <div className="feature">
            <h3>
              <span className="icon">◈</span>
              Portfolio Tracking
            </h3>
            <p>Monitor your holdings and track performance across multiple wallets.</p>
          </div>
        </div>
      </InfoSection>

      <MainContent>
        <TimeRangeContainer>
          {Object.keys(timeRangeTooltips).map((range) => (
            <TimeRangeSegment
              key={range}
              $active={selectedTimeRange === range}
              onClick={() => handleTimeRangeChange(range)}
              data-tooltip={timeRangeTooltips[range]}
            >
              {range}
            </TimeRangeSegment>
          ))}
        </TimeRangeContainer>

        {loading ? (
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <TokenGrid>
            <AnimatePresence>
              {tokens.map((token, index) => (
                <TokenCard
                  key={token.token.mint}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                  isTopGainer={index === 0}
                  onClick={() => handleCardClick(token)}
                >
                  {getBadgeType(token, index) && (
                    <Badge type={getBadgeType(token, index)}>
                      <div className="emoji-container">
                        {getBadgeType(token, index) === 'top-gainer' ? (
                          <div className="rank-icon" />
                        ) : (
                          <span className="emoji">⚡</span>
                        )}
                      </div>
                      {getBadgeType(token, index) === 'top-gainer' ? 'Top Gainer' : 'Most Active'}
                    </Badge>
                  )}
                  <TokenHeader>
                    <TokenImage 
                      src={token.token.image} 
                      alt={token.token.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/70?text=🌠';
                      }}
                    />
                    <TokenInfo>
                      <TokenName>{token.token.name}</TokenName>
                      <TokenSymbol>{token.token.symbol}</TokenSymbol>
                    </TokenInfo>
                  </TokenHeader>
                  <TokenMetrics>
                    <TokenPrice>
                      <MetricLabel>MKT CAP</MetricLabel>
                      <div className="value">
                        {formatMarketCap(token.pools[0]?.marketCap?.usd)}
                      </div>
                    </TokenPrice>
                    <TokenChange positive={token.events[selectedTimeRange]?.priceChangePercentage > 0}>
                      <MetricLabel>{selectedTimeRange} CHANGE</MetricLabel>
                      <div className="value">
                        {token.events[selectedTimeRange]?.priceChangePercentage?.toFixed(2)}%
                      </div>
                    </TokenChange>
                  </TokenMetrics>
                </TokenCard>
              ))}
            </AnimatePresence>
          </TokenGrid>
        )}
      </MainContent>

      <AnimatePresence>
        {selectedToken && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>×</CloseButton>
              <ModalHeader>
                <TokenImage 
                  src={selectedToken.token.image} 
                  alt={selectedToken.token.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/70?text=🌠';
                  }}
                />
                <TokenInfo>
                  <TokenName>{selectedToken.token.name}</TokenName>
                  <TokenSymbol>{selectedToken.token.symbol}</TokenSymbol>
                </TokenInfo>
              </ModalHeader>
              
              <DetailGrid>
                <DetailCard>
                  <h3>
                    <span>🎯</span> Investment Highlights
                  </h3>
                  <div className="content">
                    {selectedToken.events[selectedTimeRange]?.priceChangePercentage > 10 ? 
                      `${selectedToken.token.name} is demonstrating exceptional momentum with a ${selectedToken.events[selectedTimeRange]?.priceChangePercentage.toFixed(2)}% surge in the past ${selectedTimeRange}, signaling strong buyer conviction and potential trend continuation.` :
                      `${selectedToken.token.name} is maintaining a balanced market position with controlled volatility, suggesting a potential accumulation phase.`}
                  </div>
                  <TrendingIndicator positive={selectedToken.events[selectedTimeRange]?.priceChangePercentage > 0}>
                    {selectedToken.events[selectedTimeRange]?.priceChangePercentage > 0 ? 
                      "Bullish Momentum" : "Accumulation Phase"}
                  </TrendingIndicator>
                </DetailCard>

                <DetailCard>
                  <h3>
                    <span>📊</span> Market Analysis
                  </h3>
                  <div className="content">
                    <div style={{ marginBottom: '1rem' }}>
                      {`${selectedToken.token.name} is currently positioned at ${
                        selectedToken.events[selectedTimeRange]?.priceChangePercentage > 0 ? 
                        "the forefront of market momentum" : "a strategic price level"
                      }, with several key indicators suggesting ${
                        selectedToken.events[selectedTimeRange]?.priceChangePercentage > 5 ?
                        "potential for continued upward movement" : "a developing opportunity"
                      }.`}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      {selectedToken.events[selectedTimeRange]?.volume > 1000000 ?
                        "Market depth analysis shows substantial liquidity and active trading, reducing slippage risk for larger positions." :
                        "Current market structure shows balanced order flow with room for position building at optimal levels."}
                    </div>
                  </div>
                  <div className="metrics">
                    <div className="metric-item">
                      <h4>TRADING ACTIVITY</h4>
                      <p>{selectedToken.events[selectedTimeRange]?.priceChangePercentage > 10 ? 'Very High' :
                         selectedToken.events[selectedTimeRange]?.priceChangePercentage > 5 ? 'High' :
                         selectedToken.events[selectedTimeRange]?.priceChangePercentage > 0 ? 'Moderate' : 'Low'}</p>
                    </div>
                    <div className="metric-item">
                      <h4>MARKET CAP</h4>
                      <p>{formatMarketCap(selectedToken.pools[0]?.marketCap?.usd)}</p>
                    </div>
                  </div>
                </DetailCard>

                <DetailCard>
                  <h3>
                    <span>💡</span> Strategic Insights
                  </h3>
                  <div className="content">
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      <li style={{ marginBottom: '1rem' }}>
                        • <strong>Market Position:</strong> {selectedToken.events[selectedTimeRange]?.priceChangePercentage > 0 ? 
                          `Leading market momentum with sustained buying pressure and ${selectedToken.events[selectedTimeRange]?.priceChangePercentage.toFixed(2)}% growth` :
                          "Potential value zone with decreased selling pressure, suggesting possible trend reversal"}
                      </li>
                      <li style={{ marginBottom: '1rem' }}>
                        • <strong>Technical Outlook:</strong> {
                          selectedToken.events[selectedTimeRange]?.priceChangePercentage > 10 ?
                          "Strong breakout characteristics with volume confirmation" :
                          selectedToken.events[selectedTimeRange]?.priceChangePercentage > 0 ?
                          "Steady uptrend formation with healthy consolidation patterns" :
                          "Key support level testing with potential for trend reversal"
                        }
                      </li>
                      <li style={{ marginBottom: '1rem' }}>
                        • <strong>Risk Assessment:</strong> {
                          selectedToken.events[selectedTimeRange]?.volume > 1000000 ?
                          "High liquidity provides favorable entry/exit conditions" :
                          "Moderate liquidity suggests strategic position sizing"
                        }
                      </li>
                      <li>
                        • <strong>Entry Point:</strong> Current price ${selectedToken.pools[0]?.price?.usd?.toFixed(6) || '0.000000'} {
                          selectedToken.events[selectedTimeRange]?.priceChangePercentage > 0 ?
                          "with momentum-driven upside potential" :
                          "presents value opportunity"
                        }
                      </li>
                    </ul>
                  </div>
                </DetailCard>
              </DetailGrid>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default TrendingTokens; 