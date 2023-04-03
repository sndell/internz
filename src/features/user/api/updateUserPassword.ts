import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";

export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    const { currentUser } = auth;
    if (!currentUser?.email) throw new Error("Not signed in");

    // Reauthenticate the user with their current password.
    const credentials = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(currentUser, credentials);

    // Update the user's password.
    await updatePassword(currentUser, newPassword);
  } catch (error) {
    throw error;
  }
};
