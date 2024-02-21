import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/ContextProvider";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { User, Meal } from "../../globalTypes";
import useFetchMealsOfDay from "../../../hooks/useFetchMealsOfDay";
import DayMeals from "../../components/HomeScreenComponents/DayMeals";
import { getDate } from "../../utils";

export default function Home() {
  const [userData, setUserData] = useState<User>();
  const [totalCalories, setTotalCalories] = useState<number>(0); // New state variable
  const auth = useContext(AuthContext);
  if (!auth) {
    // handle the case where the auth context is not provided
    throw new Error("AuthContext is not provided");
  }
  const { user } = auth;

  // Fetch  meals
  const today = getDate("today"); // utility function to get a day's date
  const { meals: todayMealsData, error : todaysError } = useFetchMealsOfDay(today);
  const yesterday = getDate("yesterday"); // utility function to get a day's date
  const { meals: yesterdayMealsData, error : yesterdayError } = useFetchMealsOfDay(yesterday);

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as User);
        } else {
          console.log("No such document!");
        }
      }
    }
    fetchUserData();
  }, [user]);

  useEffect(() => {
    // Calculate total calories whenever meals change
    const total = todayMealsData.reduce(
      (total, meal) => total + (meal.totalMealCalories || 0),
      0
    );
    setTotalCalories(total);
  }, [todayMealsData]);

  return (
    <ScrollView>
      {userData && (
        <View>
          <Text>Welcome {userData.username}</Text>
          <Text>Your daily calories: {userData.dailyCalories}</Text>
          <Text>Total meal calories: {totalCalories}</Text>
          {todaysError && <Text>Error fetching meals{todaysError}</Text>}
          <DayMeals date={today} meals={todayMealsData} />
          <DayMeals date={yesterday} meals={yesterdayMealsData} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
