// import { Navigate } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';

// export default function ProtectedRoute({ children, adminOnly = false }) {
//   const { user, isAdmin } = useAuthStore();

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (adminOnly && !isAdmin) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
