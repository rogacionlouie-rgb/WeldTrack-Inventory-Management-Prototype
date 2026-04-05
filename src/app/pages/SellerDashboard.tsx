import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { ShoppingCart, DollarSign, Package, TrendingUp } from 'lucide-react';

export function SellerDashboard() {
  const { transactions, materials } = useApp();

  const salesTransactions = transactions.filter((t) => t.type === 'sale');
  const totalSales = salesTransactions.reduce((sum, t) => sum + t.total, 0);
  const todaySales = salesTransactions.filter(
    (t) => t.date === '2026-04-04'
  );
  const todayRevenue = todaySales.reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Seller Dashboard</h1>
        <p className="text-gray-600">Track your sales and inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Sales"
          value={salesTransactions.length}
          icon={ShoppingCart}
          color="blue"
        />
        <Card
          title="Total Revenue"
          value={`₱${totalSales.toLocaleString()}`}
          icon={DollarSign}
          color="green"
        />
        <Card
          title="Today's Sales"
          value={todaySales.length}
          icon={TrendingUp}
          color="orange"
        />
        <Card
          title="Available Items"
          value={materials.length}
          icon={Package}
          color="blue"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Sales</h3>
        {salesTransactions.length === 0 ? (
          <p className="text-gray-600">No sales transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Customer</th>
                  <th className="text-left py-2 px-4">Items</th>
                  <th className="text-left py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {salesTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{transaction.customer}</td>
                    <td className="py-3 px-4">{transaction.items.length} items</td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      ₱{transaction.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Available Inventory</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Material</th>
                <th className="text-left py-2 px-4">Available</th>
                <th className="text-left py-2 px-4">Unit Price</th>
                <th className="text-left py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item) => {
                const isLowStock = item.quantity <= item.lowStockThreshold;
                return (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">
                      <span className={isLowStock ? 'text-red-600 font-semibold' : ''}>
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td className="py-3 px-4">₱{item.unitPrice.toLocaleString()}</td>
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
    </div>
  );
}
