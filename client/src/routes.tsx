import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Visits from './pages/visits/Visits';
import Clinics from './pages/clinics/Clinics';
import Contacts from './pages/contacts/Contacts';
import Employees from './pages/employees/Employees';
import Reports from './pages/reports/Reports';
import AddVisit from './pages/visits/AddVisit';
import EditVisit from './pages/visits/EditVisit';
import AddClinic from './pages/clinics/AddClinic';
import EditClinic from './pages/clinics/EditClinic';
import AddContact from './pages/contacts/AddContact';
import EditContact from './pages/contacts/EditContact';
import Profile from './pages/profile/Profile';
import Layout from './components/Layout';
import VisitsByPeriodReport from './components/Reports/VisitsByPeriodReport';
import VisitsStatsReport from './components/Reports/VisitsStatsReport';
import VisitsBySpecReport from './components/Reports/VisitsBySpecReport';
import ClinicVisitsStatsReport from './components/Reports/ClinicVisitsStatsReport';
import UnvisitedClinicsReport from './components/Reports/UnvisitedClinicsReport';

const AppRoutes: React.FC = () => {
    return (
      <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout><PrivateRoute component={<Dashboard />} /></Layout>} />
            <Route path="/visits/add" element={<Layout><PrivateRoute component={<AddVisit />} /></Layout>} />
            <Route path="/visits/edit/:id" element={<Layout><PrivateRoute component={<EditVisit />} /></Layout>} />
            <Route path="/visits" element={<Layout><PrivateRoute component={<Visits />} /></Layout>} />
            <Route path="/clinics/add" element={<Layout><PrivateRoute component={<AddClinic />} /></Layout>} />
            <Route path="/clinics/edit/:id" element={<Layout><PrivateRoute component={<EditClinic />} /></Layout>} />
            <Route path="/clinics" element={<Layout><PrivateRoute component={<Clinics />} /></Layout>} />
            <Route path="/contacts/add" element={<Layout><PrivateRoute component={<AddContact />} /></Layout>} />
            <Route path="/contacts/edit/:id" element={<Layout><PrivateRoute component={<EditContact />} /></Layout>} />
            <Route path="/contacts" element={<Layout><PrivateRoute component={<Contacts />} /></Layout>} />
            <Route path="/reports" element={<Layout><PrivateRoute component={<Reports />} /></Layout>} />
            <Route path="/reports/visits-by-period" element={<Layout><PrivateRoute component={<VisitsByPeriodReport />} /></Layout>} />
            <Route path="/reports/visits-stats" element={<Layout><PrivateRoute component={<VisitsStatsReport />} /></Layout>} />
            <Route path="/reports/visits-by-specialization" element={<Layout><PrivateRoute component={<VisitsBySpecReport />} /></Layout>} />
            <Route path="/reports/clinics-by-rep" element={<Layout><PrivateRoute component={<ClinicVisitsStatsReport />} /></Layout>} />
            <Route path="/reports/unvisited-clinics" element={<Layout><PrivateRoute component={<UnvisitedClinicsReport />} /></Layout>} />
            <Route path="/profile" element={<Layout><PrivateRoute component={<Profile />} /></Layout>} />
        </Routes>
    </Router>
    );
};

export default AppRoutes;
