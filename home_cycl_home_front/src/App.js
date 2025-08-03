import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './containers/auth/login.js';
import Register from './containers/auth/register.js';
import Dashboard from './containers/dashboard/dashboard.js';
import Users from './containers/users/list.js';
import MainLayout from "./MainLayout"
import NewUser from './containers/users/new.js';
import ShowUser from './containers/users/show.js';
import Planning from './containers/planning/planning.js';
import EditUser from './containers/users/update.js';
import NewIntervention from './containers/interventions/new.js';
import Interventions from './containers/interventions/list.js';
import ShowIntervention from './containers/interventions/show.js';
import EditIntervention from './containers/interventions/update.js';
import TypeInterventions from './containers/typeInterventions/list.js';
import NewTypeInterventions from './containers/typeInterventions/new.js';
import EditTypeInterventions from './containers/typeInterventions/update.js';
import NewBike from './containers/bikes/new.js';
import UpdateBike from './containers/bikes/update.js';
import Welcome from './components/auth/welcome.js';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<NewUser />} />
          <Route path="/users/show/:id" element={<ShowUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/interventions" element={<Interventions />} />
          <Route path="/interventions/new" element={<NewIntervention />} />
          <Route path="/interventions/show/:id" element={<ShowIntervention />} />
          <Route path="/interventions/edit/:id" element={<EditIntervention />} />
          <Route path="/type_intervention" element={<TypeInterventions />} />
          <Route path="/type_intervention/new" element={<NewTypeInterventions />} />
          <Route path="/type_intervention/edit/:id" element={<EditTypeInterventions />} />
          <Route path="/bikes/new/:ownerId" element={<NewBike />} />
          <Route path="/bikes/edit/:bikeId" element={<UpdateBike />} />
        </Route>
      </Routes>
    </Router>
  );
}
