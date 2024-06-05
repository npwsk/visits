import React from 'react';
import { Link } from 'react-router-dom';

const Reports: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Отчеты</h1>
            <div className="mb-4">
                <Link to="/reports/visits-stats" className="bg-blue-500 text-white p-2 rounded inline-block">Отчет по числу визитов за период</Link>
            </div>
            <div className="mb-4">
                <Link to="/reports/visits-by-period" className="bg-blue-500 text-white p-2 rounded inline-block">Отчет по визитам за период</Link>
            </div>
            <div className="mb-4">
                <Link to="/reports/visits-by-specialization" className="bg-blue-500 text-white p-2 rounded inline-block">Отчет по числу визитов к специалистам</Link>
            </div>
            <div className="mb-4">
                <Link to="/reports/clinics-by-rep" className="bg-blue-500 text-white p-2 rounded inline-block">Отчет по числу посещенных клиник</Link>
            </div>
            <div className="mb-4">
                <Link to="/reports/unvisited-clinics" className="bg-blue-500 text-white p-2 rounded inline-block">Отчет по непосещенным клиникам</Link>
            </div>
        </div>
    );
};

export default Reports;
