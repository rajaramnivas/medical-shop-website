import { useState } from 'react';
import toast from 'react-hot-toast';
import { useProductStore } from '../store/productStore';
import { AGE_CATEGORIES, AGE_RANGES } from '../constants/ageCategories';
import ImagePreview from './ImagePreview';

export default function AdminProductForm() {
  const initialState = {
    name: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    ageCategory: AGE_CATEGORIES.ADULT
  };

  const [newProduct, setNewProduct] = useState(initialState);
  const addProduct = useProductStore((state) => state.addProduct);

  const validateProduct = () => {
    const price = parseFloat(newProduct.price);
    const stock = parseInt(newProduct.stock);

    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return false;
    }

    if (isNaN(stock) || stock < 0) {
      toast.error('Please enter a valid stock quantity');
      return false;
    }

    if (!newProduct.image) {
      toast.error('Please provide an image URL');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateProduct()) return;

    addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      description: newProduct.description,
      image: newProduct.image,
      ageCategory: newProduct.ageCategory
    });

    setNewProduct(initialState);
    toast.success('Product added successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                placeholder="Enter price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                placeholder="Enter stock quantity"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age Category
              </label>
              <select
                value={newProduct.ageCategory}
                onChange={(e) => setNewProduct({ ...newProduct, ageCategory: e.target.value })}
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {Object.entries(AGE_RANGES).map(([category, range]) => (
                  <option key={category} value={category}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                placeholder="Enter image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
                rows="4"
              />
            </div>
          </div>
        </div>

        {newProduct.image && (
          <ImagePreview url={newProduct.image} alt="Product preview" />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}