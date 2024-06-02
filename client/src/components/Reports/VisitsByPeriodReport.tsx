import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Select from '../common/Select';
import SearchInput from '../common/SearchInput';
import { User, VisitsReportData } from '../../types';

const VisitsByPeriodReport: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userId, setUserId] = useState('');
    const [reportData, setReportData] = useState([] as );
    const [users, setUsers] = useState([] as User[]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const fetchReport = async () => {
        try {
            const response = await axios.get('/reports/visits-by-period', {
                params: { startDate, endDate, userId }
            });
            setReportData(response.data);
        } catch (error) {
            console.error('Error fetching report:', error);
        }
    };

    const downloadReport = () => {
        window.location.href = `/reports/visits-by-period?startDate=${startDate}&endDate=${endDate}&userId=${userId}`;
    };

    const filteredReportData = reportData.filter(visit =>
        `${visit.user} ${visit.clinic}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Отчет по визитам за период</h1>
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
            <Select
                label="Сотрудник"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                options={users.map((user) => ({ value: user.id.toString(), label: `${user.firstName} ${user.lastName}` }))}
            />
            <button onClick={fetchReport} className="bg-blue-500 text-white p-2 rounded">Сформировать отчет</button>
            <button onClick={downloadReport} className="bg-green-500 text-white p-2 rounded ml-4">Скачать отчет</button>
            <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Поиск по пользователю или клинике" />
            <table className="min-w-full bg-white mt-6">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Пользователь</th>
                        <th className="py-2 px-4 border-b">Клиника</th>
                        <th className="py-2 px-4 border-b">Контактное лицо</th>
                        <th className="py-2 px-4 border-b">Дата</th>
                        <th className="py-2 px-4 border-b">Статус</th>
                        <th className="py-2 px-4 border-b">Отчет</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReportData.map((visit) => (
                        <tr key={visit.id}>
                            <td className="py-2 px-4 border-b">{visit.user}</td>
                            <td className="py-2 px-4 border-b">{visit.clinic}</td>
                            <td className="py-2 px-4 border-b">{visit.contact}</td>
                            <td className="py-2 px-4 border-b">{visit.date}</td>
                            <td className="py-2 px-4 border-b">{visit.status}</td>
                            <td className="py-2 px-4 border-b">{visit.report}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VisitsByPeriodReport;
