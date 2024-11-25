import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Loading from './pages/loading';
import Start from './pages/startedPage';
import Intro from './pages/intro';
import ImportPage from './pages/importPage';
import RecoveryPhase from './pages/RecoveryPhase';
import ValidateIntro from './pages/validateIntro';
import Validate from './pages/validate';
import SetPassword from './pages/SetPassword';
import Home from './pages/Home';

const App: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [seedPhrase, setSeedPhrase] = useState<string | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const navigate = useNavigate();

  const startLoading = useCallback((intervalDuration = 100, step = 2) => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + step;
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const clear = startLoading();
    return clear;
  }, [startLoading]);

  if (loading) return <Loading progress={progress} />;


  return (
    <>
      {
        seedPhrase && wallet && password ?
          <Routes>
            <Route path="/home" element={<Home wallet={wallet} />} />
          </Routes >
          :
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/intro" element={<Intro setSeedPhrase={setSeedPhrase} setWallet={setWallet} />} />
            <Route path="/import" element={<ImportPage setSeedPhrase={setSeedPhrase} setWallet={setWallet} />} />
            <Route path="/recover" element={<RecoveryPhase mnemonic={seedPhrase} />} />
            <Route path="/validate" element={<Validate />} />
            <Route path="/validate-intro" element={<ValidateIntro recoveryPhrase={seedPhrase?.split(' ') || []} onGoBack={() => navigate(-2)} onComplete={() => navigate('/set-password')} />} />
            <Route path="/set-password" element={<SetPassword setPassword={setPassword} />} />
          </Routes>

      }
    </>

  )
}
export default App;