import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateDraft } from "../redux/profileSlice";
import { RootState, AppDispatch } from "../redux/store";
import styles from "./AddressScreen.styles";

export default function AddressScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const draft = useSelector((state: RootState) => state.profile.draftProfile);

  const [city, setCity] = useState(draft.city || "");
  const [stateName, setStateName] = useState(draft.state || "");
  const [country, setCountry] = useState(draft.country || "");

  const handleNext = () => {
    if (!city || !stateName || !country) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    dispatch(updateDraft({ city, state: stateName, country }));
    navigation.navigate("Summary");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address Information</Text>

      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={stateName}
        onChangeText={setStateName}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
