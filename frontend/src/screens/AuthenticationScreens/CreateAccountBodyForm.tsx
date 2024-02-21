import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../constants/colors';
import { primaryButton, primaryButtonText } from '../../constants/buttons';
import { Dimensions } from 'react-native';

type navigationProp = StackNavigationProp<RootStackParamList, 'CreateAccountBodyForm'>;
const screenWidth = Dimensions.get('window').width;

export default function CreateAccountBodyForm() {
  const navigation = useNavigation<navigationProp>();
  const [userDetails, setUserDetails] = useState({
    bodyValues: {
      weight: 0,
      height: 0,
      age: 0,
      trainingActivity: 'never',
      gender: 'male',
      bodyType: 'skinny',
      goal: 'lose weight',
      timeGoal: '1 month',
    },
  });

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

  async function handlePress() {
    // Check if all fields are filled
    const { weight, height, age, trainingActivity, gender, bodyType, goal, timeGoal } = userDetails.bodyValues;
    if (!weight || !height || !age || !trainingActivity || !gender || !bodyType || !goal || !timeGoal) {
      alert('Please fill all fields');
      return;
    }
    console.log(userDetails.bodyValues);
    
    try {
      const response = await getDailyCaloriesForUser();
      navigation.navigate('CreateAccountAuthDetails', { userDetails, dailyCalories: response });
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ ...styles.scrollView, width: screenWidth }}>
        <Text style={styles.headerText}>Provide your details</Text>
        <Text style={styles.parText}>Providing your details we will be able to calculate the calorie intake you need to achieve your goal</Text>
        <TextInput
          keyboardType='numeric'
          style={styles.textInput}
          placeholder="Weight (kg)"
          value={userDetails.bodyValues.weight === 0 ? '' : userDetails.bodyValues.weight.toString()}
          onChangeText={(text) => setUserDetails(prevState => ({ ...prevState, bodyValues: { ...prevState.bodyValues, weight: Number(text) } }))}
        />
        <TextInput
          style={styles.textInput}
          keyboardType='numeric'
          placeholder="Height (cm)"
          value={userDetails.bodyValues.height === 0 ? '' : userDetails.bodyValues.height.toString()}
          onChangeText={(text) => setUserDetails(prevState => ({ ...prevState, bodyValues: { ...prevState.bodyValues, height: Number(text) } }))}
        />
        <TextInput
          keyboardType='numeric'
          style={styles.textInput}
          placeholder="Age"
          value={userDetails.bodyValues.age === 0 ? '' : userDetails.bodyValues.age.toString()}
          onChangeText={(text) => setUserDetails(prevState => ({ ...prevState, bodyValues: { ...prevState.bodyValues, age: Number(text) } }))}
        />
        <View style={styles.pickersContainer}>
          <Text style={styles.pickerText}>Gender</Text>
          <Picker
            mode='dialog'
            style={styles.picker}
            selectedValue={userDetails.bodyValues.gender}
            onValueChange={(itemValue) =>
              setUserDetails(prevState => ({ ...prevState, bodyValues: { ...prevState.bodyValues, gender: itemValue } }))
            }
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
          <Text style={styles.pickerText}>Training activity</Text>
          <Picker
            mode='dropdown'
            style={styles.picker}
            selectedValue={userDetails.bodyValues.trainingActivity}
            onValueChange={(itemValue) =>
              setUserDetails(prevState => ({ ...prevState, bodyValues: { ...prevState.bodyValues, trainingActivity: itemValue } }))
            }
          >
            <Picker.Item label="Never" value="never" />
            <Picker.Item label="3 times a week" value="3 times a week" />
            <Picker.Item label="5 times a week" value="5 times a week" />
            <Picker.Item label="Everyday" value="everyday" />
          </Picker>
          <Text style={styles.pickerText}>Body type</Text>
          <Picker
            mode='dropdown'
            style={styles.picker}
            selectedValue={userDetails.bodyValues.bodyType}
            onValueChange={(itemValue) =>
              setUserDetails(prevState => ({ ...prevState, bodyValues: { ...prevState.bodyValues, bodyType: itemValue } }))
            }
          >
            <Picker.Item label="Skinny" value="Skinny" />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Overweight" value="Overweight" />
          </Picker>
          <Text style={styles.pickerText}>Goal</Text>
          <Picker
            mode='dropdown'
            style={styles.picker}
            selectedValue={userDetails.bodyValues.goal}
            onValueChange={(itemValue) =>
              setUserDetails(prevState => ({ ...prevState, bodyValues: { ...prevState.bodyValues, goal: itemValue } }))
            }
          >
            <Picker.Item label="Lose weight" value="lose weight" />
            <Picker.Item label="Maintain" value="maintain" />
            <Picker.Item label="Gain weight" value="gain weight" />
          </Picker>
          <Text style={styles.pickerText}>Time goal</Text>
          <Picker
            mode='dropdown'
            style={styles.picker}
            selectedValue={userDetails.bodyValues.timeGoal}
            onValueChange={(itemValue) =>
              setUserDetails(prevState => ({ ...prevState, bodyValues: { ...prevState.bodyValues, timeGoal: itemValue } }))
            }
          >
            <Picker.Item label="1 month" value="1 month" />
            <Picker.Item label="2 months" value="2 months" />
            <Picker.Item label="3 months" value="3 months" />
            <Picker.Item label="4 months" value="4 months" />
            <Picker.Item label="5 months" value="5 months" />
            <Picker.Item label="6 months" value="6 months" />
          </Picker>
        </View>
        <TouchableOpacity style={primaryButton} onPress={handlePress}>
          <Text style={primaryButtonText}>Calculate calories</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 20,
  },
  parText: {
    width: 280,
    fontSize: 18,
    fontWeight: 'normal',
    color: 'black',
    paddingBottom: 10,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    width: 280,
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 12,
  },
  pickersContainer: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 200,
  },
  pickerText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'normal',
    paddingTop: 10,
  },
});