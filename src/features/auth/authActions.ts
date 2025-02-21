import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { logout } from "./authSlice";
import { AppDispatch } from "../../store";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};

export const signOut = () => async (dispatch: AppDispatch) => {
  try {
    console.log("Attempting to sign out...");
    await firebaseSignOut(auth);
    console.log("Firebase sign out successful");
    dispatch(logout());
    console.log("Redux state updated successfully");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};
