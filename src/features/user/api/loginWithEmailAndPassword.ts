import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user.emailVerified ? true : false;
  } catch (error) {
    throw error;
  }
};
