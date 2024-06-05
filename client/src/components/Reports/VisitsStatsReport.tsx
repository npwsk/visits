
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { User, Visit, UserVisitStats } from '../../types';

const REPORT_ROUTE = '/reports/visits-stats';

const VisitsStatsReport: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState<UserVisitStats[]>([]);

    const fetchReport = async () => {
        try {
            const response = await axios.get(REPORT_ROUTE, {
                params: { startDate, endDate }
            });
            setReportData(Object.values(response.data));
        } catch (error) {
            console.error('Error fetching report:', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Отчет по числу визитов за период</h1>
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
                        <th className="py-2 px-4 border-b">Общее количество визитов</th>
                        <th className="py-2 px-4 border-b">Количество успешных визитов</th>
                        <th className="py-2 px-4 border-b">Количество первичных визитов для клиники</th>
                        <th className="py-2 px-4 border-b">Количество первичных визитов для доктора</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((data, id) => (
                        <tr key={id}>
                            <td className="py-2 px-4 border-b">{data.userName}</td>
                            <td className="py-2 px-4 border-b">{data.totalVisits}</td>
                            <td className="py-2 px-4 border-b">{data.successfulVisits}</td>
                            <td className="py-2 px-4 border-b">{data.primaryVisitsForClinic}</td>
                            <td className="py-2 px-4 border-b">{data.primaryVisitsForDoctor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VisitsStatsReport;
