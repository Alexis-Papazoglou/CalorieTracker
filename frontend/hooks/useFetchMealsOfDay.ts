import { useState, useEffect, useContext } from 'react';
import { firestore } from '../firebase';
import { AuthContext } from '../Context/ContextProvider';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Meal } from '../src/globalTypes';

const useFetchMealsOfDay = (date: string) => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [error, setError] = useState<string | null>(null);
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth?.user) {
            try {
                const startOfDay = new Date(date).setHours(0, 0, 0, 0);
                const endOfDay = new Date(date).setHours(23, 59, 59, 999);

                const mealsRef = collection(firestore, 'users', auth.user.uid, 'userMeals');
                const mealsQuery = query(mealsRef, 
                    where('date', '>=', startOfDay.toString()),
                    where('date', '<=', endOfDay.toString())
                );

                const unsubscribe = onSnapshot(mealsQuery, (snapshot) => {
                    const mealsData = snapshot.docs.map(doc => doc.data() as Meal);
                    setMeals(mealsData);
                });

                // Clean up the subscription on unmount
                return () => unsubscribe();
            } catch (err) {
                throw new Error((err as string));
            }
        }
    }, [date, auth]);

    return { meals, error };
};

export default useFetchMealsOfDay;