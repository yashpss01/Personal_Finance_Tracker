import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Card, Title, Paragraph } from 'react-native-paper'

export default function TransactionsScreen() {
  return (
    <View style={styles.main}>
      <Appbar.Header>
        <Appbar.Content title="My History" />
      </Appbar.Header>
      
      <View style={styles.body}>
        <Card style={styles.box}>
          <Card.Content>
            <Title>Money History</Title>
            <Paragraph style={styles.text}>
              No money added yet. Start adding to see your history!
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
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
    elevation: 2
  },
  text: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
    marginTop: 16
  }
})
