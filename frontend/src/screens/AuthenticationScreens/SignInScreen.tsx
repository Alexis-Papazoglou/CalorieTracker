// SignInScreen.tsx
import React, { useState, useContext } from "react";
import {
  Button,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../../Context/ContextProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { colors } from "../../constants/colors";
import { primaryButton, primaryButtonText } from "../../constants/buttons";

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

export default function SignInScreen() {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [email, setEmail] = useState("alex@gmail.com");
  const [password, setPassword] = useState("1234567890");
  const auth = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      await auth?.signIn(email, password);
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("CreateAccountBodyForm");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeTextView}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={[styles.welcomeText, { color: "red" , fontFamily:'AmericanTypewriter' , fontSize: 32 }]}>
          CALORIE TRACKER
        </Text>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={primaryButton} onPress={handleSignIn}>
        <Text style={primaryButtonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.secBtnTxt}>Create account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  error: {
    color: "red",
  },
  welcomeTextView: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    width: '100%',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 300,
    height: 50,
  },
  secBtnTxt: {
    color: "red",
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 5,
  },
});
