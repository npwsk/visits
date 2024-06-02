import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';

const ContactForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        specialization: '',
        title: '',
        phone: '',
        email: ''
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchContact = async () => {
                try {
                    const response = await axios.get(`/contacts/${id}`);
                    setContact(response.data);
                } catch (error) {
                    console.error('Error fetching contact:', error);
                }
            };
            fetchContact();
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (id) {
                await axios.put(`/contacts/${id}`, contact);
            } else {
                await axios.post('/contacts', contact);
            }
            navigate('/contacts');
        } catch (error) {
            console.error('Error saving contact:', error);
            setError('Не удалось сохранить контактное лицо. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Редактировать Контактное лицо' : 'Добавить Контактное лицо'}</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700">Имя</label>
                    <input
                        type="text"
                        name="firstName"
                        value={contact.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Фамилия</label>
                    <input
                        type="text"
                        name="lastName"
                        value={contact.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Отчество</label>
                    <input
                        type="text"
                        name="middleName"
                        value={contact.middleName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Специализация</label>
                    <input
                        type="text"
                        name="specialization"
                        value={contact.specialization}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Должность</label>
                    <input
                        type="text"
                        name="title"
                        value={contact.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Телефон</label>
                    <input
                        type="text"
                        name="phone"
                        value={contact.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Электронная почта</label>
                    <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {id ? 'Сохранить изменения' : 'Добавить Контактное лицо'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
