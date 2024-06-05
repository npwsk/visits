import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Select from '../common/Select';
import SearchInput from '../common/SearchInput';
import { Clinic, User, Visit } from '../../types';
import { formatClinic, formatContact, formatDate, formatUser } from '../../utils/format';

const REPORT_ROUTE = '/reports/unvisited-clinics';

const UnvisitedClinicsReport: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userId, setUserId] = useState('');
    const [reportData, setReportData] = useState<Clinic[]>([]);
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
            const response = await axios.get(REPORT_ROUTE, {
                params: { startDate, endDate, userId }
            });
            setReportData(response.data);
        } catch (error) {
            console.error('Error fetching report:', error);
        }
    };

    const filteredReportData = reportData.filter(clinic =>
        `${clinic.name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Отчет по непосещенным клиникам</h1>
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
            <button onClick={fetchReport} className="bg-blue-500 text-white p-2 rounded mb-4">Сформировать отчет</button>
            <a href={`/api${REPORT_ROUTE}?startDate=${startDate}&endDate=${endDate}&userId=${userId}&format=excel`} download={`visits-report-${startDate}-${endDate}.xslx`} className="bg-green-500 text-white p-2 rounded ml-4 mb-4">Скачать отчет</a>
            <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Поиск по названию клиники" />
            <table className="min-w-full bg-white mt-6">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Название клиники</th>
                        <th className="py-2 px-4 border-b">Адрес</th>
                        <th className="py-2 px-4 border-b">Телефон</th>
                        <th className="py-2 px-4 border-b">email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReportData.map((clinic) => (
                        <tr key={clinic.id}>
                            <td className="py-2 px-4 border-b">{clinic.name}</td>
                            <td className="py-2 px-4 border-b">{clinic.address}</td>
                            <td className="py-2 px-4 border-b">{clinic.phone}</td>
                            <td className="py-2 px-4 border-b">{clinic.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UnvisitedClinicsReport;
