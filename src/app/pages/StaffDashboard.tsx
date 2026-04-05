import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Package, FolderKanban, Calendar, CheckCircle } from 'lucide-react';

export function StaffDashboard() {
  const { materials, projects, bookings } = useApp();

  const ongoingProjects = projects.filter((p) => p.status === 'ongoing');
  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const todayBookings = bookings.filter((b) => b.date === '2026-04-04');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Staff Dashboard</h1>
        <p className="text-gray-600">Manage daily operations and tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Inventory Items"
          value={materials.length}
          icon={Package}
          color="blue"
        />
        <Card
          title="Active Projects"
          value={ongoingProjects.length}
          icon={FolderKanban}
          color="orange"
        />
        <Card
          title="Pending Bookings"
          value={pendingBookings.length}
          icon={Calendar}
          color="red"
        />
        <Card
          title="Today's Bookings"
          value={todayBookings.length}
          icon={CheckCircle}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Active Projects</h3>
          {ongoingProjects.length === 0 ? (
            <p className="text-gray-600">No active projects at the moment.</p>
          ) : (
            <div className="space-y-3">
              {ongoingProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <h4 className="font-semibold text-slate-800">{project.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">
                      Started: {new Date(project.startDate).toLocaleDateString()}
                    </span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Pending Bookings</h3>
          {pendingBookings.length === 0 ? (
            <p className="text-gray-600">No pending bookings.</p>
          ) : (
            <div className="space-y-3">
              {pendingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {booking.customerName}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{booking.service}</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                      {booking.status}
                    </span>
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                    <p>Time: {booking.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Inventory Updates</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Material</th>
                <th className="text-left py-2 px-4">Quantity</th>
                <th className="text-left py-2 px-4">Unit Price</th>
                <th className="text-left py-2 px-4">Date Added</th>
              </tr>
            </thead>
            <tbody>
              {materials.slice(0, 5).map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="py-3 px-4">₱{item.unitPrice.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {new Date(item.dateAdded).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
