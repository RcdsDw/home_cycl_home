import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./containers/auth/login.js";
import Register from "./containers/auth/register.js";
import Welcome from "./components/auth/welcome.js";
import NotFound from "./utils/NotFound.js";

import AdminLayout from "./AdminLayout";
import TechLayout from "./TechLayout";
import UserLayout from "./UserLayout";
import RolesRoute from "./utils/RolesRoute.js";

// Admin pages
import Dashboard from "./containers/dashboard/dashboard.js";
import Users from "./containers/users/list.js";
import NewUser from "./containers/users/new.js";
import ShowUser from "./containers/users/show.js";
import EditUser from "./containers/users/update.js";
import TypeInterventions from "./containers/typeInterventions/list.js";
import NewTypeInterventions from "./containers/typeInterventions/new.js";
import EditTypeInterventions from "./containers/typeInterventions/update.js";
import BrandsModels from "./containers/brands/list.js";
import NewBike from "./containers/bikes/new.js";
import UpdateBike from "./containers/bikes/update.js";

// Interventions (partagées)
import Interventions from "./containers/interventions/list.js";
import NewIntervention from "./containers/interventions/new.js";
import ShowIntervention from "./containers/interventions/show.js";
import EditIntervention from "./containers/interventions/update.js";

// Tech pages
import Planning from "./containers/planning/planning.js";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.roles?.[0];

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Welcome />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Admin only */}
        <Route
          element={
            <RolesRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminLayout />
            </RolesRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<NewUser />} />
          <Route path="/type_intervention" element={<TypeInterventions />} />
          <Route
            path="/type_intervention/new"
            element={<NewTypeInterventions />}
          />
          <Route
            path="/type_intervention/edit/:id"
            element={<EditTypeInterventions />}
          />
          <Route path="/brands" element={<BrandsModels />} />
        </Route>

        {/* Routes partagées Admin + Tech */}
        <Route
          element={
            <RolesRoute allowedRoles={["ROLE_ADMIN", "ROLE_TECH"]}>
              {userRole === "ROLE_ADMIN" ? <AdminLayout /> : <TechLayout />}
            </RolesRoute>
          }
        >
          <Route path="/planning" element={<Planning />} />
        </Route>

        {/* Routes partagées Admin + User */}
        <Route
          element={
            <RolesRoute allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}>
              {userRole === "ROLE_ADMIN" ? <AdminLayout /> : <UserLayout />}
            </RolesRoute>
          }
        >
          <Route path="/interventions/new" element={<NewIntervention />} />
          <Route path="/users/show/:id" element={<ShowUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/bikes/new/:ownerId" element={<NewBike />} />
          <Route path="/bikes/edit/:bikeId" element={<UpdateBike />} />
        </Route>

        {/* Routes partagées Admin + Tech + User */}
        <Route
          element={
            <RolesRoute allowedRoles={["ROLE_ADMIN", "ROLE_TECH", "ROLE_USER"]}>
              {userRole === "ROLE_ADMIN" ? (
                <AdminLayout />
              ) : userRole === "ROLE_TECH" ? (
                <TechLayout />
              ) : (
                <UserLayout />
              )}
            </RolesRoute>
          }
        >
          <Route path="/interventions" element={<Interventions />} />
          <Route
            path="/interventions/show/:id"
            element={<ShowIntervention />}
          />
          <Route
            path="/interventions/edit/:id"
            element={<EditIntervention />}
          />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
