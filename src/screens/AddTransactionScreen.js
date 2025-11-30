import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, Button, SegmentedButtons, Chip, Text, useTheme, Appbar } from 'react-native-paper';
import { TransactionContext } from '../context/TransactionContext';

const EXP_CATS = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];
const INC_CATS = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

export default function AddTransactionScreen({ navigation }) {
  const { addTransaction } = useContext(TransactionContext);
  const theme = useTheme();

  const [amt, setAmt] = useState('');
  const [desc, setDesc] = useState('');
  const [txType, setTxType] = useState('Expense');
  const [cat, setCat] = useState('');

  const list = txType === 'Expense' ? EXP_CATS : INC_CATS;

  const submit = () => {
    if (!amt || !cat) {
      Alert.alert('Missing Info', 'Please enter an amount and select a category.');
      return;
    }

    const val = parseFloat(amt);
    if (isNaN(val) || val <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive number.');
      return;
    }

    const tx = {
      id: Math.random().toString(36).substr(2, 9),
      amount: val.toFixed(2),
      description: desc.trim().length > 0 ? desc.trim() : 'No Description',
      type: txType,
      category: cat,
      date: new Date().toLocaleDateString(),
    };

    addTransaction(tx);

    setAmt('');
    setDesc('');
    setCat('');

    navigation.goBack();
  };

  return (
    <View style={[styles.main, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Transaction" />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>

          <SegmentedButtons
            value={txType}
            onValueChange={setTxType}
            buttons={[
              { value: 'Expense', label: 'Expense', icon: 'arrow-up-circle' },
              { value: 'Income', label: 'Income', icon: 'arrow-down-circle' },
            ]}
            style={styles.tabs}
          />

          <TextInput
            label="Amount"
            value={amt}
            onChangeText={setAmt}
            keyboardType="numeric"
            mode="outlined"
            style={styles.field}
            left={<TextInput.Affix text="₹" />}
          />

          <TextInput
            label="Description (Optional)"
            value={desc}
            onChangeText={setDesc}
            mode="outlined"
            style={styles.field}
          />

          <Text variant="titleMedium" style={styles.lbl}>Category</Text>
          <View style={styles.chips}>
            {list.map((c) => (
              <Chip
                key={c}
                selected={cat === c}
                onPress={() => setCat(c)}
                style={styles.chip}
                showSelectedOverlay
              >
                {c}
              </Chip>
            ))}
          </View>

          <Button
            mode="contained"
            onPress={submit}
            style={styles.btn}
            contentStyle={{ paddingVertical: 8 }}
          >
            Save Transaction
          </Button>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  scroll: {
    padding: 20,
  },
  tabs: {
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
    backgroundColor: 'transparent'
  },
  lbl: {
    marginBottom: 12,
    marginTop: 8,
    fontWeight: 'bold'
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 32
  },
  btn: {
    borderRadius: 12,
    marginTop: 'auto'
  }
});