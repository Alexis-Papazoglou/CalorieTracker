import React from 'react';
import { User } from 'firebase/auth';

interface AuthContextProps {
    user: User | null;
    initializing: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (
        email: string, password: string, username: string, bodyValues:
            {
                weight: number;
                height: number;
                age: number;
                trainingActivity: string;
                bodyType: string;
                goal: string;
                timeGoal: string;
                gender: string;
            }
        , dailyCalories: number
    ) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);