import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              MediCare
            </Link>
          </div>

          {/* Links and User Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>

            {user ? (
              <>
                {/* User Profile */}
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="h-6 w-6 text-gray-600" />
                  <span className="text-gray-700">
                    {user.name || user.displayName || "User"}
                  </span>
                </div>

                {/* Admin Dashboard or Cart */}
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/cart"
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
                  >
                    <span>View Cart</span>
                    {cartItems.length > 0 && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                )}

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
