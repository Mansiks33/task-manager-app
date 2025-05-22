'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center rounded">
      <h1 className="text-xl font-semibold">Task Manager</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
}
