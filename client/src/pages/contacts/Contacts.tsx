import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios'; // Используем наш новый экземпляр Axios

interface Contact {
  id: string;
  name: string;
  specialization: string;
  clinic: string;
  title: string;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <Link to="/add-contact" className="bg-light-blue text-white p-3 rounded hover:bg-dark-blue transition mb-4 inline-block">
        Add Contact
      </Link>
      <div className="mt-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Specialization</th>
              <th className="py-2 px-4 border-b">Clinic</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="py-2 px-4 border-b">{contact.name}</td>
                <td className="py-2 px-4 border-b">{contact.specialization}</td>
                <td className="py-2 px-4 border-b">{contact.clinic}</td>
                <td className="py-2 px-4 border-b">{contact.title}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/edit-contact/${contact.id}`} className="text-blue-500 hover:underline mr-2">
                    Edit
                  </Link>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
