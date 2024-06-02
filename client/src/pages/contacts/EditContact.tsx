import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios'; // Используем наш новый экземпляр Axios

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formContact, setFormContact] = useState({ name: '', specialization: '', clinic: '', title: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`/contacts/${id}`);
        setFormContact(response.data);
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };

    fetchContact();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormContact({ ...formContact, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/contacts/${id}`, formContact);
      navigate('/contacts');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formContact.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formContact.specialization}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Clinic</label>
          <input
            type="text"
            name="clinic"
            value={formContact.clinic}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formContact.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default EditContact;
