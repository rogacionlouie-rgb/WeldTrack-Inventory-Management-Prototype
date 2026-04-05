import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { StaffDashboard } from './pages/StaffDashboard';
import { SellerDashboard } from './pages/SellerDashboard';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { Inventory } from './pages/Inventory';
import { Projects } from './pages/Projects';
import { CostTracking } from './pages/CostTracking';
import { Sales } from './pages/Sales';
import { Reports } from './pages/Reports';
import { Bookings } from './pages/Bookings';
import { Layout } from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'staff', element: <StaffDashboard /> },
      { path: 'seller', element: <SellerDashboard /> },
      { path: 'customer', element: <CustomerDashboard /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'projects', element: <Projects /> },
      { path: 'cost-tracking', element: <CostTracking /> },
      { path: 'sales', element: <Sales /> },
      { path: 'reports', element: <Reports /> },
      { path: 'bookings', element: <Bookings /> },
      { path: '*', element: <Navigate to="/login" replace /> },
    ],
  },
]);
