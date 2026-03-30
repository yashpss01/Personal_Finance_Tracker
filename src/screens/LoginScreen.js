import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const theme = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="wallet-outline" size={80} color={theme.colors.primary} />
        <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>
          FinanceTracker
        </Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
          Welcome back! Please login.
        </Text>
      </View>

      <View style={styles.formContainer}>
        {error ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text> : null}
        
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          left={<TextInput.Icon icon="email-outline" />}
        />
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          left={<TextInput.Icon icon="lock-outline" />}
        />

        <Button 
          mode="contained" 
          onPress={handleLogin} 
          loading={loading}
          disabled={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Login
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.linkContainer}>
          <Text variant="bodyMedium">Don't have an account? <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Sign up</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  formContainer: {
    flex: 0.6,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorText: {
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600'
  }
});
