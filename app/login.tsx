import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  Image
} from 'react-native';
import { useRouter } from 'expo-router'; // <--- The Expo Router Hook
import { authApi } from '../src/api/auth'; // Adjust path to your authApi

export default function LoginScreen() {
  const router = useRouter(); // Initialize router

  // UI State
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [identifier, setIdentifier] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!password || (isRegistering ? !email || !identifier : !identifier)) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      if (isRegistering) {
        await authApi.register(identifier, email, password);
        Alert.alert('Success', 'Account created! Logging you in...');
        
        // OPTIONAL: Auto-login after register, or force them to log in manually.
        // For now, let's assume register returns a token and we go straight in:
        router.replace('/(tabs)'); 
      } else {
        await authApi.login(identifier, password);
        
        // SUCCESS: Navigate to the tabs folder
        // 'replace' prevents the back button from returning to login
        router.replace('/(tabs)'); 
      }
    } catch (error: any) {
      const strapiError = error.response?.data?.error?.message;
      const fallbackError = error.message || 'An unexpected error occurred';
      Alert.alert('Error', strapiError || fallbackError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        
        {/* LOGO AREA (Optional) */}
        <View style={styles.header}>
          <Text style={styles.title}>{isRegistering ? 'Create Account' : 'Welcome'}</Text>
          <Text style={styles.subtitle}>
            {isRegistering ? 'Sign up to start learning' : 'Sign in to continue your courses'}
          </Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            autoCapitalize="none"
            value={identifier}
            onChangeText={setIdentifier}
          />

          {isRegistering && (
            <>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="student@example.com"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </>
          )}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="..."
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isRegistering ? 'Sign Up' : 'Login'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* TOGGLE */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
            <Text style={styles.link}>
              {isRegistering ? ' Login' : ' Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    height: 56,
    backgroundColor: '#007AFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#007AFF',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  link: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});