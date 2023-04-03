import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";

export const registerWithGoogle = async (type: AccountType): Promise<void> => {
  const provider = new GoogleAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, provider);

    if (!user) return;

    const userData: UserType = {
      id: user.uid,
      email: user.email as string,
      username: user.displayName as string,
      photo: user.photoURL,
      type,
      ...(type === "company" ? { company: null } : {}),
    };

    const userDocRef = doc(db, "users", user.uid);

    await setDoc(userDocRef, userData);
  } catch (error) {
    throw error;
  }
};
