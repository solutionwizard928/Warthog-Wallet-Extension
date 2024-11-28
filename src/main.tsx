import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { WalletProvider } from './context/WalletContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MemoryRouter>
      <WalletProvider>
        <App />
      </WalletProvider>
    </MemoryRouter>
  </StrictMode>
);
