import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import SearchInput from '../common/SearchInput';
import { Contact } from '../../types';

const ContactsList: React.FC = () => {
    const [contacts, setContacts] = useState([] as Contact[]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredContacts = contacts.filter(contact =>
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">Контактные лица</h1>
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Поиск по имени или фамилии" />
          <table className="min-w-full bg-white mt-4">
              <thead>
                  <tr>
                      <th className="py-2 px-4 border-b">Имя</th>
                      <th className="py-2 px-4 border-b">Фамилия</th>
                      <th className="py-2 px-4 border-b">Специализация</th>
                      <th className="py-2 px-4 border-b">Телефон</th>
                      <th className="py-2 px-4 border-b">Электронная почта</th>
                      <th className="py-2 px-4 border-b">Действия</th>
                  </tr>
              </thead>
              <tbody>
                  {filteredContacts.map((contact) => (
                      <tr key={contact.id}>
                          <td className="py-2 px-4 border-b">{contact.firstName}</td>
                          <td className="py-2 px-4 border-b">{contact.lastName}</td>
                          <td className="py-2 px-4 border-b">{contact.specialization}</td>
                          <td className="py-2 px-4 border-b">{contact.phone}</td>
                          <td className="py-2 px-4 border-b">{contact.email}</td>
                          <td className="py-2 px-4 border-b">
                              <Link to={`/contacts/edit/${contact.id}`} className="text-blue-500 hover:underline">Редактировать</Link>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          <Link to="/contacts/add" className="bg-blue-500 text-white p-2 rounded mt-4 inline-block">Добавить Контактное лицо</Link>
      </div>
  );
};

export default ContactsList;

