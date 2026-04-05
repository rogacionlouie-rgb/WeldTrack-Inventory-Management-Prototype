import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Download, Filter } from 'lucide-react';

export function Reports() {
  const { materials, projects, transactions } = useApp();
  const [reportType, setReportType] = useState<'inventory' | 'expenses' | 'projects'>(
    'inventory'
  );

  const handleExport = (type: string) => {
    alert(`Exporting ${type} report... (PDF generation would be implemented here)`);
  };

  const totalExpenses = transactions
    .filter((t) => t.type === 'purchase')
    .reduce((sum, t) => sum + t.total, 0);

  const totalRevenue = transactions
    .filter((t) => t.type === 'sale')
    .reduce((sum, t) => sum + t.total, 0);

  const totalProjectCosts = projects.reduce((sum, p) => sum + p.totalCost, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Reports</h1>
        <p className="text-gray-600">Generate and export business reports</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex gap-2">
            <button
              onClick={() => setReportType('inventory')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                reportType === 'inventory'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inventory Report
            </button>
            <button
              onClick={() => setReportType('expenses')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                reportType === 'expenses'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expense Report
            </button>
            <button
              onClick={() => setReportType('projects')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                reportType === 'projects'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Project Summary
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">
            {reportType === 'inventory' && 'Inventory Report'}
            {reportType === 'expenses' && 'Expense Report'}
            {reportType === 'projects' && 'Project Cost Summary'}
          </h3>
          <button
            onClick={() => handleExport(reportType)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>

        {reportType === 'inventory' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-700 mb-1">Total Items</p>
                <p className="text-2xl font-bold text-blue-900">{materials.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-700 mb-1">Total Value</p>
                <p className="text-2xl font-bold text-green-900">
                  ₱
                  {materials
                    .reduce((sum, m) => sum + m.quantity * m.unitPrice, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <p className="text-sm text-red-700 mb-1">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-900">
                  {materials.filter((m) => m.quantity <= m.lowStockThreshold).length}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="text-left py-3 px-4">Material</th>
                    <th className="text-left py-3 px-4">Quantity</th>
                    <th className="text-left py-3 px-4">Unit Price</th>
                    <th className="text-left py-3 px-4">Total Value</th>
                    <th className="text-left py-3 px-4">Supplier</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((material) => {
                    const totalValue = material.quantity * material.unitPrice;
                    const isLowStock = material.quantity <= material.lowStockThreshold;
                    return (
                      <tr key={material.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{material.name}</td>
                        <td className="py-3 px-4">
                          {material.quantity} {material.unit}
                        </td>
                        <td className="py-3 px-4">₱{material.unitPrice.toLocaleString()}</td>
                        <td className="py-3 px-4 font-semibold">
                          ₱{totalValue.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">{material.supplier}</td>
                        <td className="py-3 px-4">
                          {isLowStock ? (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                              Low Stock
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                              In Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'expenses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <p className="text-sm text-red-700 mb-1">Total Expenses</p>
                <p className="text-2xl font-bold text-red-900">
                  ₱{totalExpenses.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-700 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-green-900">
                  ₱{totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-700 mb-1">Net Profit</p>
                <p className="text-2xl font-bold text-blue-900">
                  ₱{(totalRevenue - totalExpenses).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Description</th>
                    <th className="text-left py-3 px-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            transaction.type === 'sale'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {transaction.type === 'sale'
                          ? `Sale to ${transaction.customer}`
                          : 'Material Purchase'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            transaction.type === 'sale' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'sale' ? '+' : '-'}₱
                          {transaction.total.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'projects' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-700 mb-1">Total Projects</p>
                <p className="text-2xl font-bold text-blue-900">{projects.length}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <p className="text-sm text-orange-700 mb-1">Ongoing</p>
                <p className="text-2xl font-bold text-orange-900">
                  {projects.filter((p) => p.status === 'ongoing').length}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-700 mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-900">
                  {projects.filter((p) => p.status === 'completed').length}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-700 mb-1">Total Cost</p>
                <p className="text-2xl font-bold text-purple-900">
                  ₱{totalProjectCosts.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="text-left py-3 px-4">Project Name</th>
                    <th className="text-left py-3 px-4">Start Date</th>
                    <th className="text-left py-3 px-4">Material Cost</th>
                    <th className="text-left py-3 px-4">Labor Cost</th>
                    <th className="text-left py-3 px-4">Misc Cost</th>
                    <th className="text-left py-3 px-4">Total Cost</th>
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
                        <td className="py-3 px-4">
                          {new Date(project.startDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">₱{materialCost.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          ₱{project.laborCost.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">₱{project.miscCost.toLocaleString()}</td>
                        <td className="py-3 px-4 font-bold text-orange-600">
                          ₱{project.totalCost.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
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
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Report Generation</h3>
            <p className="text-blue-100 mb-4">
              Export detailed reports for analysis and record-keeping
            </p>
            <ul className="space-y-1 text-sm text-blue-100">
              <li>• Inventory status and valuation</li>
              <li>• Income and expense tracking</li>
              <li>• Project cost breakdowns</li>
              <li>• PDF export for sharing and printing</li>
            </ul>
          </div>
          <FileText className="w-16 h-16 text-blue-300" />
        </div>
      </div>
    </div>
  );
}
