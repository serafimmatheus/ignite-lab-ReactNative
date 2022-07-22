import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface IPropsOrdersDTOs {
  patrimony: string;
  description: string;
  status: "open" | "close";
  solution?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at: FirebaseFirestoreTypes.Timestamp;
}
