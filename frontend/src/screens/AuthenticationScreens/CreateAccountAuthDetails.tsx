import React, { useContext, useEffect, useState } from 'react'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../../Context/ContextProvider';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../../../hooks/useAuth';
import { primaryButton, primaryButtonText } from '../../constants/buttons';


type CreateAccountDetailsRouteProp = RouteProp<RootStackParamList, 'CreateAccountAuthDetails'>;

export default function CreateAccountAuthDetails() {
  const auth = useContext(AuthContext);
  const route = useRoute<CreateAccountDetailsRouteProp>();
  const { userDetails, dailyCalories } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [calories, setDailyCalories] = useState(dailyCalories);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (!email || !username || !password || !calories) {
      alert('Please fill all fields');
      return;
    }
    console.log(email, password, username, userDetails.bodyValues, calories);
    try {
      await auth?.signUp(email, password, username, userDetails.bodyValues, calories);
    } catch (error) {
      setError((error as Error).message || 'An unknown error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerText}>Now enter your authentication credentials to finish the setup!</Text>
        {error && <Text>{error}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.headerText}>Suggested daily calories:</Text>
        <TextInput
          style={styles.calories}
          keyboardType='numeric'
          placeholder="Height (cm)"
          value={calories.toString()}
          onChangeText={(text) => setDailyCalories(Number(text))}
          maxLength={4}
        />
        <Text style={styles.parText}>This is editable if you want!</Text>
        <TouchableOpacity style={primaryButton} onPress={handleSignUp}>
          <Text style={primaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    width: 300,
    textAlign: 'center',
    paddingVertical: 10,
  },
  input: {
    backgroundColor: 'white',
    width: 300,
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 12,
  },
  parText: {
    fontSize: 15,
    fontWeight: '400',
    width: 300,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30

  },
  calories: {
    fontSize: 30,
    fontWeight: '900',
    color: 'black',
    padding: 10,
    marginVertical: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  },
})


