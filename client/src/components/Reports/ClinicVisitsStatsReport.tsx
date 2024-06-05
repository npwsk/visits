
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { User, Visit, UserClinicStats } from '../../types';

const REPORT_ROUTE = '/reports/clinics-by-rep';

const ClinicVisitsStatsReport: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState<UserClinicStats[]>([]);

    const fetchReport = async () => {
        try {
            const response = await axios.get(REPORT_ROUTE, {
                params: { startDate, endDate }
            });
            setReportData(response.data);
        } catch (error) {
            console.error('Error fetching report:', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Отчет по числу посещенных клиник</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Начальная дата</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Конечная дата</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>
            <button onClick={fetchReport} className="bg-blue-500 text-white p-2 rounded mb-4">Сформировать отчет</button>
            <a href={`/api/${REPORT_ROUTE}?startDate=${startDate}&endDate=${endDate}&format=excel`} download={`visits-stats-${startDate}-${endDate}.xslx`} className="bg-green-500 text-white p-2 rounded ml-4 mb-4">Скачать отчет</a>
            <table className="min-w-full bg-white mt-6">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Сотрудник</th>
                        <th className="py-2 px-4 border-b">Общее число закрепленных клиник</th>
                        <th className="py-2 px-4 border-b">Число посещенных клиник</th>
                        <th className="py-2 px-4 border-b">Число непосещенных клиник</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((data, id) => (
                        <tr key={id}>
                            <td className="py-2 px-4 border-b">{data.name}</td>
                            <td className="py-2 px-4 border-b">{data.totalClinics}</td>
                            <td className="py-2 px-4 border-b">{data.visitedClinics}</td>
                            <td className="py-2 px-4 border-b">{data.notVisitedClinics}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClinicVisitsStatsReport;
