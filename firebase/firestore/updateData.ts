import firebaseApp from '../config'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

// Initialize Firestore instance
const db = getFirestore(firebaseApp)

export default async function updateData(
  collection: string,
  id: string,
  data: Record<string, any>, // or a more specific type if you know the data structure
): Promise<{ result: void | null; error: unknown }> {
  let result: void | null = null
  let error: unknown = null

  try {
    const docRef = doc(db, collection, id)
    result = await updateDoc(docRef, data)
    console.log('Update success:', result)
  } catch (e) {
    error = e
    console.error('Update failed:', e)
  }

  return { result, error }
}
