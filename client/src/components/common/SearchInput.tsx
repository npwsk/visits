import React from 'react';

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder || 'Поиск...'}
                className="w-full p-2 border border-gray-300 rounded"
            />
        </div>
    );
};

export default SearchInput;
