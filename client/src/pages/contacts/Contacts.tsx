import React from 'react';
import ContactsList from '../../components/Contacts/ContactsList';

const Contacts: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <ContactsList />
        </div>
    );
};

export default Contacts;
