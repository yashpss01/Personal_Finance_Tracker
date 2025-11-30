import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Appbar, List, IconButton, useTheme, Text } from 'react-native-paper';
import { TransactionContext } from '../context/TransactionContext';

export default function TransactionsScreen() {
  const { transactions, deleteTransaction } = useContext(TransactionContext);
  const theme = useTheme();

  const del = (id) => {
    Alert.alert(
      "Delete?",
      "Really delete this?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => deleteTransaction(id)
        }
      ]
    );
  };

  const item = ({ item }) => (
    <List.Item
      title={item.category}
      description={`${item.date}${item.description ? ` • ${item.description}` : ''}`}
      left={props => (
        <List.Icon
          {...props}
          icon={item.type === 'Income' ? 'arrow-down' : 'arrow-up'}
          color={item.type === 'Income' ? theme.colors.primary : theme.colors.error}
        />
      )}
      right={props => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              ...props.style,
              color: item.type === 'Income' ? theme.colors.primary : theme.colors.error,
              fontWeight: 'bold',
              marginRight: 8
            }}
          >
            {item.type === 'Income' ? '+' : '-'}₹{item.amount}
          </Text>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => del(item.id)}
          />
        </View>
      )}
      style={styles.row}
    />
  );

  return (
    <View style={[styles.main, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="History" />
      </Appbar.Header>

      {transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={i => i.id}
          renderItem={item}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View style={styles.center}>
          <Text style={{ color: 'gray' }}>No transactions</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  row: {
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
