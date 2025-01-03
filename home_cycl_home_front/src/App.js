import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/user.js';

import Auth from './containers/auth/auth.js';
import Dashboard from './containers/dashboard/dashboard.js';
import Users from './containers/users/users.js';
import MainLayout from "./MainLayout"
import NewUser from './containers/users/new.js';
import ShowUser from './containers/users/show.js';
import Planning from './containers/planning/planning.js';
import EditUser from './containers/users/update.js';
import NewIntervention from './containers/interventions/new.js';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/new" element={<NewUser />} />
            <Route path="/user/show/:id" element={<ShowUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/interventions" element={<NewIntervention />} />
            <Route path="/interventions/new" element={<NewIntervention />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}
