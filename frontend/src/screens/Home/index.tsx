import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/ContextProvider";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { User, Meal } from "../../globalTypes";
import useFetchMealsOfDay from "../../../hooks/useFetchMealsOfDay";
import TodayMeals from "../../components/HomeScreenComponents/TodayMeals";

export default function Home() {
  const [userData, setUserData] = useState<User>();
  const [totalCalories, setTotalCalories] = useState<number>(0); // New state variable
  const auth = useContext(AuthContext);
  if (!auth) {
    // handle the case where the auth context is not provided
    throw new Error("AuthContext is not provided");
  }
  const { user } = auth;

  // Fetch today's meals
  const today = new Date();
  const dateString = today.toISOString().split("T")[0]; // format: "YYYY-MM-DD"
  const { meals: mealsData, error } = useFetchMealsOfDay(dateString);

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
    const total = mealsData.reduce(
      (total, meal) => total + (meal.totalMealCalories || 0),
      0
    );
    setTotalCalories(total);
  }, [mealsData]);

  return (
    <ScrollView>
      {userData && (
        <View>
          <Text>Welcome {userData.username}</Text>
          <Text>Your daily calories: {userData.dailyCalories}</Text>
          <Text>Total meal calories: {totalCalories}</Text>
          {error && <Text>Error fetching meals{error}</Text>}
          <TodayMeals meals={mealsData} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
