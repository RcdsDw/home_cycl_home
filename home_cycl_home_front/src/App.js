import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/user.js';

import Auth from './containers/auth/auth.js';
import Dashboard from './containers/dashboard/dashboard.js';
import Users from './containers/users/users.js';
import MainLayout from "./MainLayout"
import NewUser from './containers/users/new.js';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/newUser" element={<NewUser />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}
