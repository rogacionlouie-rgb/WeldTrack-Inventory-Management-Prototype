import { useApp } from '../context/AppContext';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function CostTracking() {
  const { projects, transactions } = useApp();

  const totalMaterialCosts = projects.reduce((sum, p) => {
    const materialCost = p.materials.reduce((mSum, m) => mSum + m.cost, 0);
    return sum + materialCost;
  }, 0);

  const totalLaborCosts = projects.reduce((sum, p) => sum + p.laborCost, 0);
  const totalMiscCosts = projects.reduce((sum, p) => sum + p.miscCost, 0);
  const totalProjectCosts = projects.reduce((sum, p) => sum + p.totalCost, 0);

  const purchases = transactions.filter((t) => t.type === 'purchase');
  const totalPurchases = purchases.reduce((sum, t) => sum + t.total, 0);

  const costBreakdown = [
    { category: 'Materials', amount: totalMaterialCosts, color: '#3b82f6' },
    { category: 'Labor', amount: totalLaborCosts, color: '#f97316' },
    { category: 'Miscellaneous', amount: totalMiscCosts, color: '#10b981' },
  ];

  const projectCostData = projects.map((p) => ({
    id: p.id,
    name: p.name.substring(0, 20),
    materials: p.materials.reduce((sum, m) => sum + m.cost, 0),
    labor: p.laborCost,
    misc: p.miscCost,
    total: p.totalCost,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Cost Tracking</h1>
        <p className="text-gray-600">Monitor expenses and project costs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Project Costs</p>
              <p className="text-3xl font-bold text-slate-800">
                ₱{totalProjectCosts.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Material Costs</p>
              <p className="text-3xl font-bold text-slate-800">
                ₱{totalMaterialCosts.toLocaleString()}
              </p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Labor Costs</p>
              <p className="text-3xl font-bold text-slate-800">
                ₱{totalLaborCosts.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Purchases</p>
              <p className="text-3xl font-bold text-slate-800">
                ₱{totalPurchases.toLocaleString()}
              </p>
            </div>
            <div className="bg-red-500 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Cost Breakdown</h3>
          <div className="space-y-4">
            {costBreakdown.map((item) => {
              const percentage = (item.amount / totalProjectCosts) * 100;
              return (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {item.category}
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      ₱{item.amount.toLocaleString()} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Recent Purchase Transactions
          </h3>
          {purchases.length === 0 ? (
            <p className="text-gray-600">No purchase transactions recorded.</p>
          ) : (
            <div className="space-y-3">
              {purchases.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium text-gray-800">Purchase</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-bold text-red-600">
                    -₱{transaction.total.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Project Cost Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={projectCostData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis />
            <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
            <Legend />
            <Bar dataKey="materials" stackId="a" fill="#3b82f6" name="Materials (₱)" key="materials-bar" />
            <Bar dataKey="labor" stackId="a" fill="#f97316" name="Labor (₱)" key="labor-bar" />
            <Bar dataKey="misc" stackId="a" fill="#10b981" name="Misc (₱)" key="misc-bar" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Project Cost Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="text-left py-3 px-4">Project</th>
                <th className="text-left py-3 px-4">Materials</th>
                <th className="text-left py-3 px-4">Labor</th>
                <th className="text-left py-3 px-4">Misc</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const materialCost = project.materials.reduce(
                  (sum, m) => sum + m.cost,
                  0
                );
                return (
                  <tr key={project.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{project.name}</td>
                    <td className="py-3 px-4">₱{materialCost.toLocaleString()}</td>
                    <td className="py-3 px-4">₱{project.laborCost.toLocaleString()}</td>
                    <td className="py-3 px-4">₱{project.miscCost.toLocaleString()}</td>
                    <td className="py-3 px-4 font-bold text-orange-600">
                      ₱{project.totalCost.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'ongoing'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
