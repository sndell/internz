import { auth } from "../../../lib/firebase";

export const reloadCurrentUser = async (): Promise<void> => {
  if (auth.currentUser) {
    await auth.currentUser.reload();
    const userDataChangedEvent = new CustomEvent("user-data-changed");
    window.dispatchEvent(userDataChangedEvent);
  }
};
