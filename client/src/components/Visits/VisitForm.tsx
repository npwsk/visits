import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import Select from '../common/Select';
import { Clinic, Contact, Status } from '../../types';

const VisitForm: React.FC<{ visitId?: string }> = ({ visitId }) => {
    const navigate = useNavigate();
    const [visit, setVisit] = useState({
        date: '',
        startTime: '',
        endTime: '',
        report: '',
        statusId: '',
        userId: '',
        contactId: '',
        clinicId: ''
    });
    const [clinics, setClinics] = useState([] as Clinic[]);
    const [contacts, setContacts] = useState([] as Contact[]);
    const [statuses, setStatuses] = useState([] as Status[]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState<string | null>(null);

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

        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchClinics();
        fetchStatuses();
        fetchUsers();

        if (visitId) {
            const fetchVisit = async () => {
                try {
                    const response = await axios.get(`/visits/${visitId}`);
                    setVisit(response.data);
                    if (response.data.clinicId) {
                        const contactsResponse = await axios.get(`/contacts/by-clinic/${response.data.clinicId}`);
                        setContacts(contactsResponse.data);
                    }
                } catch (error) {
                    console.error('Error fetching visit:', error);
                }
            };
            fetchVisit();
        }
    }, [visitId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVisit({ ...visit, [name]: value });
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
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Время начала</label>
                    <input
                        type="time"
                        name="startTime"
                        value={visit.startTime}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Время окончания</label>
                    <input
                        type="time"
                        name="endTime"
                        value={visit.endTime}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <Select
                    label="Клиника"
                    value={visit.clinicId}
                    onChange={handleClinicChange}
                    options={clinics.map((clinic) => ({ value: clinic.id.toString(), label: clinic.name }))}
                />
                <Select
                    label="Контактное лицо"
                    value={visit.contactId}
                    onChange={handleInputChange}
                    options={contacts.map((contact) => ({ value: contact.id.toString(), label: `${contact.firstName} ${contact.lastName}` }))}
                />
                <Select
                    label="Статус"
                    value={visit.statusId}
                    onChange={handleInputChange}
                    options={statuses.map((status) => ({ value: status.id.toString(), label: status.name }))}
                />
                <div className="mb-4">
                    <label className="block text-gray-700">Отчет</label>
                    <textarea
                        name="report"
                        value={visit.report}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {visitId ? 'Сохранить изменения' : 'Добавить Визит'}
                </button>
            </form>
        </div>
    );
};

export default VisitForm;
