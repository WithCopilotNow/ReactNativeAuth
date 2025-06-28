import { StyleSheet, View, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import { Redirect, router } from 'expo-router'
import { useState } from 'react';
import { loginUserSchema } from '@/schemas/loginUserSchema';
import { useSession } from '@/hooks/useSession';
import { sessionSchema } from '@/schemas/sessionSchema';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
    const { session, logIn } = useSession();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    if(session) return <Redirect href="/" />;

    const handleLogin = async (): Promise<void> => {
        setLoading(true);
        const result = loginUserSchema.safeParse({ email, password });

        if (!result.success) {
            setLoading(false);
            return setError(result.error.issues[0].message);
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(result.data),
            });
            if (!res.ok) {
                const errorData: { error: string } = await res.json();
                setError(errorData.error);
            }
            if(res.status === 202){
                const data = await res.json();
                const newSession = sessionSchema.parse(data);
                await logIn(newSession);
                setEmail('');
                setPassword('');
                setError(null);
                router.replace("/");
            }
        } catch (error) {
            console.log("Error in handleLogin", error);
            setError("Internal server error");
        } finally {
            setLoading(false);
        }
    }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.box} behavior="padding" keyboardVerticalOffset={100}>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.form}>
          <Text style={styles.heading}>Login</Text>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.buttonContainer}>
            <Button
              title={`${loading ? "Loading..." : "Login"}`}
              onPress={handleLogin}
              color="#007AFF"
              disabled={loading}
            />
            <Button
              title="Register"
              onPress={() => {
                router.push("./register");
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    box: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    form: {
        width: '100%',
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        gap: 10,
        marginTop: 20,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        color: '#333',
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 5,
        backgroundColor: '#fff',
    },
})