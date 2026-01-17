import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e0f2fe", // light blue background
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e3a8a", // deep blue
    textAlign: "center",
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: "#1e40af",
    textAlign: "center",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    backgroundColor: "#cbd5e1",
  },
  cardContent: {
    flex: 1,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1e3a8a",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 2,
  },
  cardButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  buttonSpacing: {
    width: 10,
  },
});
