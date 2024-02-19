import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from 'firebase/auth';
import { signOut as signOutFromFirebase } from 'firebase/auth';
import { auth as firebaseAuth , firestore } from '../firebase'; 
import { doc, setDoc } from "firebase/firestore"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
    user: User | null;
    initializing: boolean;
    signIn: (email: string, password: string) => Promise<string | undefined>;
    signUp: (email: string, password: string) => Promise<string | undefined>;
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
            await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            if (error instanceof Error) {
                setLastError(error.message);
                return error.message;
            }
        }
    };

    const signUp = async (email: string, password: string) => {
        if (!firebaseAuth || !firestore) return;
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const user = userCredential.user;
            setUser(user);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            // Create a new user document in Firestore
            const uid = user.uid;
            await setDoc(doc(firestore, "users", uid), {
                email: email,
                uid: uid,
            });
        } catch (error) {
            if (error instanceof Error) {
                setLastError(error.message);
                return error.message;
            }
        }
    };

    const signOut = async () => {
        if (!firebaseAuth) return;
        try {
            await signOutFromFirebase(firebaseAuth);
            setUser(null);
            await AsyncStorage.removeItem('user');
        } catch (error) {
            if (error instanceof Error) {
                setLastError(error.message);
            }
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
};