import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../lib/firebase";
import { uploadImage } from "./uploadImage";

export const updateCompanyById = async (
  companyId: string,
  formData: EditCompanyFormInputs
): Promise<void> => {
  try {
    // Get a reference to the Firestore document for the company.
    const companyDocRef = doc(db, "companies", companyId);

    const companyData = Object.entries(formData).reduce(
      (acc: Record<string, any>, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    ) as EditCompanyFormInputs;

    if (companyData.logo instanceof FileList && companyData.logo.length > 0) {
      const imageFile = companyData.logo[0];
      const imageUrl = await uploadImage(imageFile);
      companyData.logo = imageUrl;
    } else {
      delete companyData.logo;
    }

    // Update the company document with the new data.
    await updateDoc(companyDocRef, companyData);
  } catch (error) {
    throw error;
  }
};
