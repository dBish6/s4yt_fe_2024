import { ref, set, get, DataSnapshot } from "firebase/database";
import { db } from "@root/firebase";
import { addNotification } from "@actions/notifications";

export default async function initializeFirebase(userId: string, userEmail: string) {
  const userRef = ref(db, "users/" + userId);
  try {
    const snapshot: DataSnapshot = await get(userRef);
    if (snapshot.exists()) {
    } else {
      set(userRef, {
        email: userEmail,
        submittedRaffle: false,
        completedQuiz: false,
      });
    }
  } catch (error) {
    console.error("Error checking or creating user:", error);
    addNotification({
      error: true,
      content: "Error adding user to Firebase",
      close: false,
      duration: 0,
    });
  }
}
