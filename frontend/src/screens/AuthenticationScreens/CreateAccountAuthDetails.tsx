import React, { useContext, useState } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../../Context/ContextProvider';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../../../hooks/useAuth';


type CreateAccountDetailsRouteProp = RouteProp<RootStackParamList, 'CreateAccountAuthDetails'>;

export default function CreateAccountAuthDetails() {
  const { lastError } = useAuth();
  const auth = useContext(AuthContext);
  const route = useRoute<CreateAccountDetailsRouteProp>();
  const { userDetails, dailyCalories } = route.params;
  const [email, setEmail] = useState('alex@gmail.com');
  const [password, setPassword] = useState('12345678910');
  const [username, setUsername] = useState('testUser');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    await auth?.signUp(email, password, username, userDetails.bodyValues, dailyCalories);
    if (lastError) {
      setError(lastError);
    }
  };

  return (
    <SafeAreaView>
      <Text>cals : {dailyCalories}</Text>
      <TouchableOpacity onPress={handleSignUp}>
        <Text>userDetails</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})


