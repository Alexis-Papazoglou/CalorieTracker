import { TextStyle } from "react-native";
import { colors } from "./colors";

export const primaryButton = {
  backgroundColor: colors.darkerTertiary,
  borderRadius: 10,
  padding: 14,
  elevation: 2,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  marginVertical: 10,
  width: 170,
};

export const primaryButtonText: TextStyle = {
  color: "white",
  fontWeight: "700",
  textAlign: "center",
  fontSize: 16,
};
