import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios'; // Используем наш новый экземпляр Axios

interface Clinic {
  id: string;
  name: string;
  address: string;
  legalName: string;
  inn: string;
}

const Clinics: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get('/clinics');
        setClinics(response.data);
      } catch (error) {
        console.error('Error fetching clinics:', error);
      }
    };

    fetchClinics();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/clinics/${id}`);
      setClinics(clinics.filter((clinic) => clinic.id !== id));
    } catch (error) {
      console.error('Error deleting clinic:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Clinics</h1>
      <Link to="/add-clinic" className="bg-light-blue text-white p-3 rounded hover:bg-dark-blue transition mb-4 inline-block">
        Add Clinic
      </Link>
      <div className="mt-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Legal Name</th>
              <th className="py-2 px-4 border-b">INN</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clinics.map((clinic) => (
              <tr key={clinic.id}>
                <td className="py-2 px-4 border-b">{clinic.name}</td>
                <td className="py-2 px-4 border-b">{clinic.address}</td>
                <td className="py-2 px-4 border-b">{clinic.legalName}</td>
                <td className="py-2 px-4 border-b">{clinic.inn}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/edit-clinic/${clinic.id}`} className="text-blue-500 hover:underline mr-2">
                    Edit
                  </Link>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete(clinic.id)}>
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

export default Clinics;
