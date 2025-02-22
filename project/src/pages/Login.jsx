import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login } = useAuthStore(); // Access authStore login logic
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      // Firebase Login Successful: Update Zustand Store
      const firebaseUser = {
        email: userCredential.user.email,
        name: userCredential.user.displayName || "User",
        uid: userCredential.user.uid,
      };

      // Call Zustand's login function
      const result = login({
        email: firebaseUser.email,
        password: credentials.password, // Needed for Zustand store match
      });

      if (result.success) {
        toast.success(`Welcome back, ${firebaseUser.name}!`);

        // Redirect admin to /admin, regular users to /
        if (firebaseUser.email === "admin@medicare.com") {
          navigate("/admin"); // Admin dashboard
        } else {
          navigate("/"); // Regular user homepage
        }
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      // Handle Firebase Authentication Error
      console.error("Firebase Login Error:", error.message);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase/config";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";

// export default function Login() {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const { login } = useAuthStore(); // Access authStore login logic
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Firebase Authentication
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         credentials.email,
//         credentials.password
//       );

//       // Firebase Login Successful: Update Zustand Store
//       const firebaseUser = {
//         email: userCredential.user.email,
//         name: userCredential.user.displayName || "User",
//         uid: userCredential.user.uid,
//       };

//       // Use authStore to handle user logic
//       const result = login(firebaseUser); // Update Zustand state

//       if (result.success) {
//         toast.success(`Welcome back, ${firebaseUser.name}!`);
//         navigate("/"); // Navigate to Home after login
//       } else {
//         toast.error("Login failed. Please try again.");
//       }
//     } catch (error) {
//       // Handle Firebase Authentication Error
//       console.error("Firebase Login Error:", error.message);
//       toast.error("Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or{" "}
//             <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
//               create a new account
//             </Link>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <input
//                 type="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={credentials.email}
//                 onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
//               />
//             </div>
//             <div>
//               <input
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
