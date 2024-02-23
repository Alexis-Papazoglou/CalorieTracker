import { useState, useContext } from "react";
import { firestore } from "../firebase"; // import your firestore instance
import { AuthContext } from "../Context/ContextProvider"; // import your AuthContext
import { setDoc, doc } from "firebase/firestore";
import { Meal } from "../src/globalTypes";

const useSaveMeal = () => {
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  const saveMeal = async (meal: Meal, totalMealCalories: number) => {
    setLoading(true);

    try {
      if (!auth?.user) throw new Error("No user logged in");

      const timestamp = Date.now().toString(); // get current timestamp
      const mealData = { ...meal, totalMealCalories, date: timestamp };

      const mealRef = doc(firestore, "users", auth.user.uid, "userMeals", timestamp);
      await setDoc(mealRef, mealData);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return { saveMeal, loading };
};

export default useSaveMeal;
