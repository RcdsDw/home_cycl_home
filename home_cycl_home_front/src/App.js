import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/user.js';

import Auth from './containers/auth/auth.js';
import Dashboard from './containers/dashboard/dashboard.js';
import Users from './containers/lists/users.js';
import MainLayout from "./MainLayout"

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}
