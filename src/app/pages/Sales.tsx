import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, ShoppingCart } from 'lucide-react';

export function Sales() {
  const { materials, addTransaction, transactions, user } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customer: '',
    date: new Date().toISOString().split('T')[0],
    items: [] as { materialId: string; quantity: number; price: number }[],
  });

  const addItemToSale = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { materialId: '', quantity: 0, price: 0 }],
    });
  };

  const updateSaleItem = (index: number, field: string, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    if (field === 'materialId') {
      const material = materials.find((m) => m.id === value);
      if (material) {
        updatedItems[index].price = material.unitPrice;
      }
    }

    setFormData({ ...formData, items: updatedItems });
  };

  const removeSaleItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const total = formData.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    addTransaction({
      type: 'sale',
      date: formData.date,
      items: formData.items,
      total,
      customer: formData.customer,
      sellerId: user?.id,
    });

    setShowModal(false);
    setFormData({
      customer: '',
      date: new Date().toISOString().split('T')[0],
      items: [],
    });
  };

  const salesTransactions = transactions.filter((t) => t.type === 'sale');
  const totalRevenue = salesTransactions.reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Sales & Transactions</h1>
          <p className="text-gray-600">Record and track sales transactions</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Plus className="w-5 h-5" />
          New Sale
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Sales</p>
              <p className="text-3xl font-bold text-slate-800">
                {salesTransactions.length}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">
                ₱{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Sale</p>
              <p className="text-3xl font-bold text-orange-600">
                ₱
                {salesTransactions.length > 0
                  ? Math.round(totalRevenue / salesTransactions.length).toLocaleString()
                  : 0}
              </p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold text-slate-800">Sales History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Items</th>
                <th className="text-left py-3 px-4">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {salesTransactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-600">
                    No sales transactions yet. Create your first sale!
                  </td>
                </tr>
              ) : (
                salesTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{transaction.customer}</td>
                    <td className="py-3 px-4">
                      {transaction.items.map((item, index) => {
                        const material = materials.find((m) => m.id === item.materialId);
                        return (
                          <div key={index} className="text-sm">
                            {material?.name} x{item.quantity}
                          </div>
                        );
                      })}
                    </td>
                    <td className="py-3 px-4 font-bold text-green-600">
                      ₱{transaction.total.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-slate-800">New Sale Transaction</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={formData.customer}
                    onChange={(e) =>
                      setFormData({ ...formData, customer: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Items</label>
                  <button
                    type="button"
                    onClick={addItemToSale}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.items.map((item, index) => {
                    const material = materials.find((m) => m.id === item.materialId);
                    const subtotal = item.quantity * item.price;
                    return (
                      <div key={index} className="flex gap-2 items-end">
                        <div className="flex-1">
                          <select
                            value={item.materialId}
                            onChange={(e) =>
                              updateSaleItem(index, 'materialId', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          >
                            <option value="">Select Material</option>
                            {materials.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.name} - ₱{m.unitPrice} ({m.quantity} available)
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateSaleItem(index, 'quantity', Number(e.target.value))
                          }
                          max={material?.quantity || 999999}
                          placeholder="Qty"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                        <input
                          type="number"
                          value={item.price}
                          readOnly
                          placeholder="Price"
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                        <div className="w-28 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-medium">
                          ₱{subtotal.toLocaleString()}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSaleItem(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {formData.items.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">
                      ₱
                      {formData.items
                        .reduce((sum, item) => sum + item.quantity * item.price, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={formData.items.length === 0}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Complete Sale
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({
                      customer: '',
                      date: new Date().toISOString().split('T')[0],
                      items: [],
                    });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
