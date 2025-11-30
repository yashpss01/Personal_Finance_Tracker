import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PaperProvider } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Home from './src/screens/HomeScreen'
import Add from './src/screens/AddTransactionScreen'
import History from './src/screens/TransactionsScreen'
import Analytics from './src/screens/AnalyticsScreen'
import Settings from './src/screens/SettingsScreen'

import { TransactionProvider } from './src/context/TransactionContext'
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext'

const Tab = createBottomTabNavigator()

function icon(name, focused) {
  if (name === 'Home') return focused ? 'home' : 'home-outline'
  if (name === 'Add') return focused ? 'plus-circle' : 'plus-circle-outline'
  if (name === 'History') return focused ? 'format-list-bulleted' : 'format-list-bulleted'
  if (name === 'Analytics') return focused ? 'chart-bar' : 'chart-bar'
  if (name === 'Settings') return focused ? 'cog' : 'cog-outline'
  return 'circle'
}

function Root() {
  const { theme } = useContext(ThemeContext)

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
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
      </NavigationContainer>
    </PaperProvider>
  )
}

export default function App() {
  return (
    <TransactionProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </TransactionProvider>
  )
}
