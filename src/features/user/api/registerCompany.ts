import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { uploadImage } from "./uploadImage";

export const registerCompany = async (
  company: CompanyFormTypes
): Promise<void> => {
  try {
    const { currentUser } = auth;

    if (!currentUser) throw new Error("Not signed in");

    // Add the creator (user) ID to the company data.
    const companyData = { ...company, creator: currentUser.uid };

    // If a logo is provided, upload it and add its URL to the company data.
    if (typeof company.logo !== "string") {
      const imageFile = company.logo[0];
      const imageUrl = await uploadImage(imageFile);
      companyData.logo = imageUrl;
    }

    // Add the company data to the Firestore "companies" collection.
    const companyCollectionRef = collection(db, "companies");
    const companyDocRef = await addDoc(companyCollectionRef, companyData);

    // Update the user document with the new company ID.
    const userDocRef = doc(db, "users", currentUser.uid);
    await updateDoc(userDocRef, { company: companyDocRef.id });
  } catch (error) {
    throw error;
  }
};
