import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from "firebase/auth";
import { signOut as signOutFromFirebase } from "firebase/auth";
import { auth as firebaseAuth, firestore } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

interface AuthContextProps {
  user: User | null;
  initializing: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    username: string,
    bodyValues: {
      weight: number;
      height: number;
      age: number;
      trainingActivity: string;
      bodyType: string;
      goal: string;
      timeGoal: string;
      gender: string;
    },
    dailyCalories: number
  ) => Promise<void>;
  signOut: () => Promise<void>;
  lastError: string | null;
}

export function useAuth(): AuthContextProps {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe; // unsubscribe on unmount
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!firebaseAuth) return;
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      setUser(user);
    } catch (error) {
      if (error instanceof Error) {
        setLastError(error.message);
      }
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    username: string,
    bodyValues: {
      weight: number;
      height: number;
      age: number;
      trainingActivity: string;
      bodyType: string;
      goal: string;
      timeGoal: string;
      gender: string;
    },
    dailyCalories: number
  ) => {
    if (!firebaseAuth || !firestore) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      setUser(user);

      // Create a new user document in Firestore
      const uid = user.uid;
      await setDoc(doc(firestore, "users", uid), {
        email: email,
        uid: uid,
        username: username,
        bodyInfo: {
          weight: bodyValues.weight,
          height: bodyValues.height,
          age: bodyValues.age,
          bodyType: bodyValues.bodyType,
          goal: bodyValues.goal,
          gender: bodyValues.gender,
          trainingActivity: bodyValues.trainingActivity,
        },
        dailyCalories: dailyCalories,
        userImage: "",
      });

      // Create a new userMeals subcollection in Firestore
      await setDoc(doc(collection(doc(firestore, "users", uid), "userMeals"), "initialDocument"), {
        test: "test",
      });
    } catch (error) {
      if (error instanceof Error) {
        setLastError(error.message);
      }
      throw error;
    }
  };

  const signOut = async () => {
    if (!firebaseAuth) return;
    try {
      await signOutFromFirebase(firebaseAuth);
      setUser(null);
    } catch (error) {
      if (error instanceof Error) {
        setLastError(error.message);
      }
      throw error;
    }
  };

  return {
    user,
    initializing,
    signIn,
    signUp,
    signOut,
    lastError,
  };
}
