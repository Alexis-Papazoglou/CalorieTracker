import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Image, FlatList, SafeAreaView } from 'react-native';
import { colors } from '../../constants/colors';
import { primaryShadow, secondaryShadow } from '../../constants/shadows';
import useImageAnalysis from '../../../hooks/useImageAnalysis';
import { Alert } from 'react-native';

import { FoodItem } from '../../globalTypes';

interface ImageAnalysisProps {
  close: () => void;
}

const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ close }) => {
  const [description, setDescription] = useState<string>('');
  const { takeImage, pickImageFromGallery, analyzeImage, image, setImage, analysis, loading, error } = useImageAnalysis('https://foodimageanalysisapi.onrender.com/analyze', description);


  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await fetch('https://foodimageanalysisapi.onrender.com/');
  //     const response = await data.json();
  //     console.log(response);
  //   }
  //   fetchData();
  // }, []);


  function handleAnalyzeImage() {
    if (description === '') {
      Alert.alert(
        "No Description",
        "You have not added a description to the image. This might affect the AI recognition. Do you want to proceed anyway?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Analyze", onPress: () => analyzeImage(), style: "destructive" }
        ],
        { cancelable: false }
      );
    } else {
      analyzeImage();
    }
  }

  function handleReset() {
    setImage('');
    setDescription('');
  }

  const renderItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.item}>
      <Text style={styles.value}>{item.food}</Text>
      <Text style={styles.value}>{item.weight}</Text>
      <Text style={styles.value}>{item.calories}</Text>
    </View>
  );

  const TableHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Item</Text>
      <Text style={styles.headerText}>Weight(g)</Text>
      <Text style={styles.headerText}>Cal</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={close} style={styles.closeBtn}>
          <Text style={{ color: colors.primary, fontSize: 16 }}>Close</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 24 }}>Food Image Analysis</Text>
        <View style={styles.textContainer}>
          <Text style={styles.dummyText}>
            Take a picture of food or upload one from your gallery to get started!
          </Text>
          <Text style={styles.dummyText}>
            It would be very useful to add a description to help the AI recognize the food.
          </Text>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description || ''}
            placeholder="E.g : Chicken, Rice, etc."
            placeholderTextColor={'gray'}
          />
          {!image && <TouchableOpacity disabled={loading} onPress={takeImage} style={styles.button}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>Take Picture</Text>
          </TouchableOpacity>}
          {!image && <TouchableOpacity disabled={loading} onPress={pickImageFromGallery} style={styles.button}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>Pick from Gallery</Text>
          </TouchableOpacity>}
          {image && <TouchableOpacity disabled={loading} onPress={handleAnalyzeImage} style={styles.button}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>Analyze</Text>
          </TouchableOpacity>}
          {image && <TouchableOpacity disabled={loading} onPress={handleReset} style={styles.button}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>New Image</Text>
          </TouchableOpacity>}
          {loading && <Text>Loading...</Text>}
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
        {analysis && (
          <FlatList
            data={analysis.food_items}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={TableHeader}
            style={{ width: '100%' }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: colors.primary,
    ...primaryShadow,
    height: Dimensions.get('window').height,
  },
  textContainer: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  dummyText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 5,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    ...primaryShadow
  },
  input: {
    height: 40,
    borderColor: 'grey',
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
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ccc',
  },
  headerText: {
    width: '33.3%',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  value: {
    textAlign: 'center',
    width: '33.3%',
  },
});

export default ImageAnalysis;