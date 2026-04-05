import { Outlet, Navigate, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useEffect } from 'react';

export function Layout() {
  const { user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const dashboardMap = {
        admin: '/admin',
        staff: '/staff',
        seller: '/seller',
        customer: '/customer',
      };

      if (window.location.pathname === '/') {
        navigate(dashboardMap[user.role]);
      }
    }
  }, [user, navigate]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
