import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import Select from '../common/Select';
import { User } from '../../types';

const ClinicForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [clinic, setClinic] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        legalName: '',
        inn: '',
        notes: '',
        responsibleRepId: ''
    });
    const [users, setUsers] = useState([] as User[]);
    const [error, setError] = useState<string | null>(null);

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

        if (id) {
            const fetchClinic = async () => {
                try {
                    const response = await axios.get(`/clinics/${id}`);
                    setClinic(response.data);
                } catch (error) {
                    console.error('Error fetching clinic:', error);
                }
            };
            fetchClinic();
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setClinic({ ...clinic, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (id) {
                await axios.put(`/clinics/${id}`, clinic);
            } else {
                await axios.post('/clinics', clinic);
            }
            navigate('/clinics');
        } catch (error) {
            console.error('Error saving clinic:', error);
            setError('Не удалось сохранить клинику. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Редактировать Клиника' : 'Добавить Клиника'}</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700">Название</label>
                    <input
                        type="text"
                        name="name"
                        value={clinic.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Адрес</label>
                    <input
                        type="text"
                        name="address"
                        value={clinic.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Телефон</label>
                    <input
                        type="text"
                        name="phone"
                        value={clinic.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Электронная почта</label>
                    <input
                        type="email"
                        name="email"
                        value={clinic.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Юридическое название</label>
                    <input
                        type="text"
                        name="legalName"
                        value={clinic.legalName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">ИНН</label>
                    <input
                        type="text"
                        name="inn"
                        value={clinic.inn}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Заметки</label>
                    <input
                        type="text"
                        name="notes"
                        value={clinic.notes}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <Select
                    label="Ответственный представитель"
                    value={clinic.responsibleRepId}
                    onChange={handleInputChange}
                    options={users.map((user) => ({ value: user.id.toString(), label: `${user.firstName} ${user.lastName}` }))}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {id ? 'Сохранить изменения' : 'Добавить Клиника'}
                </button>
            </form>
        </div>
    );
};

export default ClinicForm;
