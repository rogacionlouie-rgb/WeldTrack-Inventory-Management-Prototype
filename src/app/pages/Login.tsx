import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Wrench, User, Lock } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      const dashboardMap = {
        admin: '/admin',
        staff: '/staff',
        seller: '/seller',
        customer: '/customer',
      };

      const role = username as keyof typeof dashboardMap;
      navigate(dashboardMap[role] || '/admin');
    } else {
      setError('Invalid credentials. Use password: "password"');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-orange-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="bg-slate-800 text-white p-12 md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="w-12 h-12 text-orange-500" />
              <div>
                <h1 className="text-3xl font-bold">WeldTrack</h1>
                <p className="text-sm text-slate-300">Inventory Management System</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6">
              Comprehensive inventory and cost tracking solution designed specifically for welding shops.
            </p>
            <div className="space-y-3 text-sm">
              <div className="bg-slate-700 rounded p-3">
                <p className="text-orange-400 font-semibold">Demo Credentials:</p>
                <p className="text-slate-300 mt-1">Admin: admin / password</p>
                <p className="text-slate-300">Staff: staff / password</p>
                <p className="text-slate-300">Seller: seller / password</p>
                <p className="text-slate-300">Customer: customer / password</p>
              </div>
            </div>
          </div>

          <div className="p-12 md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-8">Please login to your account</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
