import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  username: string,
  type: AccountType
): Promise<void> => {
  try {
    // Create a new user using Firebase authentication.
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Prepare the user data object for Firestore.
    const userData: UserType = {
      id: user.uid,
      email: email,
      username,
      photo: null,
      type,
      ...(type === "company" ? { company: null } : {}),
    };

    // Get a reference to the Firestore document for the new user.
    const userDocRef = doc(db, "users", user.uid);

    // Send a verification email and save the user data to Firestore concurrently.
    await Promise.all([
      sendEmailVerification(user),
      setDoc(userDocRef, userData),
    ]);
  } catch (error) {
    throw error;
  }
};
