import { auth } from "../../../lib/firebase";

export const getUserAuthProvider = async (): Promise<
  "email" | "google" | null
> => {
  const user = auth.currentUser;
  if (!user) return null;

  const providers = user.providerData.map((p) => p.providerId);

  if (providers.includes("google.com")) return "google";
  else if (providers.includes("password")) return "email";
  else return null;
};
