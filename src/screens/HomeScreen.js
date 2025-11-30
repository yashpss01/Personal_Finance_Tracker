import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, FAB, Avatar, IconButton } from 'react-native-paper';
import { TransactionContext } from '../context/TransactionContext';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { transactions } = useContext(TransactionContext);
  const { theme } = useContext(ThemeContext);

  const inc = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const exp = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const bal = inc - exp;

  const renderItem = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Title
        title={item.category}
        subtitle={item.date}
        titleStyle={{ fontWeight: 'bold', color: theme.colors.onSurface }}
        subtitleStyle={{ color: theme.colors.onSurfaceVariant }}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={item.type === 'Income' ? 'arrow-down-circle' : 'arrow-up-circle'}
            style={{ backgroundColor: item.type === 'Income' ? theme.colors.tertiaryContainer : theme.colors.secondaryContainer }}
            color={item.type === 'Income' ? theme.colors.tertiary : theme.colors.secondary}
          />
        )}
        right={(props) => (
          <Text {...props} style={{
            color: item.type === 'Income' ? theme.colors.tertiary : theme.colors.secondary,
            fontWeight: 'bold',
            fontSize: 16,
            marginRight: 16
          }}>
            {item.type === 'Income' ? '+' : '-'}₹{item.amount}
          </Text>
        )}
      />
    </Card>
  );

  return (
    <View style={[styles.main, { backgroundColor: theme.colors.background }]}>

      <Card style={[styles.balCard, { backgroundColor: theme.colors.primary }]}>
        <Card.Content>
          <Text variant="titleMedium" style={{ color: theme.colors.onPrimary, opacity: 0.8 }}>Total Balance</Text>
          <Text variant="displayMedium" style={{ color: theme.colors.onPrimary, fontWeight: 'bold', marginVertical: 8 }}>
            ₹{bal.toFixed(2)}
          </Text>

          <View style={styles.row}>
            <View style={styles.stat}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <IconButton icon="arrow-down" iconColor={theme.colors.onPrimary} size={20} />
              </View>
              <View>
                <Text variant="labelMedium" style={{ color: theme.colors.onPrimary, opacity: 0.8 }}>Income</Text>
                <Text variant="titleMedium" style={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}>₹{inc}</Text>
              </View>
            </View>

            <View style={[styles.div, { backgroundColor: theme.colors.onPrimary }]} />

            <View style={styles.stat}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <IconButton icon="arrow-up" iconColor={theme.colors.onPrimary} size={20} />
              </View>
              <View>
                <Text variant="labelMedium" style={{ color: theme.colors.onPrimary, opacity: 0.8 }}>Expense</Text>
                <Text variant="titleMedium" style={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}>₹{exp}</Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.list}>
        <Text variant="titleLarge" style={{
          color: theme.colors.onBackground,
          marginBottom: 16,
          fontWeight: 'bold',
          paddingHorizontal: 4
        }}>
          Recent Transactions
        </Text>

        {transactions.length > 0 ? (
          <FlatList
            data={transactions.slice(0, 5)}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        ) : (
          <View style={styles.empty}>
            <Avatar.Icon size={64} icon="text-box-search-outline" style={{ backgroundColor: theme.colors.surfaceVariant }} color={theme.colors.onSurfaceVariant} />
            <Text style={{ marginTop: 16, color: theme.colors.onSurfaceVariant }}>No transactions yet</Text>
          </View>
        )}
      </View>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color={theme.colors.onPrimary}
        onPress={() => navigation.navigate('Add')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  balCard: {
    borderRadius: 24,
    elevation: 4,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center'
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  iconBox: {
    borderRadius: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  div: {
    width: 1,
    height: 40,
    opacity: 0.3
  },
  list: {
    flex: 1,
  },
  card: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 0,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    opacity: 0.7
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
});
