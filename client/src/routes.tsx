import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Visits from './pages/visits/Visits';
import Clinics from './pages/clinics/Clinics';
import Contacts from './pages/contacts/Contacts';
import Discounts from './pages/discounts/Discounts';
import Employees from './pages/employees/Employees';
import Reports from './pages/reports/Reports';
import AddVisit from './pages/visits/AddVisit';
import EditVisit from './pages/visits/EditVisit';
import AddClinic from './pages/clinics/AddClinic';
import EditClinic from './pages/clinics/EditClinic';
import AddContact from './pages/contacts/AddContact';
import EditContact from './pages/contacts/EditContact';
import Profile from './pages/profile/Profile';

const AppRoutes: React.FC = () => {
    return (
      <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute component={<Dashboard />} />} />
            <Route path="/visits/add" element={<PrivateRoute component={<AddVisit />} />} />
            <Route path="/visits/edit/:id" element={<PrivateRoute component={<EditVisit />} />} />
            <Route path="/visits" element={<PrivateRoute component={<Visits />} />} />
            <Route path="/clinics/add" element={<PrivateRoute component={<AddClinic />} />} />
            <Route path="/clinics/edit/:id" element={<PrivateRoute component={<EditClinic />} />} />
            <Route path="/clinics" element={<PrivateRoute component={<Clinics />} />} />
            <Route path="/contacts/add" element={<PrivateRoute component={<AddContact />} />} />
            <Route path="/contacts/edit/:id" element={<PrivateRoute component={<EditContact />} />} />
            <Route path="/contacts" element={<PrivateRoute component={<Contacts />} />} />
            <Route path="/reports" element={<PrivateRoute component={<Reports />} />} />
            <Route path="/profile" element={<PrivateRoute component={<Profile />} />} />
        </Routes>
    </Router>
    );
};

export default AppRoutes;
