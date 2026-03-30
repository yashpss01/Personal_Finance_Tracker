import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useContext(AuthContext);
  const theme = useTheme();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await register(email, password, name);
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons name="wallet-plus-outline" size={80} color={theme.colors.primary} />
          <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>
            Create Account
          </Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
            Join us to track your expenses
          </Text>
        </View>

        <View style={styles.formContainer}>
          {error ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text> : null}
          
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account-outline" />}
          />

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

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock-check-outline" />}
          />

          <Button 
            mode="contained" 
            onPress={handleSignup} 
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Sign Up
          </Button>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkContainer}>
            <Text variant="bodyMedium">Already have an account? <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Login</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
