import SessionProvider from "@/components/ui/SessionProvider";
import { router, Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome6";

export default function RootLayout() {
  
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="(tabs)/index" options={{ title: "Home", headerRight: () =>  <FontAwesome name="user-circle" size={24} color="black" style={{ marginRight: 10 }} onPress={() => router.push("/profile")} /> }} />
        <Stack.Screen name="(tabs)/profile" options={{ title: "Profile" }} />
        <Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
        <Stack.Screen name="(auth)/register" options={{ title: "Register" }} />
      </Stack>
    </SessionProvider>
  );
}
