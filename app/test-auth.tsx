import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { authApi } from '../src/api/auth'; // Adjust path if needed

export default function AuthTestScreen() {
  const [email, setEmail] = useState('test@akcen.com');
  const [password, setPassword] = useState('iashdgqawrgh214124124jnkasndasd');
  const [log, setLog] = useState('Ready to test.');

  // 1. HELPER TO PRINT LOGS
  const addLog = (title: string, data: any) => {
    console.log(title, data); // Also log to browser console
    const message = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;
    setLog(prev => `--- ${title} ---\n${message}\n\n${prev}`);
  };

  // 2. TEST FUNCTIONS
  const handleLogin = async () => {
    try {
      addLog('Attempting Login', { email, password });
      const res = await authApi.login(email, password);
      addLog('Login Success', res.user);
    } catch (error: any) {
      addLog('Login Failed', error.response?.data || error.message);
    }
  };

  const handleCheckToken = async () => {
    const token = await authApi.getToken();
    addLog('Current Token', token ? `${token.substring(0, 15)}...` : 'No Token Found');
  };

  const handleLogout = async () => {
    await authApi.logout();
    addLog('Logged Out', 'Token cleared');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Auth System Test</Text>

      {/* INPUTS */}
      <View style={styles.inputGroup}>
        <Text>Email / Identifier:</Text>
        <TextInput 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none"
        />
        <Text>Password:</Text>
        <TextInput 
          style={styles.input} 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.buttonGroup}>
        <Button title="Login" onPress={handleLogin} />
        <View style={{ height: 10 }} />
        <Button title="Check Stored Token" onPress={handleCheckToken} color="orange" />
        <View style={{ height: 10 }} />
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>

      {/* LOG OUTPUT */}
      <Text style={styles.subHeader}>Test Logs:</Text>
      <View style={styles.logBox}>
        <Text style={styles.logText}>{log}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, maxWidth: 600, alignSelf: 'center', width: '100%' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  inputGroup: { marginBottom: 20 },
  input: { 
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10, backgroundColor: '#fff' 
  },
  buttonGroup: { marginVertical: 10 },
  logBox: { 
    backgroundColor: '#333', padding: 10, borderRadius: 5, height: 300 
  },
  logText: { color: '#0f0', fontFamily: 'monospace', fontSize: 12 }
});