import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export const getUserWithCompanyById = async (
  userId: string
): Promise<Profile> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      throw new Error("User not found");
    }

    const userData = userSnapshot.data() as UserType;

    let companyData: CompanyFormTypes | null = null;

    if (userData.type === "company" && userData.company) {
      const companyDocRef = doc(db, "companies", userData.company);
      const companySnapshot = await getDoc(companyDocRef);

      if (companySnapshot.exists()) {
        companyData = companySnapshot.data() as CompanyFormTypes;
      }
    }

    return { user: userData, company: companyData };
  } catch (error) {
    throw error;
  }
};
