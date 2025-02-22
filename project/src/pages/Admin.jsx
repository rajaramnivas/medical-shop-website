import AdminProductForm from '../components/AdminProductForm';
import StockManagement from '../components/StockManagement';
import UserPurchaseHistory from '../components/UserPurchaseHistory';
import { useState } from 'react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Manage Products' },
    { id: 'stock', label: 'Manage Stock' },
    { id: 'purchases', label: 'Purchase History' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'products' && <AdminProductForm />}
        {activeTab === 'stock' && <StockManagement />}
        {activeTab === 'purchases' && <UserPurchaseHistory />}
      </div>
    </div>
  );
}




/*import AdminProductForm from '../components/AdminProductForm';
import StockManagement from '../components/StockManagement';

export default function Admin() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <AdminProductForm />
      <StockManagement />
    </div>
  );
}*/
//-----------------------------------------------------------


// // src/pages/Admin.jsx
// import { useState } from "react";
// import { addProduct } from "../firebase/firebaseServices"; // Correct import of addProduct

// const Admin = () => {
//   const [product, setProduct] = useState({ name: "", price: "" });

//   const handleAddProduct = async (e) => {
//     e.preventDefault();

//     try {
//       // Adding product to Firestore
//       const productId = await addProduct(product);
//       console.log("Product added with ID:", productId);

//       // Optionally, reset the form or show a success message
//       setProduct({ name: "", price: "" });  // Reset form after successful submission
//     } catch (error) {
//       console.error("Error adding product", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Panel - Add Product</h1>
//       <form onSubmit={handleAddProduct}>
//         <div>
//           <label htmlFor="name">Product Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={product.name}
//             onChange={(e) => setProduct({ ...product, name: e.target.value })}
//             placeholder="Product Name"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="price">Product Price:</label>
//           <input
//             type="number"
//             id="price"
//             value={product.price}
//             onChange={(e) => setProduct({ ...product, price: e.target.value })}
//             placeholder="Product Price"
//             required
//           />
//         </div>
//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default Admin;
