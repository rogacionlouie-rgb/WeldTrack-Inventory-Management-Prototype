import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import {
  Package,
  AlertTriangle,
  DollarSign,
  FolderKanban,
  TrendingUp,
  ShoppingCart,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function AdminDashboard() {
  const { materials, projects, transactions } = useApp();

  const lowStockItems = materials.filter((m) => m.quantity <= m.lowStockThreshold);
  const ongoingProjects = projects.filter((p) => p.status === 'ongoing');
  const totalExpenses = transactions
    .filter((t) => t.type === 'purchase')
    .reduce((sum, t) => sum + t.total, 0);
  const totalSales = transactions
    .filter((t) => t.type === 'sale')
    .reduce((sum, t) => sum + t.total, 0);

  const inventoryData = materials.slice(0, 5).map((m) => ({
    id: m.id,
    name: m.name.substring(0, 15) + (m.name.length > 15 ? '...' : ''),
    quantity: m.quantity,
    threshold: m.lowStockThreshold,
  }));

  const projectCostData = projects.map((p) => ({
    id: p.id,
    name: p.name.substring(0, 20) + (p.name.length > 20 ? '...' : ''),
    cost: p.totalCost,
  }));

  const salesData = [
    { month: 'Jan', sales: 45000 },
    { month: 'Feb', sales: 52000 },
    { month: 'Mar', sales: 61000 },
    { month: 'Apr', sales: totalSales },
  ];

  const expenseCategories = [
    { name: 'Materials', value: totalExpenses * 0.6 },
    { name: 'Labor', value: totalExpenses * 0.3 },
    { name: 'Misc', value: totalExpenses * 0.1 },
  ];

  const COLORS = ['#3b82f6', '#f97316', '#10b981'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your welding shop operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Inventory Items"
          value={materials.length}
          icon={Package}
          color="blue"
        />
        <Card
          title="Low Stock Alerts"
          value={lowStockItems.length}
          icon={AlertTriangle}
          color="red"
          subtitle={lowStockItems.length > 0 ? 'Requires attention' : 'All good'}
        />
        <Card
          title="Active Projects"
          value={ongoingProjects.length}
          icon={FolderKanban}
          color="orange"
        />
        <Card
          title="Total Sales"
          value={`₱${totalSales.toLocaleString()}`}
          icon={TrendingUp}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Inventory Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#3b82f6" name="Current Stock" key="quantity-bar" />
              <Bar dataKey="threshold" fill="#ef4444" name="Low Stock Threshold" key="threshold-bar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} name="Sales (₱)" key="sales-line" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Project Costs</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectCostData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
              <Bar dataKey="cost" fill="#f97316" name="Total Cost (₱)" key="cost-bar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Expense Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ₱${entry.value.toLocaleString()}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                key="expense-pie"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`expense-cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Low Stock Alerts
        </h3>
        {lowStockItems.length === 0 ? (
          <p className="text-gray-600">All materials are adequately stocked.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Material</th>
                  <th className="text-left py-2 px-4">Current Stock</th>
                  <th className="text-left py-2 px-4">Threshold</th>
                  <th className="text-left py-2 px-4">Supplier</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">
                      <span className="text-red-600 font-semibold">
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.lowStockThreshold} {item.unit}</td>
                    <td className="py-3 px-4">{item.supplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
