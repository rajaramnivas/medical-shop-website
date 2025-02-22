import { useState } from 'react';
import { useProductStore } from '../store/productStore';
import toast from 'react-hot-toast';
import { formatPrice } from '../utils/currency';

export default function StockManagement() {
  const { products, updateStock } = useProductStore();
  const [stockValues, setStockValues] = useState(
    products.reduce((acc, product) => ({
      ...acc,
      [product.id]: product.stock.toString()
    }), {})
  );

  const handleStockChange = (id, value) => {
    setStockValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleStockUpdate = (id) => {
    const newStock = parseInt(stockValues[id]);
    if (isNaN(newStock) || newStock < 0) {
      toast.error('Please enter a valid stock quantity');
      // Reset to current stock value
      setStockValues(prev => ({
        ...prev,
        [id]: products.find(p => p.id === id).stock.toString()
      }));
      return;
    }
    updateStock(id, newStock);
    toast.success('Stock updated successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Manage Stock</h3>
      <div className="space-y-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">
                {product.name}
              </h4>
              <p className="text-gray-600">{formatPrice(product.price)}</p>
              <p className={`text-sm ${product.stock < 10 ? 'text-orange-600' : 'text-gray-600'}`}>
                Current Stock: {product.stock} units
                {product.stock < 10 && ' (Low Stock)'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={stockValues[product.id]}
                  onChange={(e) => handleStockChange(product.id, e.target.value)}
                  onBlur={() => handleStockUpdate(product.id)}
                  className="w-24 px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
                <span className="text-gray-600">in stock</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}