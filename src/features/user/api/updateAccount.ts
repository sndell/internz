import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { reloadCurrentUser } from "./reloadCurrentUser";
import { uploadImage } from "./uploadImage";

export const updateAccount = async (
  userId: string,
  formData: EditStudentAccountFormInputs | EditCompanyAccountFormInputs
): Promise<void> => {
  try {
    // Get a reference to the Firestore document for the user.
    const userDocRef = doc(db, "users", userId);

    const userData = Object.entries(formData).reduce(
      (acc: Record<string, any>, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    ) as EditStudentAccountFormInputs;

    if (userData.photo instanceof FileList && userData.photo.length > 0) {
      const imageFile = userData.photo[0];
      const imageUrl = await uploadImage(imageFile);
      userData.photo = imageUrl;
    } else {
      delete userData.photo;
    }

    // Update the user document with the new data.
    await updateDoc(userDocRef, userData);
    await reloadCurrentUser();
  } catch (error) {
    throw error;
  }
};
