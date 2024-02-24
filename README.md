# Calorie Tracker:

The Calorie Tracker App is designed to simplify the process of managing your nutrition and fitness journey.
The app allows users to set personalized goals based on their unique metrics such as weight, height, activity level, and desired objectives.
By leveraging image recognition technology, users can effortlessly track their daily calorie intake by capturing images of their meals, receiving instant feedback on their nutritional choices.
The app provides real-time insights into calorie consumption versus goals, empowering users to make informed decisions about their dietary habits.

# Project Documentation
This project is divided into two main parts: the backend and the frontend.

## Technologies Used:

- Frontend: React Native, Expo, TypeScript
- Backend: Node.js, Express.js
- Authentication and Storage: Firebase
- Image Recognition: GPT-4 Vision

### Backend
It is a Node.js application with the main entry point being index.js.

#### Structure
- index.js: This is the main entry point of the backend application and it also handles the routes processing the requests from the frontend
- chatGPTcommunication.js: This file handles communication with the GPT-4 Vision model for image recognition and GPT-3.5 for calorie intake calculation based on user metrics.
- utils.js: This file contains utility functions that are used across the backend application.

### Frontend
The frontend of the project is a React Native application that is built with the Expo CLI. 
It handles the Authentication and Storage processes using Firebase.

#### Structure

- Context: This directory contains context providers for state management across the application.
  
  - ContextProvider.ts: This file provides all the context to the application and utilizes the useAuth hook to provide authentication details to other parts of the application.
  - ModalContext.tsx: This file includes a context provider (ModalProvider) and a custom hook (useModalContext) for accessing a modal's state and actions.
  
- Hooks: This directory contains custom React hooks for various functionalities.
  - useAuth.ts: A custom hook managing user authentication using Firebase. It also provides functions for signing in (signIn), signing up (signUp), and signing out (signOut). It also provides an object of the current authenticated User
  - useChangeMealsItemQuantity.ts: This file defines a custom React hook that manages the state of a meal object. It provides the current meal state and functions to increment and decrement the quantity of a specific food item in the meal.
  - useFetchMealsOfDay.ts: This file defines a custom React hook (useFetchMealsOfDay) that fetches meals of a specific day from a Firestore collection.
  - useImageAnalysis.ts: This file defines a custom React hook (useImageAnalysis) that manages the state and functionality related to image analysis. It provides functions to take an image (takeImage), pick an image from the gallery (pickImageFromGallery), and analyze the selected image (analyzeImage) by uploading in the Cloud Store and serving it to the backend server for analysis.
  - useSaceMeal.ts: This file defines a custom React hook (useSaveMeal) that saves a meal to a Firestore collection. It uses the authenticated user's ID to save the meal to the 'userMeals' subcollection.

- Components: This directory contains all the components used in the UI
  - DatesCalendar: This TypeScript/React Native file defines a DatesCalendar component that displays a calendar. Users can select a date to view meals of that day. It is used in the Calendar Screen. 
  - HomeScreenComponents: This directory includes all the components used in the HomeScreen and nowhere else.
    - This TypeScript/React Native file defines a DailyTrackbar component that displays a daily calorie tracking bar. It shows the total calories consumed out of the daily calorie goal and a progress bar representing the percentage of the goal reached.
  - ImageAnalysis: This file is used to analyze food images and calculate the total calories of the meal in the image. It makes requests to backend for analyzing the image and the functionality to store the meal to the users collection. 
  - ReusableComponnets: This directory includes all the components that are used across diffrent screens.
    - DayMealCard.tsx: It's used to display a meal card for a specific day. Used in: Home Screen, Calendar Screen
    - DayMealCardModal.tsx: It's used to display a modal with the details of a meal when the user presses the DayMealCard component. Used in: Home Screen, Calendar Screen
    - DayMealsContainer.tsx: It's used to display a list of DayMealCards components with meals for a specific day or for recent days. Used in: Home Screen, Calendar Screen
    - FoodItemComponent.tsc: The component displays details about a food item and allows the user to change the quantity and calories of the item. Used in: Home Screen, Calendar Screen, Image Analysis
- Navigation: This directory includes the Navigation structure of the App
  -  CustomTabBars.tsx: This is a custom tab bar component for a React Native application using the @react-navigation/bottom-tabs library. It includes the functionality to Navigate to all the Application screens after the user is authenticated and also gives access to the Image Analysis component.
  -  MainTabs.tsx: This is the index component of the Navigation. It is the main navigation setup for a React Native application using the @react-navigation library. It shows diffrent screen based on the user authentication state.
- Screens: This directory includes all the Bottom Tab Navigation screens and Authentication screens.
  - Authentication Screens:
    - CreateAccountAuthDetails.tsx: It collects user details like email, username, password, and daily calories in the Create Account process. It uses the AuthContext for user registration
    - CreateAccountBodyForm.tsx: It's a form for users to input their physical details and fitness goals during Create Account process. The form data is used to calculate the daily calorie intake for the user by making a POST request to an API. The calculated calorie intake and user details are then passed to the next screen.
    - SignInScreen.tsx:  It includes fields for email and password, and buttons for signing in and navigating to the account creation screen. It uses the AuthContext for authentication and useNavigation for navigation.
  - Home: This is the Home Screen. It includes the following components: DayMealCardModal, DayMealsContainer, DailyTrackbar
  - Calendar: This is the Calendar Screen. It includes a DayMealCardModal component and a DatesCalendar component.
  - Recipes: Not implemented yet.
  - Profile: It fetches a greeting message from a server and user data from Firebase, and displays these along with a sign out button.
- Constants: This directory includes styling constants.
- GlobalTypes.ts: This file includes the global TypeSript types for the application like User, Meal and FoodItem.
- utils.ts: This file includes utility functions for formating dates.
- firebase.ts: This file includes the configuration of the Firebase Connection.
