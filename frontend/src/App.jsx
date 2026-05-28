import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import DashboardPage from "./pages/dashboard/DashboardPage";

import MonitorsPage from "./pages/monitor/MonitorsPage";
import MonitorDetailsPage from "./pages/monitor/MonitorDetailsPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import IncidentsPage from "./pages/incidents/IncidentsPage";
import StatusPage
from "./pages/status/StatusPage";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/monitors"
          element={
            <ProtectedRoute>
              <MonitorsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/monitors/:id"
          element={
            <ProtectedRoute>
              <MonitorDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incidents"
          element={
            <ProtectedRoute>
              <IncidentsPage />
            </ProtectedRoute>
          }
        />
        <Route
        path="/status"
        element={<StatusPage />}
      />

      </Routes>

    </BrowserRouter>
  );
}

export default App;