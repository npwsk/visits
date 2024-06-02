import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios'; // Используем наш новый экземпляр Axios

const EditClinic: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formClinic, setFormClinic] = useState({ name: '', address: '', legalName: '', inn: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const response = await axios.get(`/clinics/${id}`);
        setFormClinic(response.data);
      } catch (error) {
        console.error('Error fetching clinic:', error);
      }
    };

    fetchClinic();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormClinic({ ...formClinic, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/clinics/${id}`, formClinic);
      navigate('/clinics');
    } catch (error) {
      console.error('Error updating clinic:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Clinic</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formClinic.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formClinic.address}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Legal Name</label>
          <input
            type="text"
            name="legalName"
            value={formClinic.legalName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">INN</label>
          <input
            type="text"
            name="inn"
            value={formClinic.inn}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Clinic
        </button>
      </form>
    </div>
  );
};

export default EditClinic;
