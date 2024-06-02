import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Visits from './pages/Visits';
import Clinics from './pages/Clinics';
import Contacts from './pages/Contacts';
import Discounts from './pages/Discounts';
import Employees from './pages/Employees';
import Reports from './pages/Reports';
import { AuthProvider, useAuth } from './context/AuthContext';

interface PrivateRouteProps {
  element: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
              <Route path="/visits" element={<PrivateRoute element={Visits} />} />
              <Route path="/clinics" element={<PrivateRoute element={Clinics} />} />
              <Route path="/contacts" element={<PrivateRoute element={Contacts} />} />
              <Route path="/discounts" element={<PrivateRoute element={Discounts} />} />
              <Route path="/employees" element={<PrivateRoute element={Employees} />} />
              <Route path="/reports" element={<PrivateRoute element={Reports} />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
