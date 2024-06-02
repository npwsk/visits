import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import SearchInput from '../common/SearchInput';
import { Clinic } from '../../types';

const ClinicsList: React.FC = () => {
    const [clinics, setClinics] = useState([] as Clinic[]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await axios.get('/clinics');
                setClinics(response.data);
            } catch (error) {
                console.error('Error fetching clinics:', error);
            }
        };
        fetchClinics();
    }, []);

    const filteredClinics = clinics.filter(clinic =>
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Клиники</h1>
            <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Поиск по названию клиники" />
            <table className="min-w-full bg-white mt-4">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Название</th>
                        <th className="py-2 px-4 border-b">Адрес</th>
                        <th className="py-2 px-4 border-b">Телефон</th>
                        <th className="py-2 px-4 border-b">Электронная почта</th>
                        <th className="py-2 px-4 border-b">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClinics.map((clinic) => (
                        <tr key={clinic.id}>
                            <td className="py-2 px-4 border-b">{clinic.name}</td>
                            <td className="py-2 px-4 border-b">{clinic.address}</td>
                            <td className="py-2 px-4 border-b">{clinic.phone}</td>
                            <td className="py-2 px-4 border-b">{clinic.email}</td>
                            <td className="py-2 px-4 border-b">
                                <Link to={`/clinics/edit/${clinic.id}`} className="text-blue-500 hover:underline">Редактировать</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/clinics/add" className="bg-blue-500 text-white p-2 rounded mt-4 inline-block">Добавить Клиника</Link>
        </div>
    );
};

export default ClinicsList;
