import React from 'react';
import VisitForm from '../../components/Visits/VisitForm';
import { useParams } from 'react-router-dom';

const EditVisit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div className="container mx-auto p-8">
            <VisitForm visitId={id} />
        </div>
    );
};

export default EditVisit;
