import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Manrope:wght@200;300;400;500;600;700;800&display=swap');

  :root {
    --mint-green: #A8E6CF;
    --soft-teal: #B2F2E8;
    --vibrant-coral: #FF6F61;
    --soft-pink: #FFB3BA;
    --deep-teal: #4ECDC4;
    --space-black: #0a0a0a;
    --hot-gradient: linear-gradient(135deg, var(--soft-pink), var(--deep-teal));
    --cyber-gradient: linear-gradient(180deg, var(--space-black) 0%, #1a1a1a 100%);
    --success-glow: 0 0 10px var(--mint-green),
                    0 0 20px var(--mint-green);
    
    --neon-cyan: var(--deep-teal);
    --neon-pink: var(--vibrant-coral);
    --neon-green: var(--mint-green);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--space-black);
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  p, span, button, input, select, textarea {
    font-family: 'Inter', sans-serif;
  }

  strong {
    font-weight: 600;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--space-black);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--deep-teal);
    border-radius: 4px;
    
    &:hover {
      background: var(--vibrant-coral);
    }
  }
`;

export default GlobalStyle; 