import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import SearchInput from '../common/SearchInput';
import { Visit } from '../../types';

const VisitsList: React.FC = () => {
    const [visits, setVisits] = useState([] as Visit[]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const response = await axios.get('/visits');
                setVisits(response.data);
            } catch (error) {
                console.error('Error fetching visits:', error);
            }
        };
        fetchVisits();
    }, []);

    const filteredVisits = visits.filter(visit =>
        `${visit.user.firstName} ${visit.user.lastName} ${visit.clinic.name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Визиты</h1>
            <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Поиск по пользователю или клинике" />
            <table className="min-w-full bg-white mt-4">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Пользователь</th>
                        <th className="py-2 px-4 border-b">Клиника</th>
                        <th className="py-2 px-4 border-b">Контактное лицо</th>
                        <th className="py-2 px-4 border-b">Дата</th>
                        <th className="py-2 px-4 border-b">Статус</th>
                        <th className="py-2 px-4 border-b">Отчет</th>
                        <th className="py-2 px-4 border-b">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVisits.map((visit) => (
                        <tr key={visit.id}>
                            <td className="py-2 px-4 border-b">{visit.user.firstName} {visit.user.lastName}</td>
                            <td className="py-2 px-4 border-b">{visit.clinic.name}</td>
                            <td className="py-2 px-4 border-b">{visit.contact.firstName} {visit.contact.lastName}</td>
                            <td className="py-2 px-4 border-b">{visit.date.split('T')[0]}</td>
                            <td className="py-2 px-4 border-b">{visit.status.name}</td>
                            <td className="py-2 px-4 border-b">{visit.report}</td>
                            <td className="py-2 px-4 border-b">
                          
                                <Link to={`/visits/edit/${visit.id}`} className="text-blue-500 hover:underline">Редактировать</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/visits/add" className="bg-blue-500 text-white p-2 rounded mt-4 inline-block">Добавить Визит</Link>
        </div>
    );
};

export default VisitsList;
