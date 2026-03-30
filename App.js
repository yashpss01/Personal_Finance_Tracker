import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider, ActivityIndicator } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from 'react-native'

import Home from './src/screens/HomeScreen'
import Add from './src/screens/AddTransactionScreen'
import History from './src/screens/TransactionsScreen'
import Analytics from './src/screens/AnalyticsScreen'
import Settings from './src/screens/SettingsScreen'

import LoginScreen from './src/screens/LoginScreen'
import SignupScreen from './src/screens/SignupScreen'

import { TransactionProvider } from './src/context/TransactionContext'
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext'
import { AuthProvider, AuthContext } from './src/context/AuthContext'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function icon(name, focused) {
  if (name === 'Home') return focused ? 'home' : 'home-outline'
  if (name === 'Add') return focused ? 'plus-circle' : 'plus-circle-outline'
  if (name === 'History') return focused ? 'format-list-bulleted' : 'format-list-bulleted'
  if (name === 'Analytics') return focused ? 'chart-bar' : 'chart-bar'
  if (name === 'Settings') return focused ? 'cog' : 'cog-outline'
  return 'circle'
}

function MainApp() {
  const { theme } = useContext(ThemeContext)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons
            name={icon(route.name, focused)}
            size={size}
            color={color}
          />
        ),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: 'transparent',
          elevation: 0,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600'
        }
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

function NavigationRoot() {
  const { theme } = useContext(ThemeContext)
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    )
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {user ? <MainApp /> : <AuthStack />}
      </NavigationContainer>
    </PaperProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <ThemeProvider>
          <NavigationRoot />
        </ThemeProvider>
      </TransactionProvider>
    </AuthProvider>
  )
}
