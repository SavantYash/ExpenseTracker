// services/dbHandler.js
import { db } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

/**
 * Add data to a specific Firestore collection
 * @param {string} collectionName - Firestore collection name
 * @param {object} data - The object you want to store
 * @returns {Promise<string>} - The new document ID
 */
export const addData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
    });
    console.log("✅ Document added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding document:", error);
    throw error;
  }
};
