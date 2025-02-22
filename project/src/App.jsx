// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Products from './pages/Products';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Admin from './pages/Admin';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
//         </Routes>
//         <Toaster position="top-right" />
//       </div>
//     </Router>
//   );
// }

// export default App;


// import TestFirebase from "./TestFirebase";

// function App() {
//   return (
//     <div className="App">
//       <TestFirebase />
//     </div>
//   );
// }

// export default App;


// import React, { useEffect } from "react";
// import { db } from "./firebase/config";
// import { collection, getDocs } from "firebase/firestore";

// function App() {
//   useEffect(() => {
//     const testFirestore = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "user")); // Replace "test" with your Firestore collection name
//         querySnapshot.forEach((doc) => {
//           console.log("Firestore document:", doc.id, doc.data());
//         });
//       } catch (error) {
//         console.error("Error connecting to Firestore:", error);
//       }
//     };

//     testFirestore();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Testing Firebase</h1>
//       <p>Check the console for Firestore data.</p>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />

          {/* Fallback Route */}
          <Route path="*" element={<h1 className="text-center mt-10 text-red-500">404 - Page Not Found</h1>} />
        </Routes>

        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
