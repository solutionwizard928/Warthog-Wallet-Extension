import { Routes, Route } from 'react-router-dom';
import Loading from './pages/loading';
import Start from './pages/startedPage';
import Intro from './pages/intro';
import { useEffect, useState } from "react";
import ImportPage from './pages/importpage';
import RecoveryPhase from './pages/RecoveryPhase';
import ValidateIntro from './pages/validateIntro';

function App() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loading progress={progress} />;

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/import" element={<ImportPage />} />
      <Route path="/recover" element={<RecoveryPhase />} />
      <Route path='/validate' element={<ValidateIntro />} />
    </Routes>
  );
}

export default App;