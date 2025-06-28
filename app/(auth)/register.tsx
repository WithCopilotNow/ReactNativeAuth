import { StyleSheet, View, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import { router } from 'expo-router'
import { useState } from 'react';
import { registerUserSchema } from "@/schemas/registerUserSchema";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleRegister = async (): Promise<void> => {
        setLoading(true);
        const result = registerUserSchema.safeParse({ username, email, password, confirmPassword });

        if(!result.success) {
            setLoading(false);
            return setError(result.error.issues[0].message);
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST", 
                headers: { "Content-Type": "application/json", },  
                body: JSON.stringify(result.data),
            })

            if(!res.ok) {
                const errorData: {error: string} = await res.json();
                return setError(errorData.error);
            }

            if(res.status === 201) {
                setUsername('');
                setEmail('');   
                setPassword('');
                setConfirmPassword('');
                setError(null);
                router.replace("./login");
            }
            
        } catch (error) {
            console.error("Error in handleRegister", error);
            return setError("internal server error");
        } finally {
            setLoading(false);
        }
    }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.box} behavior="padding" keyboardVerticalOffset={100}>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.form}>
          <Text style={styles.heading}>Register</Text>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
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
          <Text style={styles.label}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              onPress={() => {
                router.push("./login");
              }}
              color="#007AFF"
            />
            <Button
              title={`${loading ? "Loading..." : "Register"}`}
              onPress={handleRegister}
              disabled={loading}
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        gap: 10,
        marginTop: 20,
    },
    form: {
        width: '100%',
        padding: 20,
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