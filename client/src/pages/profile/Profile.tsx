import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { useAuth } from '../../hooks/useAuth';

const Profile: React.FC = () => {
    const { user, setUser } = useAuth();
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setProfile({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: ''
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.put(`/users/${user?.id}`, profile);
            setUser(response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Не удалось обновить профиль. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Профиль</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700">Имя</label>
                    <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Фамилия</label>
                    <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Электронная почта</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Пароль</label>
                    <input
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Обновить профиль
                </button>
            </form>
        </div>
    );
};

export default Profile;
