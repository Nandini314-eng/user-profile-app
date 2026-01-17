import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateDraft } from "../redux/profileSlice";
import { RootState, AppDispatch } from "../redux/store";
import styles from "./BasicInfoScreen.styles";

export default function BasicInfoScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const draft = useSelector((state: RootState) => state.profile.draftProfile);

  const [fullName, setFullName] = useState(draft.fullName || "");
  const [email, setEmail] = useState(draft.email || "");
  const [age, setAge] = useState(draft.age || "");
  const [avatar, setAvatar] = useState(draft.avatar || "");

  // Ask permission for camera roll
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed", "We need permission to access your photos");
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not pick image");
    }
  };

  const handleNext = () => {
    if (!fullName || !email || !age) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    dispatch(updateDraft({ fullName, email, age, avatar }));
    navigation.navigate("Address");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Information</Text>

      {/* Avatar Picker */}
      <TouchableOpacity
        style={{
          alignSelf: "center",
          marginBottom: 20,
          borderRadius: 75,
          overflow: "hidden",
        }}
        onPress={pickImage}
      >
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={{ width: 120, height: 120, borderRadius: 75 }}
          />
        ) : (
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 75,
              backgroundColor: "#cbd5e1",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Add Avatar</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
