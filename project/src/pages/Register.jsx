import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useAuthStore } from '../store/authStore';

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = useAuthStore((state) => state.registerUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, mobile, password, confirmPassword } = formData;

    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not match!");
    //   return;
    // }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.mobile.match(/^[6-9]\d{9}$/)) {
      toast.error('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    const result = registerUser({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      mobile: formData.mobile
    });

    if (result.success) {
      toast.success('Registration successful! Please login.');
    } 
    else {
      toast.error(result.message);
    }
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's profile (e.g., displayName)
      await updateProfile(user, {
        displayName: username,
      });

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        mobile,
        createdAt: new Date(),
      });

      toast.success(`Account created successfully! Welcome, ${username}!`);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error(`Error creating account: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold text-center">Register</h1>

      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      <input
        type="text"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Register
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
}
