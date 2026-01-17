import React from "react";
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { saveProfileAsync } from "../redux/profileSlice";
import styles from "./SummaryScreen.styles";

export default function SummaryScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { draftProfile, loading } = useSelector((state: RootState) => state.profile);

  const handleSubmit = () => {
    if (
      !draftProfile.fullName ||
      !draftProfile.email ||
      !draftProfile.age ||
      !draftProfile.city ||
      !draftProfile.state ||
      !draftProfile.country
    ) {
      Alert.alert("Error", "Missing profile data");
      return;
    }

    const profileToSave = {
      id: draftProfile.id ?? Date.now().toString(),
      fullName: draftProfile.fullName,
      email: draftProfile.email,
      age: draftProfile.age,
      city: draftProfile.city,
      state: draftProfile.state,
      country: draftProfile.country,
      avatar: draftProfile.avatar, // include avatar
    };

    dispatch(saveProfileAsync(profileToSave));
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Summary</Text>

      {/* Avatar */}
      {draftProfile.avatar && (
        <Image
          source={{ uri: draftProfile.avatar }}
          style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginBottom: 20 }}
        />
      )}

      <View style={styles.card}>
        <Text style={styles.text}>Full Name: {draftProfile.fullName}</Text>
        <Text style={styles.text}>Email: {draftProfile.email}</Text>
        <Text style={styles.text}>Age: {draftProfile.age}</Text>
        <Text style={styles.text}>City: {draftProfile.city}</Text>
        <Text style={styles.text}>State: {draftProfile.state}</Text>
        <Text style={styles.text}>Country: {draftProfile.country}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4f46e5" />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("BasicInfo")}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
