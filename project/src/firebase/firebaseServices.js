// src/firebase/firebaseServices.js

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";  // Make sure this is correctly pointing to the Firebase config file

// Function to fetch products from Firestore
export const fetchProducts = async () => {
  const productsSnapshot = await getDocs(collection(db, "products"));
  const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return productsList;
};

// Function to add a new product to Firestore
export const addProduct = async (productData) => {
  try {
    const productRef = await addDoc(collection(db, "products"), productData);
    console.log("Product added with ID:", productRef.id);
    return productRef.id; // Return the product ID after adding
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
};

// Optionally: Add other functions like updateProduct, deleteProduct, etc.
