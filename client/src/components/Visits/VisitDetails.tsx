import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';

const VisitDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [visit, setVisit] = useState<any>(null);

    useEffect(() => {
        const fetchVisit = async () => {
            try {
                const response = await axios.get(`/visits/${id}`);
                setVisit(response.data);
            } catch (error) {
                console.error('Error fetching visit details:', error);
            }
        };
        fetchVisit();
    }, [id]);

    if (!visit) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Детали визита</h1>
            <div className="mb-4">
                <strong>Пользователь:</strong> {visit.user.firstName} {visit.user.lastName}
            </div>
            <div className="mb-4">
                <strong>Клиника:</strong> {visit.clinic.name}
            </div>
            <div className="mb-4">
                <strong>Контактное лицо:</strong> {visit.contact.firstName} {visit.contact.lastName}
            </div>
            <div className="mb-4">
                <strong>Дата:</strong> {new Date(visit.date).toLocaleDateString()}
            </div>
            <div className="mb-4">
                <strong>Время начала:</strong> {new Date(visit.startTime).toLocaleTimeString()}
            </div>
            <div className="mb-4">
                <strong>Время окончания:</strong> {new Date(visit.endTime).toLocaleTimeString()}
            </div>
            <div className="mb-4">
                <strong>Статус:</strong> {visit.status.name}
            </div>
            <div className="mb-4">
                <strong>Отчет:</strong> {visit.report}
            </div>
        </div>
    );
};

export default VisitDetails;
