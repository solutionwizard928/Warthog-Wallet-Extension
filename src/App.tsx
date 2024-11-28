import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Loading from './pages/loading';
import Start from './pages/startedPage';
import Intro from './pages/intro';
import ImportPage from './pages/importPage';
import RecoveryPhase from './pages/RecoveryPhase';
import ValidateIntro from './pages/validateIntro';
import Validate from './pages/validate';
import SetPassword from './pages/SetPassword';
import Home from './pages/Home';
import ActivityDetailPage from './pages/ActivityDetailPage';
import LockScreen from './pages/LockScreen';
import ReceivePage from './pages/ReceivePage';
import SendPage from './pages/SendPage';
import ManageAccounts from './pages/ManageAccounts';
import AccountDetails from './pages/AccountDetails';
import ShowPrivateKey from './pages/ShowPrivateKey';
import useWallet from './hooks/useWallet';

interface Activity {
  date: string;
  action: string;
  amount: string;
  usdAmount: string;
}

const App: React.FC = () => {
  const { seedPhrase, wallet, password } = useWallet();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const navigate = useNavigate();

  const startLoading = useCallback(() => {
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

  useEffect(() => {
    const clear = startLoading();
    return clear;
  }, [startLoading]);

  if (loading) return <Loading progress={progress} />;

  const AuthenticatedRoutes = () => (
    <Routes>
      <Route path="/home" element={<Home setSelectedActivity={setSelectedActivity} />} />
      <Route path="/activity-details" element={<ActivityDetailPage selectedActivity={selectedActivity} />} />
      <Route path="/locked" element={<LockScreen />} />
      <Route path="/" element={<LockScreen />} />
      <Route path="/receive" element={<ReceivePage />} />
      <Route path="/send" element={<SendPage />} />
      <Route path="/manage-account" element={<ManageAccounts />} />
      <Route path="/account-details" element={<AccountDetails />} />
      <Route path="/private-key" element={<ShowPrivateKey />} />
    </Routes>
  );

  const UnauthenticatedRoutes = () => (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/import" element={<ImportPage />} />
      <Route path="/recover" element={<RecoveryPhase mnemonic={seedPhrase} />} />
      <Route path="/validate" element={<Validate />} />
      <Route path="/validate-intro" element={<ValidateIntro recoveryPhrase={seedPhrase?.split(' ') || []} onGoBack={() => navigate(-2)} onComplete={() => navigate('/set-password')} />} />
      <Route path="/set-password" element={<SetPassword />} />
    </Routes>
  );

  return seedPhrase && wallet && password ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
};

export default App;
