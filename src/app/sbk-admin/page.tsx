'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const getStoredToken = (): string => {
    const stored = localStorage.getItem("tokenData");
    if (!stored) return "";

    const parsed = JSON.parse(stored);
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem("tokenData");
      return "";
    }

    return parsed.token;
  };
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(getStoredToken());
  if (token) {
      router.push('/sbk-admin/dashboard');
  }

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLogin(true);
    setError('');

    try {
      const res = await fetch('/api/generate-jwt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        const tokenData = {
          token: data.token,
          expiresAt: Date.now() + 60 * 60 * 1000,
        };
        localStorage.setItem('tokenData', JSON.stringify(tokenData));
        setToken(data.token);
        router.push('/sbk-admin/dashboard');
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch {
      setError('Error de red');
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Panel SBK Admin</h1>
      <form onSubmit={login} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
        >
          {loadingLogin ? 'Entrando...' : 'Entrar'}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}