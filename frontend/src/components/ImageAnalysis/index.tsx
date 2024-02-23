import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { colors } from "../../constants/colors";
import { primaryShadow, secondaryShadow } from "../../constants/shadows";
import useImageAnalysis from "../../../hooks/useImageAnalysis";
import { Alert } from "react-native";
import useSaveMeal from "../../../hooks/useSaveMeal";
import { FoodItem } from "../../globalTypes";
import { primaryButton, primaryButtonText } from "../../constants/buttons";
import FoodItemComponent from "../ReusableComponents/FoodItemComponent";

interface ImageAnalysisProps {
  close: () => void;
}

const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ close }) => {
  const { saveMeal, loading: SaveLoading } = useSaveMeal();
  const [description, setDescription] = useState<string>("");
  const { takeImage, pickImageFromGallery, analyzeImage, image, setImage, analysis, setAnalysis, loading, error } =
    useImageAnalysis("https://foodimageanalysisapi.onrender.com/analyze", description);
  const [totalMealCalories, setTotalMealCalories] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("Save Meal");

  // This use effect adds some more data to the analysis object (Meal)
  // because the backend does not return some of the data that we need
  useEffect(() => {
    if (analysis && analysis.food !== "no items") {
      let totalCalories = 0;
      analysis.food_items.forEach((item) => {
        item.quantity = item.quantity || 1;
        item.multipliedCalories = item.calories * item.quantity;
        totalCalories += item.multipliedCalories;
      });
      setTotalMealCalories(totalCalories);

      if (!analysis.general_title && analysis.food_items.length > 0) {
        setAnalysis((prevState) => {
          if (prevState) {
            return {
              ...prevState,
              general_title: prevState.food_items[0].food,
            };
          }
          return null;
        });
      }
    }
  }, [analysis]);

  useEffect(() => {
    if (SaveLoading) {
      setButtonText("Loading..");
    } else {
      setButtonText("Meal Saved!");
      setTimeout(() => {
        setButtonText("Save Meal");
      }, 1000);
    }
  }, [SaveLoading]);

  function handleAnalyzeImage() {
    if (description === "") {
      Alert.alert(
        "No Description",
        "You have not added a description to the image. This might affect the AI recognition. Do you want to proceed anyway?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Analyze",
            onPress: () => analyzeImage(),
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } else {
      analyzeImage();
    }
  }

  function handleReset() {
    setImage("");
    setDescription("");
  }

  function handleSaveMeal() {
    if (analysis && totalMealCalories && image) {
      saveMeal(analysis, totalMealCalories);
    } else {
      console.log(analysis, totalMealCalories, image);
      alert("Something goes wrong.");
    }
  }

  const renderItem = ({ item, index }: { item: FoodItem; index: number }) => {
    return <FoodItemComponent item={item} index={index} setAnalysis={setAnalysis} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={close} style={styles.closeBtn}>
          <Text style={{ color: colors.primary, fontSize: 16 }}>Close</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 24 }}>Food Image Analysis</Text>
        <View style={styles.textContainer}>
          <Text style={styles.dummyText}>Take a picture of food or upload one from your gallery to get started!</Text>
          <Text style={styles.dummyText}>
            It would be very useful to add a description to help the AI recognize the food.
          </Text>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description || ""}
            placeholder="E.g : Chicken, Rice, etc."
            placeholderTextColor={"gray"}
          />
          {!image && (
            <TouchableOpacity disabled={loading} onPress={takeImage} style={styles.button}>
              <Text style={{ color: colors.primary, fontSize: 16 }}>Take Picture</Text>
            </TouchableOpacity>
          )}
          {!image && (
            <TouchableOpacity disabled={loading} onPress={pickImageFromGallery} style={styles.button}>
              <Text style={{ color: colors.primary, fontSize: 16 }}>Pick from Gallery</Text>
            </TouchableOpacity>
          )}
          <View style={{ flexDirection: "row" }}>
            {image && (
              <TouchableOpacity disabled={loading} onPress={handleAnalyzeImage} style={styles.button}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Analyze
                </Text>
              </TouchableOpacity>
            )}
            {image && (
              <TouchableOpacity disabled={loading} onPress={handleReset} style={styles.button}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  New Image
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {loading && <Text>Loading...</Text>}
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
        {analysis && (
          <View style={styles.analysisView}>
            <Text style={styles.mealTitle}>{analysis.general_title}</Text>
            {analysis.food !== "no items" && (
              <Text style={styles.totalCals}>Total meal calories: {totalMealCalories}</Text>
            )}
            <FlatList
              data={analysis.food_items}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.list}
              ListFooterComponent={
                <View style={{ alignItems: "center" }}>
                  {analysis.food !== "no items" ? (
                    <TouchableOpacity onPress={handleSaveMeal} style={primaryButton}>
                      <Text style={primaryButtonText}>{buttonText}</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={{ color: "red", fontSize: 20 }}>No items found</Text>
                  )}
                  <View style={{ height: 600 }} />
                </View>
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    alignItems: "center",
    backgroundColor: colors.primary,
    ...primaryShadow,
    height: Dimensions.get("window").height,
  },
  textContainer: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  dummyText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 5,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    ...primaryShadow,
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    width: 250,
    ...secondaryShadow,
    color: colors.secondary,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    ...secondaryShadow,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 5,
    marginBottom: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginTop: 20,
  },
  analysisView: {
    alignItems: "center",
    width: "100%",
  },
  list: {
    width: "100%",
    padding: 10,
  },
  mealTitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
    paddingLeft: 12,
    alignSelf: "flex-start",
  },
  totalCals: {
    fontSize: 20,
    fontWeight: "400",
    paddingLeft: 12,
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: "flex-start",
  },
});

export default ImageAnalysis;
