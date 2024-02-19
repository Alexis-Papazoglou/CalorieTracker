// SignInScreen.tsx
import React, { useState, useContext } from 'react';
import { Button, TextInput, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../../Context/ContextProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('testtest');
    const auth = useContext(AuthContext);
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async () => {
        const errorMessage = await auth?.signIn(email, password);
        if (errorMessage) {
            setError(errorMessage);
        }
    };

    const handleSignUp = async () => {
        const errorMessage = await auth?.signUp(email, password);
        if (errorMessage) {
            setError(errorMessage);
        }
    };

    return (
        <SafeAreaView style={styles.container} >
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title="Sign in" onPress={handleSignIn} />
            <Button title="Create Account" onPress={handleSignUp} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
    },
});