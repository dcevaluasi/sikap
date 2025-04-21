import { doc, getDoc, getFirestore, DocumentData } from 'firebase/firestore'
import firebaseApp from '../config'

const db = getFirestore(firebaseApp)
export default async function isDocumentExists(
  collection: string,
  id: string,
): Promise<boolean> {
  try {
    const docRef = doc(db, collection, id)
    const result = await getDoc(docRef)
    return result.exists()
  } catch (error) {
    console.error('Error checking document existence:', error)
    return false
  }
}
