import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PaperProvider } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Home from './src/screens/HomeScreen'
import AddMoney from './src/screens/AddTransactionScreen'
import History from './src/screens/TransactionsScreen'

const Tabs = createBottomTabNavigator()

function getIcon(screenName, isActive) {
  if (screenName === 'Home') return isActive ? 'home' : 'home-outline'
  if (screenName === 'Add Money') return isActive ? 'plus-circle' : 'plus-circle-outline'
  if (screenName === 'History') return 'format-list-bulleted'
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons 
                name={getIcon(route.name, focused)} 
                size={size} 
                color={color} 
              />
            ),
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
          })}
        >
          <Tabs.Screen name="Home" component={Home} />
          <Tabs.Screen name="Add Money" component={AddMoney} />
          <Tabs.Screen name="History" component={History} />
        </Tabs.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
