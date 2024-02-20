import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../../constants/colors';

type navigationProp = StackNavigationProp<RootStackParamList, 'CreateAccountBodyForm'>;

export default function CreateAccountBodyForm() {
  const navigation = useNavigation<navigationProp>();
  const [userDetails, setUserDetails] = useState({
    bodyValues: {
      weight: 70,
      height: 170,
      age: 25,
      trainingActivity: 'never',
      gender: 'male',
      bodyType: 'normal',
      goal: 'maintain',
      timeGoal: '3 months',
    },
  });
  const [dailyCalories, setDailyCalories] = useState(0);

  async function getDailyCaloriesForUser(): Promise<number> {
    try {
      const res = await fetch('https://foodimageanalysisapi.onrender.com/calculateDailyCalories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails.bodyValues),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      console.log(response);
      return response.calories;
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      throw error;
    }
  }

  async function handleCalculateDailyCalories() {
    const response = await getDailyCaloriesForUser();
    setDailyCalories(response);
  }

  function handleProceed() {
    navigation.navigate('CreateAccountAuthDetails', { userDetails, dailyCalories });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} >
        <Text>Provide your details</Text>
        <Text>{dailyCalories}</Text>
        <Button title="Calculate daily calories" onPress={handleCalculateDailyCalories} />
        {dailyCalories > 0 &&
          <Button title="Go On" onPress={handleProceed} />
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
});