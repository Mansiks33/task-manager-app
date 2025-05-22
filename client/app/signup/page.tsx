'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      router.push('/login');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-600">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded text-gray-700" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded text-gray-700" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded text-gray-700" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer">Create Account</button>
      </form>
    </div>
  );
}
