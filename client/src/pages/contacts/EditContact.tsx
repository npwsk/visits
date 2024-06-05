import React from 'react';
import ContactForm from '../../components/Contacts/ContactForm';
import { useParams } from 'react-router-dom';

const EditContact: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div className="container mx-auto p-8">
            <ContactForm id={id} />
        </div>
    );
};

export default EditContact;
