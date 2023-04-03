import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export const logout = async (): Promise<void> => {
  await signOut(auth);
};
