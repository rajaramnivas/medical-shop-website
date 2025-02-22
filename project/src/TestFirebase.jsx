import React, { useEffect } from "react";
import { db } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";

const TestFirebase = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "test"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} =>`, doc.data());
        });
      } catch (error) {
        console.error("Error connecting to Firestore:", error);
      }
    };
    fetchData();
  }, []);

  return <h1>Check console for Firestore data</h1>;
};

export default TestFirebase;
