import React from 'react';
import ClinicForm from '../../components/Clinics/ClinicForm';
import { useParams } from 'react-router-dom';

const EditClinic: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div className="container mx-auto p-8">
            <ClinicForm id={id} />
        </div>
    );
};

export default EditClinic;
