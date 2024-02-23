// import React, { useState, useRef } from "react";
// import { View, Text, TouchableOpacity, Modal, Animated, Dimensions } from "react-native";
// import useOpenDayMealCardModal from "../../../hooks/useOpenDayMealCardModal"; // import the custom hook

// const { width, height } = Dimensions.get("window");

// const TouchAnimatedModal = () => {
//   const { isVisible, mealData, toggleModal } = useOpenDayMealCardModal();
//   const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
//   const animation = useRef(new Animated.Value(0)).current;

//   console.log(isVisible); // Log the visibility state

//   console.log(mealData); // Log the meal data

//   const handlePress = (event: any) => {
//     setTouchPosition({
//       x: event.nativeEvent.pageX - width / 2,
//       y: event.nativeEvent.pageY - height / 2,
//     });
//     toggleModal({
//       /* pass your new state here */
//     });
//     Animated.timing(animation, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeModal = () => {
//     Animated.timing(animation, {
//       toValue: 0,
//       duration: 500,
//       useNativeDriver: true,
//     }).start(() => {
//       toggleModal();
//     });
//   };

//   const modalAnimatedStyle = {
//     opacity: animation, // Add this line
//     transform: [
//       { translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [touchPosition.x, 0] }) },
//       { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [touchPosition.y, 0] }) },
//     ],
//   };

//   return (
//     <>
//       {isVisible && (
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//           <TouchableOpacity onPress={handlePress} style={{ padding: 10, backgroundColor: "skyblue" }}>
//             <Text>Open Modal</Text>
//           </TouchableOpacity>
//           <Modal visible={isVisible} transparent>
//             <Animated.View
//               style={[
//                 { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
//                 modalAnimatedStyle,
//               ]}
//             >
//               <View style={{ padding: 20, backgroundColor: "white", borderRadius: 10 }}>
//                 <Text>Modal Content: {mealData.general_title}</Text>
//                 <TouchableOpacity
//                   onPress={closeModal}
//                   style={{ marginTop: 10, backgroundColor: "lightgrey", padding: 10 }}
//                 >
//                   <Text>Close Modal</Text>
//                 </TouchableOpacity>
//               </View>
//             </Animated.View>
//           </Modal>
//         </View>
//       )}
//     </>
//   );
// };

// export default TouchAnimatedModal;
