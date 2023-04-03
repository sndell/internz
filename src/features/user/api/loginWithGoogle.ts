import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { reloadCurrentUser } from "./reloadCurrentUser";

export const loginWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, provider);

    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      const userData: UserType = {
        id: user.uid,
        email: user.email as string,
        username: user.displayName as string,
        photo: user.photoURL,
        type: "student",
      };
      await setDoc(userDocRef, userData);
      await reloadCurrentUser();
    }
  } catch (error) {
    throw error;
  }
};
