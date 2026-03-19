// src/components/auth/AuthForm.tsx
import React, { useState } from 'react';

const SCOPES = [
  { value: 'GIGACHAT_API_PERS', label: 'Personal' },
  { value: 'GIGACHAT_API_B2B', label: 'B2B' },
  { value: 'GIGACHAT_API_CORP', label: 'Corporate' },
];

interface AuthFormProps {
  onLogin: (credentials: string, scope: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState('');
  const [scope, setScope] = useState(SCOPES[0].value);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.trim()) {
      setError('Поле Credentials не может быть пустым');
      return;
    }
    setError('');
    onLogin(credentials, scope);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Авторизация</h2>

        {/* Credentials */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Credentials (Base64)</label>
          <input
            type="password"
            value={credentials}
            onChange={(e) => setCredentials(e.target.value)}
            className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        {/* Scope */}
        <div className="mb-4">
          <span className="block font-medium mb-1">Scope</span>
          <div className="flex flex-col space-y-1">
            {SCOPES.map((s) => (
              <label key={s.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="scope"
                  value={s.value}
                  checked={scope === s.value}
                  onChange={() => setScope(s.value)}
                  className="accent-blue-500"
                />
                <span>{s.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default AuthForm;