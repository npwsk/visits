import React from 'react';

interface SelectProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700">{label}</label>
            <select value={value} onChange={onChange} className="w-full p-2 border border-gray-300 rounded mt-1">
                <option value="">Выберите {label.toLowerCase()}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;
