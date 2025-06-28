import { useSession } from '@/hooks/useSession';
import { Redirect } from 'expo-router';
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function profile() {
  const { session, logOut } = useSession();
  if(!session) return <Redirect href="/login" />;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>{session.username}</Text>
      </View>
      <Button title="Logout" onPress={() => Alert.alert("Logout", "Are you sure you want to logout?", [{ text: "Cancel" }, { text: "Logout", onPress: logOut }])} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
  },
})