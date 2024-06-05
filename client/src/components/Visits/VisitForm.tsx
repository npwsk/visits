import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import Select from '../common/Select';
import { Clinic, Contact, Status } from '../../types';

const VisitForm: React.FC<{ visitId?: string }> = ({ visitId }) => {
    const navigate = useNavigate();
    const [visit, setVisit] = useState({
        date: '',
        time: '',
        goal: '',
        clinicId: '',
        contactId: '',
        report: '',
        success: false
    });
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(true);

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await axios.get('/clinics/by-user');
                setClinics(response.data);
            } catch (error) {
                console.error('Error fetching clinics:', error);
            }
        };

        const fetchStatuses = async () => {
            try {
                const response = await axios.get('/statuses');
                setStatuses(response.data);
            } catch (error) {
                console.error('Error fetching statuses:', error);
            }
        };

        fetchClinics();
        fetchStatuses();

        if (visitId) {
            const fetchVisit = async () => {
                try {
                    const response = await axios.get(`/visits/${visitId}`);
                    const { startTime, ...rest } = response.data;
                    const [date, time] = new Date(startTime).toISOString().split('T');
                    setVisit({ ...rest, date, time: time.substring(0, 5) });
                    setIsEditing(new Date(startTime) > new Date());
                } catch (error) {
                    console.error('Error fetching visit:', error);
                }
            };
            fetchVisit();
        }
    }, [visitId]);

    useEffect(() => {
        if (visit.clinicId) {
            const fetchContacts = async () => {
                try {
                    const response = await axios.get(`/contacts/by-clinic/${visit.clinicId}`);
                    setContacts(response.data);
                } catch (error) {
                    console.error('Error fetching contacts:', error);
                }
            };
            fetchContacts();
        }
    }, [visit.clinicId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setVisit({ ...visit, [name]: type === 'checkbox' ? checked : value });
    };

    const handleClinicChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVisit({ ...visit, [name]: value });
        try {
            const response = await axios.get(`/contacts/by-clinic/${value}`);
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (visitId) {
                await axios.put(`/visits/${visitId}`, visit);
            } else {
                await axios.post('/visits', visit);
            }
            navigate('/visits');
        } catch (error) {
            console.error('Error saving visit:', error);
            setError('Не удалось сохранить визит. Пожалуйста, попробуйте еще раз.');
        }
    };
    const handleMarkAsMissed = async () => {
        setError(null);
        try {
            await axios.put(`/visits/${visitId}/status`, {
                statusId: statuses.find(status => status.name === 'Не состоялся')?.id,
            });
            navigate('/visits');
        } catch (error) {
            console.error('Error marking visit as missed:', error);
            setError('Не удалось отметить визит как несостоявшийся. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">{visitId ? 'Редактировать Визит' : 'Добавить Визит'}</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700">Дата</label>
                    <input
                        type="date"
                        name="date"
                        value={visit.date}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        disabled={!isEditing}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Время начала</label>
                    <input
                        type="time"
                        name="time"
                        value={visit.time}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        disabled={!isEditing}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Клиника</label>
                    <select
                        name="clinicId"
                        value={visit.clinicId}
                        onChange={handleClinicChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        disabled={!isEditing}
                    >
                        <option value="">Выберите клинику</option>
                        {clinics.map((clinic) => (
                            <option key={clinic.id} value={clinic.id}>
                                {clinic.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Контактное лицо</label>
                    <select
                        name="contactId"
                        value={visit.contactId}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        disabled={!isEditing}
                    >
                        <option value="">Выберите контактное лицо</option>
                        {contacts.map((contact) => (
                            <option key={contact.id} value={contact.id}>
                                {contact.firstName} {contact.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Цель</label>
                    <input
                        type="text"
                        name="goal"
                        value={visit.goal}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        disabled={!isEditing}
                    />
                </div>
                {!isEditing && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700">Отчет</label>
                            <textarea
                                name="report"
                                value={visit.report}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Успешность</label>
                            <input
                                type="checkbox"
                                name="success"
                                checked={visit.success}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            Визит был успешным
                        </div>
                    </>
                )}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {visitId ? 'Сохранить изменения' : 'Добавить Визит'}
                </button>
                {!isEditing && (
                    <button type="button" onClick={handleMarkAsMissed} className="bg-red-500 text-white p-2 rounded ml-4">
                        Отметить как несостоявшийся
                    </button>
                )}
            </form>
        </div>
    );
};

export default VisitForm;

