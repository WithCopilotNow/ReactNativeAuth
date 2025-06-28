import { Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar"
import { useSession } from "@/hooks/useSession";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { session } = useSession();
  if(!session) return <Redirect href="/login" />
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark"/>
      <Text style={styles.text}>Hello World!</Text>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});