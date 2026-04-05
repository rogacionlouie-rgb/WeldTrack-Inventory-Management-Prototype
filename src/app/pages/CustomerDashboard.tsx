import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

export function CustomerDashboard() {
  const { bookings, user } = useApp();

  const myBookings = bookings.filter((b) => b.customerId === user?.id);
  const pendingBookings = myBookings.filter((b) => b.status === 'pending');
  const confirmedBookings = myBookings.filter((b) => b.status === 'confirmed');
  const completedBookings = myBookings.filter((b) => b.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Customer Dashboard</h1>
        <p className="text-gray-600">Manage your bookings and appointments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Bookings"
          value={myBookings.length}
          icon={Calendar}
          color="blue"
        />
        <Card
          title="Pending"
          value={pendingBookings.length}
          icon={Clock}
          color="orange"
        />
        <Card
          title="Confirmed"
          value={confirmedBookings.length}
          icon={CheckCircle}
          color="green"
        />
        <Card
          title="Completed"
          value={completedBookings.length}
          icon={CheckCircle}
          color="blue"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">My Bookings</h3>
        {myBookings.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">You don't have any bookings yet.</p>
            <p className="text-sm text-gray-500 mt-2">
              Create a new booking from the Bookings page.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {myBookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 text-lg">
                      {booking.service}
                    </h4>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.date).toLocaleDateString('en-PH', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {booking.time}
                      </p>
                    </div>
                    {booking.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">
                        Note: {booking.notes}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Need Welding Services?</h3>
        <p className="mb-4 text-orange-100">
          Book an appointment with our expert welders for your custom projects.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold">Custom Fabrication</p>
            <p className="text-orange-100">Gates, railings, and more</p>
          </div>
          <div>
            <p className="font-semibold">Repair Services</p>
            <p className="text-orange-100">Metal repair and restoration</p>
          </div>
          <div>
            <p className="font-semibold">Consultation</p>
            <p className="text-orange-100">Expert advice for your projects</p>
          </div>
        </div>
      </div>
    </div>
  );
}
