import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';

export default function TransactionsScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Transactions" />
      </Appbar.Header>
      
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Transaction History</Title>
            <Paragraph style={styles.placeholder}>
              No transactions yet. Add your first transaction to see it here!
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    elevation: 2,
  },
  placeholder: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
    marginTop: 16,
  },
});
