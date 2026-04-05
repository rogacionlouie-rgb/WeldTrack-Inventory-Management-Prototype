import { Link, useLocation } from 'react-router';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Package,
  FolderKanban,
  DollarSign,
  ShoppingCart,
  FileText,
  Calendar,
  Wrench,
} from 'lucide-react';

export function Sidebar() {
  const { user } = useApp();
  const location = useLocation();

  const adminLinks = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/projects', label: 'Projects', icon: FolderKanban },
    { path: '/cost-tracking', label: 'Cost Tracking', icon: DollarSign },
    { path: '/sales', label: 'Sales', icon: ShoppingCart },
    { path: '/bookings', label: 'Bookings', icon: Calendar },
    { path: '/reports', label: 'Reports', icon: FileText },
  ];

  const staffLinks = [
    { path: '/staff', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/projects', label: 'Projects', icon: FolderKanban },
    { path: '/bookings', label: 'Bookings', icon: Calendar },
  ];

  const sellerLinks = [
    { path: '/seller', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/sales', label: 'Sales', icon: ShoppingCart },
  ];

  const customerLinks = [
    { path: '/customer', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/bookings', label: 'My Bookings', icon: Calendar },
  ];

  let links = adminLinks;
  if (user?.role === 'staff') links = staffLinks;
  if (user?.role === 'seller') links = sellerLinks;
  if (user?.role === 'customer') links = customerLinks;

  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Wrench className="w-8 h-8 text-orange-500" />
          <div>
            <h1 className="text-xl font-bold">WeldTrack</h1>
            <p className="text-xs text-slate-400">Inventory System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="text-sm text-slate-400">
          <p>Logged in as:</p>
          <p className="font-semibold text-white">{user?.name}</p>
          <p className="text-xs uppercase text-orange-400 mt-1">
            {user?.role}
          </p>
        </div>
      </div>
    </aside>
  );
}
