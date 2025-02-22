import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config"; // Firebase Firestore instance

// Add a product to Firestore
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, products };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get product by category
export const getProductsByCategory = async (category) => {
  try {
    const q = query(collection(db, "products"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, products };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
