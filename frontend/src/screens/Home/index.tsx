import { Button, ScrollView, StyleSheet, Text, View, SafeAreaView, ImageBackground, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/ContextProvider";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { User, Meal } from "../../globalTypes";
import useFetchMealsOfDay from "../../../hooks/useFetchMealsOfDay";
import HomeBackground from "../../../assets/bg (5).png";
import DayMeals from "../../components/ReusableComponents/DayMealsContainer";
import { getDate } from "../../utils";
import { primaryShadow, secondaryShadow } from "../../constants/shadows";
import { textColors } from "../../constants/colors";
import DailyTrackbar from "../../components/HomeScreenComponents/DailyTrackbar";
// import TouchAnimatedModal from "../../components/ReusableComponents/TouchAnimatedModal";

export default function Home() {
  const [userData, setUserData] = useState<User>();
  const [totalCaloriesFromMeals, setTotalCaloriesFromMeals] = useState<number>(0); // New state variable
  const auth = useContext(AuthContext);
  if (!auth) {
    // handle the case where the auth context is not provided
    throw new Error("AuthContext is not provided");
  }
  const { user } = auth;

  // Fetch  meals
  const today = getDate("today"); // utility function to get a day's date
  const { meals: todayMealsData, error: todaysError } = useFetchMealsOfDay(today);

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (user) {
          const docRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data() as User);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        throw new Error("Error getting document: " + error);
      }
    }
    fetchUserData();
  }, [user]);

  useEffect(() => {
    // Calculate total calories whenever meals change
    const total = todayMealsData.reduce((total, meal) => total + (meal.totalMealCalories || 0), 0);
    setTotalCaloriesFromMeals(total);
  }, [todayMealsData]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchAnimatedModal /> */}
      <ImageBackground source={HomeBackground} style={styles.backgroundImage}>
        <View style={styles.opacityLayer}>
          {userData && (
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome {userData.username}!</Text>
              <View style={styles.profileImageContainer}>
                <Image style={styles.profileImage} source={{ uri: userData.userImage }} />
              </View>
            </View>
          )}
          <ScrollView contentContainerStyle={styles.scrollView}>
            {userData && (
              <View>
                <DailyTrackbar dailyCalories={userData.dailyCalories} totalCaloriesFromMeals={totalCaloriesFromMeals} />
                {todaysError && <Text>{todaysError}</Text>}
                <DayMeals date={"recent"} appearedMealsNumber={4} />
              </View>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  opacityLayer: {
    backgroundColor: "rgba(0,0,0,0.03)", // Change this color to change the opacity
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  scrollView: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    textAlign: "left",
    margin: 10,
    fontWeight: "bold",
    ...secondaryShadow,
    color: textColors.primary,
  },
  profileImageContainer: {
    ...primaryShadow,
    marginRight: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  welcomeContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 5,
  },
});
