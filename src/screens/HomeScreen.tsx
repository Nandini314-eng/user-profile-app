import React from "react";
import { View, Text, FlatList, TouchableOpacity, Button, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deleteProfile, setDraftForEdit } from "../redux/profileSlice";
import styles from "./HomeScreen.styles";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const profiles = useSelector((state: RootState) => state.profile.profiles);

  const handleEdit = (profile: any) => {
    dispatch(setDraftForEdit(profile));
    navigation.navigate("BasicInfo");
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProfile(id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.subtitleText}>Start by adding your first profile</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("BasicInfo")}
      >
        <Text style={styles.addButtonText}>+ Add Profile</Text>
      </TouchableOpacity>

      {profiles.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 50, color: "#6b7280" }}>
          No profiles yet
        </Text>
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Avatar */}
              {item.avatar ? (
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatar} />
              )}

              <View style={styles.cardContent}>
                <Text style={styles.nameText}>{item.fullName}</Text>
                <Text style={styles.infoText}>{item.email}</Text>
                <Text style={styles.infoText}>
                  {item.city}, {item.state}, {item.country}
                </Text>

                <View style={styles.cardButtons}>
                  <Button title="Edit" onPress={() => handleEdit(item)} />
                  <View style={styles.buttonSpacing} />
                  <Button title="Delete" onPress={() => handleDelete(item.id)} color="#ef4444" />
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
