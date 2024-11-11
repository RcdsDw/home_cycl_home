import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './containers/auth/auth';
import Dashboard from './containers/dashboard/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
