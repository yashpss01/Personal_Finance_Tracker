import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Card, Title, Paragraph, FAB } from 'react-native-paper'

export default function HomeScreen({ navigation }) {
  function goToAddMoney() {
    navigation.navigate('Add Money')
  }

  return (
    <View style={styles.main}>
      <Appbar.Header>
        <Appbar.Content title="My Money Tracker" />
      </Appbar.Header>
      
      <View style={styles.body}>
        <Card style={styles.box}>
          <Card.Content>
            <Title>My Balance</Title>
            <Paragraph style={styles.money}>₹0.00</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.box}>
          <Card.Content>
            <Title>This Month</Title>
            <Paragraph>Your monthly summary will show here</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <FAB style={styles.btn} icon="plus" onPress={goToAddMoney} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  body: {
    flex: 1,
    padding: 16
  },
  box: {
    marginBottom: 16,
    elevation: 2
  },
  money: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginTop: 8
  },
  btn: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65
  }
})
