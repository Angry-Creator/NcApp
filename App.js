import { StyleSheet } from "react-native";
import Navigator from "./src/Navigation/Navigator";

export default function App() {
  return (
    <Navigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
