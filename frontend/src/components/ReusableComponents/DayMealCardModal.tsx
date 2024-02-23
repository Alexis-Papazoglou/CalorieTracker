import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useModalContext } from "../../../Context/ModalContext";
import { primaryShadow } from "../../constants/shadows";
import FoodItemComponent from "./FoodItemComponent";

//TODO : Add the ability to edit the food items and add them to the db, fix the scrolling issue
const DayMealCardModal = () => {
  const { isVisible, selectedMeal, closeModal } = useModalContext();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const modalAnimatedStyle = {
    opacity: animation,
  };

  function handleCloseModal() {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      closeModal();
    });
  }

  function stopPropagation(event: any) {
    event.stopPropagation();
  }

  return (
    isVisible && (
      <Modal visible={isVisible} transparent>
        <TouchableOpacity style={styles.modalView} activeOpacity={1} onPress={handleCloseModal}>
          <Animated.View style={[modalAnimatedStyle]}>
            <TouchableOpacity style={styles.innerView} activeOpacity={1} onPress={stopPropagation}>
              <ScrollView>
                <ScrollView contentContainerStyle={styles.foodItemContainer}>
                  {selectedMeal.food_items.map((item, index) => (
                    <FoodItemComponent key={index} item={item} index={index} setAnalysis={null} />
                  ))}
                </ScrollView>
              </ScrollView>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    )
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  innerView: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height / 1.8,
    ...primaryShadow,
  },
  foodItemContainer: {},
});

export default DayMealCardModal;
